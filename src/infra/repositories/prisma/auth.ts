import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignInInputContract } from 'src/data/contracts/domain/auth';
import { UserContract } from 'src/data/contracts/domain/user';
import { AuthRepository } from 'src/data/contracts/repositories/auth';
import { InputCreate } from 'src/data/contracts/repositories/user';
import { PrismaDB } from 'src/infra/data-sources/prisma';

@Injectable()
export class PrismaAuthRepository implements AuthRepository {
  constructor(private readonly prisma: PrismaDB) {}
  async signIn(input: SignInInputContract): Promise<UserContract> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: input.email,
      },
      include: {
        instructorWorkouts: true,
        workouts: true,
        history: true,
        sets: {
          include: {
            exercise: true,
          },
        },
      },
    });

    if (!user) throw new Error('User not found');

    const matchPassword = await bcrypt.compare(input.password, user.password);

    if (!matchPassword) throw new Error('Invalid password');

    return user;
  }

  async signUp(input: InputCreate): Promise<UserContract> {
    const find = await this.prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });

    if (find) throw new Error('User already exists');

    const findCPF = await this.prisma.user.findUnique({
      where: {
        doc: input.doc,
      },
    });

    if (findCPF) throw new Error('DOC already exists');

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
        sets: {
          include: {
            exercise: true,
          },
        },
      },
    });

    if (!db) throw new Error('User not created');

    return db;
  }

  async refresh(input: string): Promise<UserContract> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: input,
      },

      include: {
        instructorWorkouts: true,
        workouts: true,
        history: true,
        sets: {
          include: {
            exercise: true,
          },
        },
      },
    });

    if (!user) throw new Error('User not found');

    return user;
  }

  async recoveryPassword(input: {
    email: string;
    password: string;
  }): Promise<boolean> {
    const db = await this.prisma.user.update({
      where: {
        email: input.email,
      },
      data: {
        password: input.password,
      },
    });

    if (!db) throw new Error('Error on update password');

    return true;
  }
}
