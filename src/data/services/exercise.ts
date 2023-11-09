import { ObjectId } from 'bson';
import {
  CreateExerciseInput,
  ExerciseUseCases,
  UpdateExerciseInput,
} from 'src/domain/use-cases/exercise';
import { ExerciseContract } from '../contracts/domain/exercise';
import { ExerciseRepository } from '../contracts/repositories/exercise';

export class ExerciseService implements ExerciseUseCases {
  constructor(private readonly repo: ExerciseRepository) {}
  async create(input: CreateExerciseInput): Promise<ExerciseContract> {
    const { name, description } = input;
    return await this.repo.create({
      name,
      description,
      id: new ObjectId().toString(),
    });
  }
  async getById(input: string): Promise<ExerciseContract> {
    return await this.repo.getById(input);
  }
  async delete(input: string): Promise<ExerciseContract> {
    return await this.repo.delete(input);
  }
  async update(input: UpdateExerciseInput): Promise<ExerciseContract> {
    return await this.repo.update(input);
  }
}
