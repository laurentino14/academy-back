import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateSetInput } from 'src/domain/use-cases/set';
import {
  DayContract,
  SetContract,
  TypeContract,
  UpdateSetInputContract,
} from '../domain/set';

export abstract class SetRepository {
  abstract create(input: CreateSetInputRepoContract): Promise<SetContract>;
  abstract getById(input: string): Promise<SetContract>;
  abstract getAllByUserID(input: string): Promise<SetContract[]>;
  abstract delete(input: string): Promise<SetContract>;
  abstract update(input: UpdateSetInputContract): Promise<SetContract>;
}

export abstract class CreateSetInputRepoContract implements CreateSetInput {
  @IsNotEmpty()
  abstract id: string;
  @IsNotEmpty()
  abstract reps: number;
  @IsNotEmpty()
  abstract series: number;
  @IsNotEmpty()
  abstract type: TypeContract;
  @IsNotEmpty()
  abstract userId: string;
  @IsOptional()
  abstract weight?: number;
  @IsNotEmpty()
  abstract machineId: string;
  @IsNotEmpty()
  abstract day: DayContract;
  @IsNotEmpty()
  abstract exerciseId: string;
  @IsOptional()
  abstract workoutId?: string;
}
