import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  UpdateUserInputContract,
  UserContract,
} from 'src/data/contracts/domain/user';
import {
  InputCreate,
  UserRepository,
} from 'src/data/contracts/repositories/user';
import { PrismaDB } from 'src/infra/data-sources/prisma';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaDB) {}
  async create(input: InputCreate): Promise<UserContract> {
    const db = await this.prisma.user.create({
      data: {
        ...input,
      },
      include: {
        instructorWorkouts: true,
        workouts: true,
      },
    });

    if (!db) throw new Error('User not created');

    return db;
  }
  async getById(input: string): Promise<UserContract> {
    const db = await this.prisma.user.findUnique({
      where: {
        id: input,
      },
    });

    if (!db) throw new Error('User not found');

    return db as UserContract;
  }
  async getByEmail(input: string): Promise<UserContract> {
    const db = await this.prisma.user.findUnique({
      where: {
        email: input,
      },
    });

    if (!db) throw new Error('User not found');
    return db as UserContract;
  }

  async update(input: UpdateUserInputContract): Promise<UserContract> {
    const hash = input.password && (await bcrypt.hash(input.password, 10));
    const data = {
      name: input.name,
      email: input.email,
      birthdate: input.birthdate,
      role: input.role,
      password: input.password ? hash : undefined,
      updatedAt: new Date(),
    };
    const db = await this.prisma.user.update({
      where: {
        id: input.id,
      },
      data,
    });

    if (!db) throw new Error('User not found');
    return db as UserContract;
  }
}
