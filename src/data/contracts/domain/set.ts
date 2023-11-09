import { IsNotEmpty, IsOptional } from 'class-validator';
import { Day, Set } from 'src/domain/entities/set';
import { CreateSetInput, UpdateSetInput } from 'src/domain/use-cases/set';

export abstract class SetContract extends Set {}

export type DayContract = Day;

export abstract class CreateSetInputContract implements CreateSetInput {
  @IsNotEmpty()
  reps: number;
  @IsOptional()
  weight?: number;
  @IsNotEmpty()
  day: Day;
  @IsNotEmpty()
  exerciseId: string;
  @IsNotEmpty()
  workoutId: string;
}

export abstract class UpdateSetInputContract implements UpdateSetInput {
  @IsNotEmpty()
  id: string;
  @IsOptional()
  reps?: number;
  @IsOptional()
  weight?: number;
  @IsOptional()
  day?: Day;
  @IsOptional()
  exerciseId?: string;
  @IsOptional()
  workoutId?: string;
}
