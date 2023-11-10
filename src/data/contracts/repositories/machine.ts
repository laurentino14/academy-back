import { IsNotEmpty } from 'class-validator';
import { UpdateMachineInput } from 'src/domain/use-cases/machine';
import { MachineContract } from '../domain/machine';

export abstract class MachineRepository {
  abstract get(id: string): Promise<MachineContract>;
  abstract getAll(): Promise<MachineContract[]>;
  abstract create(data: MachineCreateInputRepo): Promise<MachineContract>;
  abstract update(data: UpdateMachineInput): Promise<MachineContract>;
  abstract delete(id: string): Promise<MachineContract>;
}

export abstract class MachineCreateInputRepo {
  @IsNotEmpty()
  abstract id: string;
  @IsNotEmpty()
  abstract name: string;
}
