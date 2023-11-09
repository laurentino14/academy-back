import { Injectable } from '@nestjs/common';
import { ObjectId } from 'bson';
import { Workout } from 'src/domain/entities/workout';
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
      sets: input.sets,
      userId: input.userId,
      id: new ObjectId().toString(),
    });
  }
  async getById(input: string): Promise<WorkoutContract> {
    return await this.getById(input);
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
