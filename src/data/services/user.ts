import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'bson';
import { User } from 'src/domain/entities/user';
import { UserUseCases } from 'src/domain/use-cases/user';
import {
  CreateUserInputContract,
  UpdateUserInputContract,
  UpdateUserPasswordContract,
  UserContract,
} from '../contracts/domain/user';
import { UserRepository } from '../contracts/repositories/user';
import { verifyCPF } from '../utils/verifyCPF';

@Injectable()
export class UserService implements UserUseCases {
  constructor(private readonly repo: UserRepository) {}
  async updatePassword(input: UpdateUserPasswordContract): Promise<User> {
    if (input.password !== input.passwordConfirmation)
      throw new Error('As senhas não coincidem');

    const hash = await bcrypt.hash(input.password, 10);

    if (!hash) throw new Error('Erro ao atualizar senha');

    return await this.repo.updatePassword({
      id: input.id,
      password: hash,
      oldPassword: input.oldPassword,
    });
  }
  async create(input: CreateUserInputContract): Promise<UserContract> {
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
  async getById(input: string): Promise<UserContract> {
    return await this.repo.getById(input);
  }
  async getByEmail(input: string): Promise<UserContract> {
    return await this.repo.getByEmail(input);
  }
  async getAll(): Promise<UserContract[]> {
    return await this.repo.getAll();
  }

  async update(input: UpdateUserInputContract): Promise<UserContract> {
    input.height = Number(input.height);
    input.weigth = Number(input.weigth);
    return await this.repo.update(input);
  }

  async delete(input: string): Promise<UserContract> {
    return await this.repo.delete(input);
  }

  async toInstructor(input: string): Promise<User> {
    return await this.repo.toInstructor(input);
  }
}
