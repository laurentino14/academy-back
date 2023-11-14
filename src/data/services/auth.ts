import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'bson';
import { User } from 'src/domain/entities/user';
import { AuthUseCases } from 'src/domain/use-cases/auth';
import { ResendProvider } from 'src/infra/providers/resend';
import { AuthContract, SignInInputContract } from '../contracts/domain/auth';
import { CreateUserInputContract } from '../contracts/domain/user';
import { AuthRepository } from '../contracts/repositories/auth';
import { verifyCPF } from '../utils/verifyCPF';
@Injectable()
export class AuthService implements AuthUseCases {
  constructor(
    private readonly repo: AuthRepository,
    private jwt: JwtService,
    private readonly resend: ResendProvider,
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

  async recoveryPassword(input: {
    email: string;
    password: string;
    confirmPassword: string;
  }): Promise<boolean> {
    if (input.password !== input.confirmPassword)
      throw new Error('Senhas não conferem');

    const password = await bcrypt.hash(input.password, 10);
    const recoveryPass = await this.repo.recoveryPassword({
      email: input.email,
      password,
    });

    if (!recoveryPass) throw new Error('Erro ao atualizar senha');

    return true;
  }

  async recoveryCode(input: string): Promise<number> {
    const code =
      Math.floor(Math.random() * 1000) * Math.floor(Math.random() * 1000);
    await this.resend.sendEmail(
      input,
      'Código de Acesso',
      `Seu código de confirmação e ${code}`,
    );
    return code;
  }

  async verifyAToken(input: string): Promise<void> {
    try {
      await this.jwt.verify(input, {
        secret: process.env.SECRET_AT,
        maxAge: '1h',
      });
    } catch (err) {
      throw new Error('Token inválido');
    }
  }

  async verifyRToken(input: string): Promise<void> {
    try {
      await this.jwt.verify(input, {
        secret: process.env.SECRET_RT,
        maxAge: '7d',
      });
    } catch (err) {
      throw new Error('Token inválido');
    }
  }

  decode(input: string): any {
    return this.jwt.decode(input);
  }

  async generateAToken(input: any): Promise<string> {
    return await this.jwt.signAsync(
      {},
      { secret: process.env.SECRET_AT, expiresIn: '1h', subject: input.sub },
    );
  }
  async generateRToken(input: any): Promise<string> {
    return await this.jwt.signAsync(
      {},
      { secret: process.env.SECRET_RT, expiresIn: '7d', subject: input.sub },
    );
  }
}
