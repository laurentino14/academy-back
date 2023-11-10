import { IsNotEmpty } from 'class-validator';
import { Machine } from 'src/domain/entities/machine';
import {
  CreateMachineInput,
  UpdateMachineInput,
} from 'src/domain/use-cases/machine';

export abstract class MachineContract extends Machine {}

export abstract class CreateMachineInputContract implements CreateMachineInput {
  @IsNotEmpty()
  name: string;
}

export abstract class UpdateMachineInputContract implements UpdateMachineInput {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  name: string;
}
