import { Exercise } from '../entities/exercise';

export abstract class ExerciseUseCases {
  abstract create(input: CreateExerciseInput): Promise<Exercise>;
  abstract getById(input: string): Promise<Exercise>;
  abstract delete(input: string): Promise<Exercise>;
  abstract update(input: UpdateExerciseInput): Promise<Exercise>;
  abstract getAll(): Promise<Exercise[]>;
}

export abstract class CreateExerciseInput {
  abstract name: string;
  abstract description?: string;
}

export abstract class UpdateExerciseInput {
  abstract id: string;
  abstract name?: string;
  abstract description?: string;
}
