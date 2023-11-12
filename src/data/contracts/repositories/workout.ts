import { IsNotEmpty } from 'class-validator';
import {
  CreateWorkoutInput,
  UpdateWorkoutInput,
} from 'src/domain/use-cases/workout';
import { SetContract } from '../domain/set';
import { WorkoutContract } from '../domain/workout';

export abstract class WorkoutRepository {
  abstract create(
    input: CreateWorkoutInputRepoContract,
  ): Promise<WorkoutContract>;
  abstract getById(input: string): Promise<WorkoutContract>;
  abstract getByUserId(input: string): Promise<WorkoutContract[]>;
  abstract getByInstructorId(input: string): Promise<WorkoutContract[]>;
  abstract delete(input: string): Promise<WorkoutContract>;
  abstract update(input: UpdateWorkoutInput): Promise<WorkoutContract>;
}

export abstract class CreateWorkoutInputRepoContract
  implements CreateWorkoutInput
{
  @IsNotEmpty()
  id: string;
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
