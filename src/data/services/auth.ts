import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'bson';
import { User } from 'src/domain/entities/user';
import { AuthUseCases } from 'src/domain/use-cases/auth';
import { AuthContract, SignInInputContract } from '../contracts/domain/auth';
import { CreateUserInputContract } from '../contracts/domain/user';
import { AuthRepository } from '../contracts/repositories/auth';
import { verifyCPF } from '../utils/verifyCPF';
@Injectable()
export class AuthService implements AuthUseCases {
  constructor(
    private readonly repo: AuthRepository,
    private jwt: JwtService,
  ) {}
  async signIn(input: SignInInputContract): Promise<AuthContract> {
    const user = await this.repo.signIn(input);
    return {
      user,
      accessToken: await this.generateAToken({ sub: user.id }),
      refreshToken: await this.generateRToken({ sub: user.id }),
    };
  }

  async signUp(input: CreateUserInputContract): Promise<AuthContract> {
    const password = await bcrypt.hash(input.password, 10);

    if (!verifyCPF(input.doc)) throw new Error('CPF inválido');

    const user = new User({
      ...input,
      id: new ObjectId().toString(),
      password: password,
      birthdate: new Date(input.birthdate).toLocaleDateString('pt-BR'),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return {
      user: await this.repo.signUp(user),
      accessToken: await this.generateAToken({ sub: user.id }),
      refreshToken: await this.generateRToken({ sub: user.id }),
    };
  }

  async refresh(input: string): Promise<AuthContract> {
    await this.verifyRToken(input);
    const id = await this.decode(input).sub;
    const user = await this.repo.refresh(id);
    return {
      user,
      accessToken: await this.generateAToken({ sub: user.id }),
      refreshToken: await this.generateRToken({ sub: user.id }),
    };
  }

  async verifyAToken(input: string): Promise<void> {
    try {
      await this.jwt.verifyAsync(input, {
        secret: process.env.SECRET_AT,
        maxAge: '7d',
      });
    } catch (err) {
      throw new Error('Token inválido');
    }
  }

  async verifyRToken(input: string): Promise<void> {
    try {
      await this.jwt.verifyAsync(input, {
        secret: process.env.SECRET_RT,
        maxAge: '1h',
      });
    } catch (err) {
      throw new Error('Token inválido');
    }
  }

  decode(input: string): any {
    return this.jwt.decode(input);
  }

  async generateAToken(input: any): Promise<string> {
    return await this.jwt.signAsync(input, { secret: process.env.SECRET_AT });
  }
  async generateRToken(input: any): Promise<string> {
    return await this.jwt.signAsync(input, { secret: process.env.SECRET_RT });
  }
}
