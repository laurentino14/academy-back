import { Injectable } from '@nestjs/common';
import { ObjectId } from 'bson';
import {
  UpdateWorkoutInput,
  WorkoutUseCases,
} from 'src/domain/use-cases/workout';
import {
  CreateWorkoutInputContract,
  WorkoutContract,
} from '../contracts/domain/workout';
import { WorkoutRepository } from '../contracts/repositories/workout';

@Injectable()
export class WorkoutService implements WorkoutUseCases {
  constructor(private readonly repo: WorkoutRepository) {}
  async create(input: CreateWorkoutInputContract): Promise<WorkoutContract> {
    return await this.repo.create({
      active: input.active,
      instructorId: input.instructorId,
      name: input.name,
      sets: input.sets.map((set) => {
        return {
          id: new ObjectId().toString(),
          reps: Number(set.reps),
          weight: set.weight,
          createdAt: new Date(),
          day: set.day,
          exerciseId: set.exerciseId,
          machineId: set.machineId,
          series: set.series,
          type: set.type,
          updatedAt: new Date(),
          userId: set.userId,
        };
      }),
      userId: input.userId,
      id: new ObjectId().toString(),
    });
  }
  async getById(input: string): Promise<WorkoutContract> {
    return await this.repo.getById(input);
  }
  async getByUserId(input: string): Promise<WorkoutContract[]> {
    return await this.repo.getByUserId(input);
  }
  async getByInstructorId(input: string): Promise<WorkoutContract[]> {
    return await this.repo.getByInstructorId(input);
  }
  async delete(input: string): Promise<WorkoutContract> {
    return await this.repo.delete(input);
  }
  async update(input: UpdateWorkoutInput): Promise<WorkoutContract> {
    return await this.repo.update(input);
  }
}
