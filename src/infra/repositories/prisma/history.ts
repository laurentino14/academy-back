import { Injectable } from '@nestjs/common';
import { HistoryContract } from 'src/data/contracts/domain/history';
import {
  CreateHistoryInputRepo,
  GetAllByDayInputRepo,
  HistoryRepository,
} from 'src/data/contracts/repositories/history';
import { PrismaDB } from 'src/infra/data-sources/prisma';

@Injectable()
export class PrismaHistoryRepository implements HistoryRepository {
  constructor(private readonly db: PrismaDB) {}
  async create(input: CreateHistoryInputRepo): Promise<HistoryContract> {
    const db = await this.db.history.create({
      data: {
        id: input.id,
        setId: input.setId,
        userId: input.userId,
      },
    });

    if (!db) throw new Error('Error on create history');

    return db;
  }
  async getById(input: string): Promise<HistoryContract> {
    const db = await this.db.history.findUnique({
      where: {
        id: input,
      },
    });

    if (!db) throw new Error('Error on get history');
    return db;
  }
  async getAllByUserID(input: string): Promise<HistoryContract[]> {
    const db = await this.db.history.findMany({
      where: {
        userId: input,
      },
    });

    if (!db) throw new Error('Error on get history');

    return db;
  }
  async getAllByUserIDAndDate(
    input: GetAllByDayInputRepo,
  ): Promise<HistoryContract[]> {
    const db = await this.db.history.findMany({
      where: {
        userId: input.userId,
        createdAt: {
          equals: input.date,
        },
      },
    });

    if (!db) throw new Error('Error on get history');
    return db;
  }
  async delete(input: string): Promise<HistoryContract> {
    const db = await this.db.history.delete({
      where: {
        id: input,
      },
    });

    return db;
  }
}
