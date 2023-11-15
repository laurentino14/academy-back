import { Injectable } from '@nestjs/common';
import { ObjectId } from 'bson';
import {
  CreateHistoryInput,
  GetAllByDayInput,
  HistoryUseCases,
} from 'src/domain/use-cases/history';
import { HistoryContract } from '../contracts/domain/history';
import {
  CreateHistoryInputRepo,
  HistoryRepository,
} from '../contracts/repositories/history';

@Injectable()
export class HistoryService implements HistoryUseCases {
  constructor(private readonly repo: HistoryRepository) {}
  async create(input: CreateHistoryInput): Promise<HistoryContract> {
    const data: CreateHistoryInputRepo = {
      id: new ObjectId().toString(),
      ...input,
    };
    return await this.repo.create(data);
  }
  async getById(input: string): Promise<HistoryContract> {
    return await this.repo.getById(input);
  }
  async getAllByUserID(input: string): Promise<HistoryContract[]> {
    return await this.repo.getAllByUserID(input);
  }
  async getAllByUserIDAndDate(
    input: GetAllByDayInput,
  ): Promise<HistoryContract[]> {
    return await this.repo.getAllByUserIDAndDate(input);
  }
  async delete(input: string): Promise<HistoryContract> {
    return await this.repo.delete(input);
  }

  async changeStars(input: { id: string; stars: number }): Promise<boolean> {
    return await this.repo.changeStars(input);
  }
}
