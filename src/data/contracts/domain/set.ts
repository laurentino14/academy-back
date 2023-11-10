import { IsNotEmpty, IsOptional } from 'class-validator';
import { Day, Set, Type } from 'src/domain/entities/set';
import { CreateSetInput, UpdateSetInput } from 'src/domain/use-cases/set';

export abstract class SetContract extends Set {}

export type DayContract = Day;
export type TypeContract = Type;
export abstract class CreateSetInputContract implements CreateSetInput {
  @IsNotEmpty()
  machineId: string;
  @IsNotEmpty()
  reps: number;
  @IsNotEmpty()
  type: Type;
  @IsNotEmpty()
  userId: string;
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
  type?: Type;
  @IsOptional()
  weight?: number;
  @IsOptional()
  day?: Day;
  @IsOptional()
  exerciseId?: string;
  @IsOptional()
  workoutId?: string;
}
