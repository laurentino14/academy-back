import { Injectable } from '@nestjs/common';
import { ObjectId } from 'bson';
import {
  CreateMachineInput,
  MachineUseCases,
  UpdateMachineInput,
} from 'src/domain/use-cases/machine';
import { MachineContract } from '../contracts/domain/machine';
import {
  MachineCreateInputRepo,
  MachineRepository,
} from '../contracts/repositories/machine';

@Injectable()
export class MachineService implements MachineUseCases {
  constructor(private readonly repo: MachineRepository) {}
  async create(data: CreateMachineInput): Promise<MachineContract> {
    const machine: MachineCreateInputRepo = {
      id: new ObjectId().toString(),
      name: data.name,
    };
    return await this.repo.create(machine);
  }
  async get(id: string): Promise<MachineContract> {
    return await this.get(id);
  }
  async getAll(): Promise<MachineContract[]> {
    return await this.repo.getAll();
  }
  async update(data: UpdateMachineInput): Promise<MachineContract> {
    return await this.repo.update(data);
  }
  async delete(id: string): Promise<MachineContract> {
    return await this.repo.delete(id);
  }
}
