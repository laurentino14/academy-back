import { Machine } from '../entities/machine';

export abstract class MachineUseCases {
  abstract get(input: string): Promise<Machine>;
  abstract getAll(): Promise<Machine[]>;
  abstract create(input: CreateMachineInput): Promise<Machine>;
  abstract update(input: UpdateMachineInput): Promise<Machine>;
  abstract delete(input: string): Promise<Machine>;
}

export abstract class CreateMachineInput {
  abstract name: string;
}

export abstract class UpdateMachineInput {
  abstract id: string;
  abstract name: string;
}
