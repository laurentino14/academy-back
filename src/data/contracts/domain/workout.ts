import { IsNotEmpty, IsOptional } from 'class-validator';
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
  sets: SetContract[];
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  instructorId: string;
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
