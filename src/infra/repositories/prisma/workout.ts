import { Injectable } from '@nestjs/common';
import { WorkoutContract } from 'src/data/contracts/domain/workout';
import {
  CreateWorkoutInputRepoContract,
  WorkoutRepository,
} from 'src/data/contracts/repositories/workout';
import { Workout } from 'src/domain/entities/workout';
import { UpdateWorkoutInput } from 'src/domain/use-cases/workout';
import { PrismaDB } from 'src/infra/data-sources/prisma';

@Injectable()
export class PrismaWorkoutRepository implements WorkoutRepository {
  constructor(private readonly db: PrismaDB) {}
  async create(
    input: CreateWorkoutInputRepoContract,
  ): Promise<WorkoutContract> {
    const sets = input.sets.map((set) => ({
      where: { id: set.id },
      create: {
        ...set,
      },
    }));
    const db = await this.db.workout.create({
      data: {
        id: input.id,
        active: input.active,
        name: input.name,
        Instructor: {
          connect: { id: input.instructorId },
        },
        sets: {
          connectOrCreate: sets,
        },
        User: {
          connect: { id: input.userId },
        },
      },
    });

    return db;
  }
  async getById(input: string): Promise<WorkoutContract> {
    const db = await this.db.workout.findUnique({
      where: {
        id: input,
      },
    });

    if (!db) throw new Error('Error on get workout by id');

    return db;
  }
  async getByUserId(input: string): Promise<WorkoutContract[]> {
    const db = await this.db.workout.findMany({
      where: {
        userId: input,
      },
    });

    if (!db) throw new Error('Error on get workouts by user id');

    return db;
  }
  async getByInstructorId(input: string): Promise<Workout[]> {
    const db = await this.db.workout.findMany({
      where: {
        instructorId: input,
      },
    });

    if (!db) throw new Error('Error on get workouts by instructor id');

    return db;
  }
  async delete(input: string): Promise<Workout> {
    const db = await this.db.workout.delete({
      where: {
        id: input,
      },
    });

    if (!db) throw new Error('Error on delete workout');

    return db;
  }
  async update(input: UpdateWorkoutInput): Promise<WorkoutContract> {
    const db = await this.db.workout.update({
      where: {
        id: input.id,
      },
      data: {
        active: input.active,
        name: input.name,
        sets: {
          connectOrCreate: input.sets.map((set) => ({
            where: { id: set.id },
            create: {
              ...set,
            },
          })),
        },
        userId: input.userId,
        instructorId: input.instructorId,
      },
    });

    if (!db) throw new Error('Error on update workout');

    return db;
  }
}
