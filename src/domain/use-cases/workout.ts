import { SetWorkoutModel } from 'src/data/contracts/domain/workout';
import { Set } from '../entities/set';
import { Workout } from '../entities/workout';

export abstract class WorkoutUseCases {
  abstract create(input: CreateWorkoutInput): Promise<Workout>;
  abstract getById(input: string): Promise<Workout>;
  abstract getByUserId(input: string): Promise<Workout[]>;
  abstract getByInstructorId(input: string): Promise<Workout[]>;
  abstract delete(input: string): Promise<Workout>;
  abstract update(input: UpdateWorkoutInput): Promise<Workout>;
  abstract turnActive(input: {
    userId: string;
    workoutId: string;
  }): Promise<boolean>;
}

export abstract class CreateWorkoutInput {
  abstract name: string;
  abstract active: boolean;
  abstract sets: SetWorkoutModel[];
  abstract userId: string;
  abstract instructorId: string;
}

export abstract class UpdateWorkoutInput {
  abstract id: string;
  abstract active?: boolean;
  abstract name?: string;
  abstract sets?: Set[];
  abstract userId?: string;
  abstract instructorId?: string;
}
