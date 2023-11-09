import { ObjectId } from 'bson';
import {
  CreateSetInput,
  SetUseCases,
  UpdateSetInput,
} from 'src/domain/use-cases/set';
import { SetContract } from '../contracts/domain/set';
import { SetRepository } from '../contracts/repositories/set';

export class SetService implements SetUseCases {
  constructor(private readonly repo: SetRepository) {}
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
