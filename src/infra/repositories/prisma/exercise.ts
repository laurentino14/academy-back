import { Injectable } from '@nestjs/common';
import {
  ExerciseContract,
  UpdateExerciseInputContract,
} from 'src/data/contracts/domain/exercise';
import {
  CreateExerciseInputRepoContract,
  ExerciseRepository,
} from 'src/data/contracts/repositories/exercise';
import { PrismaDB } from 'src/infra/data-sources/prisma';

@Injectable()
export class PrismaExerciseRepository implements ExerciseRepository {
  constructor(private readonly db: PrismaDB) {}
  async create(
    input: CreateExerciseInputRepoContract,
  ): Promise<ExerciseContract> {
    const db = await this.db.exercise.create({
      data: input,
      include: {
        sets: true,
      },
    });

    if (!db) throw new Error('Error on create exercise');

    return db;
  }
  async getById(input: string): Promise<ExerciseContract> {
    const db = await this.db.exercise.findUnique({
      where: {
        id: input,
      },
      include: {
        sets: true,
      },
    });

    if (!db) throw new Error('Error on get exercise by id');

    return db;
  }
  async delete(input: string): Promise<ExerciseContract> {
    const db = await this.db.exercise.update({
      where: {
        id: input,
      },
      data: {
        deletedAt: new Date(),
      },
      include: {
        sets: true,
      },
    });

    if (!db) throw new Error('Error on delete exercise');

    return db;
  }
  async update(input: UpdateExerciseInputContract): Promise<ExerciseContract> {
    const db = await this.db.exercise.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
        description: input.description,
      },
      include: {
        sets: true,
      },
    });

    if (!db) throw new Error('Error on update exercise');

    return db;
  }

  async getAll(): Promise<ExerciseContract[]> {
    const db = await this.db.exercise.findMany({
      include: {
        sets: true,
      },
    });

    if (!db) throw new Error('Error on get all exercises');

    return db;
  }
}
