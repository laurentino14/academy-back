import { IsNotEmpty, IsOptional } from 'class-validator';
import { Day, Type } from 'src/domain/entities/set';
import { Workout } from 'src/domain/entities/workout';
import {
  CreateWorkoutInput,
  UpdateWorkoutInput,
} from 'src/domain/use-cases/workout';
import { SetContract } from './set';

export abstract class WorkoutContract extends Workout {}

export abstract class CreateWorkoutInputContract implements CreateWorkoutInput {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  active: boolean;

  @IsNotEmpty()
  sets: SetWorkoutModel[];
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  instructorId: string;
}

export abstract class SetWorkoutModel {
  reps: number;
  series: number;
  weight?: number;
  type: Type;
  day: Day;
  userId: string;
  machineId: string;
  exerciseId: string;
  workoutId?: string;
}

export abstract class UpdateWorkoutInputContract implements UpdateWorkoutInput {
  @IsNotEmpty()
  id: string;
  @IsOptional()
  active?: boolean;

  @IsOptional()
  name?: string;
  @IsOptional()
  sets?: SetContract[];
  @IsOptional()
  userId?: string;
  @IsOptional()
  instructorId?: string;
}
