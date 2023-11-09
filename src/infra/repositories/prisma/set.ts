import { Injectable } from '@nestjs/common';
import {
  SetContract,
  UpdateSetInputContract,
} from 'src/data/contracts/domain/set';
import {
  CreateSetInputRepoContract,
  SetRepository,
} from 'src/data/contracts/repositories/set';
import { PrismaDB } from 'src/infra/data-sources/prisma';
@Injectable()
export class PrismaSetRepository implements SetRepository {
  constructor(private readonly db: PrismaDB) {}
  async create(input: CreateSetInputRepoContract): Promise<SetContract> {
    const db = await this.db.set.create({
      data: input,
    });

    if (!db) throw new Error('Error on create set');

    return db;
  }
  async getById(input: string): Promise<SetContract> {
    const db = await this.db.set.findUnique({
      where: {
        id: input,
      },
    });

    if (!db) throw new Error('Error on get set by id');

    return db;
  }
  async delete(input: string): Promise<SetContract> {
    const db = await this.db.set.delete({
      where: {
        id: input,
      },
    });

    if (!db) throw new Error('Error on delete set');

    return db;
  }
  async update(input: UpdateSetInputContract): Promise<SetContract> {
    const data = {
      reps: input.reps,
      weight: input.weight,
      day: input.day,
      exerciseId: input.exerciseId,
      workoutId: input.workoutId,
    };
    const db = await this.db.set.update({
      where: {
        id: input.id,
      },
      data,
    });

    if (!db) throw new Error('Error on update set');

    return db;
  }
}
