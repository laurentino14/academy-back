import { Injectable } from '@nestjs/common';
import { MachineContract } from 'src/data/contracts/domain/machine';
import {
  MachineCreateInputRepo,
  MachineRepository,
} from 'src/data/contracts/repositories/machine';
import { UpdateMachineInput } from 'src/domain/use-cases/machine';
import { PrismaDB } from 'src/infra/data-sources/prisma';

@Injectable()
export class PrismaMachineRepository implements MachineRepository {
  constructor(private readonly db: PrismaDB) {}
  async get(id: string): Promise<MachineContract> {
    const db = await this.db.machine.findUnique({ where: { id } });
    if (!db) throw new Error('Machine not found');
    return db;
  }
  async getAll(): Promise<MachineContract[]> {
    const db = await this.db.machine.findMany();

    if (!db) throw new Error('Machines not found');

    return db;
  }
  async create(data: MachineCreateInputRepo): Promise<MachineContract> {
    const db = await this.db.machine.create({ data });

    if (!db) throw new Error('Machine not created');

    return db;
  }
  async update(data: UpdateMachineInput): Promise<MachineContract> {
    const db = await this.db.machine.update({
      where: { id: data.id },
      data: { name: data.name },
    });

    if (!db) throw new Error('Machine not updated');

    return db;
  }
  async delete(id: string): Promise<MachineContract> {
    const db = await this.db.machine.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    if (!db) throw new Error('Machine not deleted');

    return db;
  }
}
