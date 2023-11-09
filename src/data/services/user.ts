import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'bson';
import { User } from 'src/domain/entities/user';
import { UpdateUserInput, UserUseCases } from 'src/domain/use-cases/user';
import { CreateUserInputContract } from '../contracts/domain/user';
import { UserRepository } from '../contracts/repositories/user';
import { verifyCPF } from '../utils/verifyCPF';

@Injectable()
export class UserService implements UserUseCases {
  constructor(private readonly repo: UserRepository) {}
  async create(input: CreateUserInputContract): Promise<User> {
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

    return await this.repo.create(user);
  }
  async getById(input: string): Promise<User> {
    return await this.repo.getById(input);
  }
  async getByEmail(input: string): Promise<User> {
    return await this.repo.getByEmail(input);
  }
  async update(input: UpdateUserInput): Promise<User> {
    return await this.repo.update(input);
  }
}
