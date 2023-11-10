import { Injectable } from '@nestjs/common';
import { ObjectId } from 'bson';
import { Set } from 'src/domain/entities/set';
import {
  CreateSetInput,
  SetUseCases,
  UpdateSetInput,
} from 'src/domain/use-cases/set';
import { SetContract } from '../contracts/domain/set';
import { SetRepository } from '../contracts/repositories/set';

@Injectable()
export class SetService implements SetUseCases {
  constructor(private readonly repo: SetRepository) {}
  async getAllByUserID(input: string): Promise<Set[]> {
    return await this.repo.getAllByUserID(input);
  }
  async create(input: CreateSetInput): Promise<SetContract> {
    return await this.repo.create({ ...input, id: new ObjectId().toString() });
  }
  async getById(input: string): Promise<SetContract> {
    return await this.repo.getById(input);
  }
  async update(input: UpdateSetInput): Promise<SetContract> {
    return await this.repo.update(input);
  }
  async delete(input: string): Promise<SetContract> {
    return await this.repo.delete(input);
  }
}
