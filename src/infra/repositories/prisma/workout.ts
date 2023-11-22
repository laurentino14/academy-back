import { Injectable } from '@nestjs/common';
import { ObjectId } from 'bson';
import { SetContract } from 'src/data/contracts/domain/set';
import { WorkoutContract } from 'src/data/contracts/domain/workout';
import {
  CreateWorkoutInputRepoContract,
  WorkoutRepository,
} from 'src/data/contracts/repositories/workout';
import { UpdateWorkoutInput } from 'src/domain/use-cases/workout';
import { PrismaDB } from 'src/infra/data-sources/prisma';

@Injectable()
export class PrismaWorkoutRepository implements WorkoutRepository {
  constructor(private readonly db: PrismaDB) {}
  async create(
    input: CreateWorkoutInputRepoContract,
  ): Promise<WorkoutContract> {
    const find = await this.db.user.findUnique({
      where: {
        hash: Number(input.userId),
      },
    });

    if (!find) throw new Error('User not found');
    const userId = find.id;

    await this.db.workout.updateMany({
      where: {
        userId: userId,
        active: true,
      },
      data: {
        active: false,
      },
    });

    const db = await this.db.workout
      .create({
        data: {
          id: input.id,
          active: input.active,
          name: input.name,
          instructor: {
            connect: { id: input.instructorId },
          },
          sets: {
            createMany: {
              data: input.sets.map((set) => {
                return {
                  ...set,
                  userId,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  workoutId: undefined,
                };
              }),
            },
          },
          user: {
            connect: { id: userId },
          },
        },
        include: {
          sets: true,
          instructor: true,
          user: true,
        },
      })
      .then((res) => {
        return res;
      });

    return db;
  }
  async getById(input: string): Promise<WorkoutContract> {
    const db = await this.db.workout.findUnique({
      where: {
        id: input,
      },
      select: {
        createdAt: true,
        active: true,
        id: true,
        instructorId: true,
        instructor: true,
        name: true,
        sets: {
          include: {
            exercise: true,
            user: true,
            machine: true,
            history: true,
            workout: true,
          },
        },
        updatedAt: true,
        userId: true,
        user: true,
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
      include: {
        instructor: true,
        user: true,
        sets: { include: { exercise: true } },
      },
    });

    if (!db) throw new Error('Error on get workouts by user id');

    return db;
  }
  async getByInstructorId(input: string): Promise<WorkoutContract[]> {
    const db = await this.db.workout.findMany({
      where: {
        instructorId: input,
      },
      include: {
        instructor: true,
        sets: { include: { exercise: true } },
        user: true,
      },
    });

    if (!db) throw new Error('Error on get workouts by instructor id');

    return db;
  }
  async delete(input: string): Promise<WorkoutContract> {
    const db = await this.db.workout.delete({
      where: {
        id: input,
      },
      include: {
        instructor: true,
        sets: true,
        user: true,
      },
    });

    if (!db) throw new Error('Error on delete workout');

    return db;
  }
  async update(input: UpdateWorkoutInput): Promise<WorkoutContract> {
    const createFilter = input.sets.filter((set) => !set.id);
    const create: SetContract[] = createFilter.map((set) => {
      return {
        id: new ObjectId().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
        day: set.day,
        exerciseId: set.exerciseId,
        machineId: set.machineId,
        reps: set.reps,
        series: set.series,
        type: set.type,
        userId: input.userId,
        weight: set.weight,
      };
    });

    const up = input.sets
      .filter((set) => set.id && !set.deletedAt)
      .map((set) => {
        return {
          id: set.id,
          reps: set.reps,
          weight: set.weight,
          userId: set.userId,
          createdAt: set.createdAt,
          updatedAt: set.updatedAt,
          day: set.day,
          machineId: set.machineId,
          exerciseId: set.exerciseId,
          series: set.series,
          type: set.type,
        };
      });
    console.log(create);
    console.log(up, 'up');

    const deleted = input.sets.filter((set) => {
      return set.deletedAt === 'deleted';
    });

    const db = await this.db.workout
      .update({
        where: {
          id: input.id,
        },
        data: {
          active: input.active,
          name: input.name,
          sets: {
            disconnect: deleted.map((set) => ({
              id: set.id,
            })),
            createMany: create.length > 0 ? { data: create } : undefined,
            updateMany: [
              ...up.map((set) => {
                const newSet = {
                  reps: set.reps,
                  weight: set.weight,
                  updatedAt: new Date(),
                  day: set.day,
                  machineId: set.machineId,
                  exerciseId: set.exerciseId,
                  series: set.series,
                  type: set.type,
                };
                return {
                  where: {
                    id: set.id,
                  },
                  data: {
                    ...newSet,
                  },
                };
              }),
            ],
          },
          userId: input.userId,
          instructorId: input.instructorId,
        },
        include: {
          instructor: true,
          sets: true,
          user: true,
        },
      })
      .catch((err) => console.log(err));

    if (!db) throw new Error('Error on update workout');

    return db;
  }

  async turnActive(input: {
    userId: string;
    workoutId: string;
  }): Promise<boolean> {
    await this.db.workout.updateMany({
      where: {
        userId: input.userId,
        active: true,
      },
      data: {
        active: false,
      },
    });
    const db = await this.db.workout.update({
      where: {
        id: input.workoutId,
      },
      data: {
        active: true,
      },
    });
    if (!db) throw new Error('Error on turn active workout');

    return true;
  }
}
