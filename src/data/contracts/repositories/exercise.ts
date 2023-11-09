import { IsNotEmpty, IsOptional } from 'class-validator';
import {
  CreateExerciseInputContract,
  ExerciseContract,
  UpdateExerciseInputContract,
} from '../domain/exercise';

export abstract class ExerciseRepository {
  abstract create(
    input: CreateExerciseInputRepoContract,
  ): Promise<ExerciseContract>;
  abstract getById(input: string): Promise<ExerciseContract>;
  abstract delete(input: string): Promise<ExerciseContract>;
  abstract update(
    input: UpdateExerciseInputContract,
  ): Promise<ExerciseContract>;
}

export abstract class CreateExerciseInputRepoContract
  implements CreateExerciseInputContract
{
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  name: string;
  @IsOptional()
  description?: string;
}
