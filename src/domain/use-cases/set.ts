import { Day, Set, Type } from '../entities/set';

export abstract class SetUseCases {
  abstract create(input: CreateSetInput): Promise<Set>;
  abstract getById(input: string): Promise<Set>;
  abstract getAllByUserID(input: string): Promise<Set[]>;
  abstract update(input: UpdateSetInput): Promise<Set>;
  abstract delete(input: string): Promise<Set>;
}

export abstract class CreateSetInput {
  abstract reps: number;
  abstract weight?: number;
  abstract series: number;
  abstract userId: string;
  abstract type: Type;
  abstract day: Day;
  abstract machineId: string;
  abstract exerciseId: string;
  abstract workoutId?: string;
}

export abstract class UpdateSetInput {
  abstract id: string;
  abstract reps?: number;
  abstract series?: number;
  abstract weight?: number;
  abstract type?: Type;
  abstract machineId?: string;
  abstract day?: Day;
  abstract exerciseId?: string;
  abstract workoutId?: string;
}
