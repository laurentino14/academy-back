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
    const user = await this.db.user.findUnique({
      where: {
        hash: Number(input.userId),
      },
    });

    if (!user) throw new Error('User not found');

    const db = await this.db.set.create({
      data: {
        id: input.id,
        day: input.day,
        reps: input.reps,
        series: input.series,
        weight: input.weight,
        exerciseId: input.exerciseId,
        workoutId: input.workoutId,
        userId: user.id,
        type: input.type,
        machineId: input.machineId,
      },
      include: {
        history: true,
        exercise: true,
        machine: true,
        workout: true,
      },
    });

    if (!db) throw new Error('Error on create set');

    return db;
  }
  async getById(input: string): Promise<SetContract> {
    const db = await this.db.set.findUnique({
      where: {
        id: input,
      },
      include: {
        exercise: true,
        machine: true,
        workout: true,
        history: true,
      },
    });

    if (!db) throw new Error('Error on get set by id');

    return db;
  }
  async getAllByUserID(input: string): Promise<SetContract[]> {
    const db = await this.db.set.findMany({
      where: {
        user: { id: input },
        AND: {
          userId: input,
        },
      },
      include: {
        exercise: true,
        machine: true,
        workout: true,
        history: true,
      },
    });

    console.log(db);

    if (!db) throw new Error('Error on get set by user id');

    return db.filter((set) => set.userId === input);
  }
  async delete(input: string): Promise<SetContract> {
    const db = await this.db.set.delete({
      where: {
        id: input,
      },
      include: {
        exercise: true,
        machine: true,
        workout: true,
        history: true,
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
      include: {
        exercise: true,
        machine: true,
        workout: true,
        history: true,
      },
    });

    if (!db) throw new Error('Error on update set');

    return db;
  }
}
