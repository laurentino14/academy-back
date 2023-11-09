import { IsNotEmpty, IsOptional } from 'class-validator';
import { Exercise } from 'src/domain/entities/exercise';
import {
  CreateExerciseInput,
  UpdateExerciseInput,
} from 'src/domain/use-cases/exercise';

export abstract class ExerciseContract extends Exercise {}

export abstract class CreateExerciseInputContract
  implements CreateExerciseInput
{
  @IsNotEmpty()
  name: string;
  @IsOptional()
  description?: string;
}

export abstract class UpdateExerciseInputContract
  implements UpdateExerciseInput
{
  @IsNotEmpty()
  id: string;
  @IsOptional()
  name?: string;
  @IsOptional()
  description?: string;
}
