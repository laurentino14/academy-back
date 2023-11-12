import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  UpdateUserInputContract,
  UserContract,
} from 'src/data/contracts/domain/user';
import {
  InputCreate,
  InputUpdatePassword,
  UserRepository,
} from 'src/data/contracts/repositories/user';
import { PrismaDB } from 'src/infra/data-sources/prisma';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaDB) {}
  async updatePassword(input: InputUpdatePassword): Promise<UserContract> {
    const find = await this.prisma.user.findUnique({
      where: {
        id: input.id,
      },
    });

    if (!find) throw new Error('User not found');

    const compare = await bcrypt.compare(input.oldPassword, find.password);

    if (!compare) throw new Error('Old password is incorrect');

    const db = await this.prisma.user.update({
      where: {
        id: input.id,
      },
      data: {
        password: input.password,
        updatedAt: new Date(),
      },
    });

    if (!db) throw new Error('Error on update password');

    return db;
  }
  async create(input: InputCreate): Promise<UserContract> {
    const db = await this.prisma.user.create({
      data: {
        ...input,
        hash:
          Math.floor(Math.random() * 1000) * Math.floor(Math.random() * 1000),
      },
      include: {
        instructorWorkouts: true,
        workouts: true,
        history: true,
        sets: true,
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
      include: {
        history: true,
        instructorWorkouts: true,
        sets: true,
        workouts: true,
      },
    });

    if (!db) throw new Error('User not found');

    return db;
  }
  async getByEmail(input: string): Promise<UserContract> {
    const db = await this.prisma.user.findUnique({
      where: {
        email: input,
      },
      include: {
        history: true,
        instructorWorkouts: true,
        sets: true,
        workouts: true,
      },
    });

    if (!db) throw new Error('User not found');
    return db;
  }

  async update(input: UpdateUserInputContract): Promise<UserContract> {
    const find = await this.prisma.user.findUnique({
      where: {
        id: input.id,
      },
    });

    if (!find) throw new Error('User not found');

    const compare = await bcrypt.compare(input.password, find.password);

    if (!compare) throw new Error('Password is incorrect');

    const data = {
      name: input.name,
      email: input.email,
      updatedAt: new Date(),
    };
    const db = await this.prisma.user.update({
      where: {
        id: input.id,
      },
      data,
      include: {
        history: true,
        instructorWorkouts: true,
        sets: true,
        workouts: true,
      },
    });

    if (!db) throw new Error('User not found');
    return db;
  }
}
