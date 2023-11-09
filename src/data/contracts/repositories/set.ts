import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateSetInput } from 'src/domain/use-cases/set';
import {
  DayContract,
  SetContract,
  UpdateSetInputContract,
} from '../domain/set';

export abstract class SetRepository {
  abstract create(input: CreateSetInputRepoContract): Promise<SetContract>;
  abstract getById(input: string): Promise<SetContract>;
  abstract delete(input: string): Promise<SetContract>;
  abstract update(input: UpdateSetInputContract): Promise<SetContract>;
}

abstract class CreateSetInputRepoContract implements CreateSetInput {
  @IsNotEmpty()
  abstract id: string;
  @IsNotEmpty()
  abstract reps: number;
  @IsOptional()
  abstract weight?: number;
  @IsNotEmpty()
  abstract day: DayContract;
  @IsNotEmpty()
  abstract exerciseId: string;
  @IsNotEmpty()
  abstract workoutId: string;
}
