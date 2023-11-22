import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'bson';
import { History } from './history';
import { Set } from './set';
import { Workout } from './workout';

export class User {
  @ApiProperty({ example: new ObjectId(), required: true })
  id: string;
  @ApiProperty({ example: 'USER', required: true })
  role: Role;
  @ApiProperty({ example: '12345678900', required: true })
  doc: string;
  @ApiProperty({ example: 42719, required: true })
  hash: number;
  @ApiProperty({ example: 'MASC', required: true })
  gender: string;
  @ApiProperty({ example: 'Vinicius Leprevost', required: true })
  name: string;
  @ApiProperty({ example: 70, required: false })
  weigth?: number | null | undefined;
  @ApiProperty({ example: 1.7, required: false })
  height?: number | null | undefined;
  @ApiProperty({ example: 'vinicius@leprevost.com', required: true })
  email: string;
  @ApiProperty({ example: '1995-01-01', required: true })
  birthdate: string;
  @ApiProperty({ example: '_', required: true })
  password: string;
  @ApiProperty({ example: [], required: false })
  sets: Set[];
  @ApiProperty({ example: new Date(), required: true })
  createdAt: Date | string;
  @ApiProperty({ example: new Date(), required: true })
  updatedAt: Date | string;
  @ApiProperty({ example: [], required: false })
  workouts?: Workout[];
  @ApiProperty({ example: [], required: false })
  history?: History[];
  @ApiProperty({ example: [], required: false })
  instructorWorkouts?: Workout[];

  constructor(input: Partial<User>) {
    Object.assign(this, input);
  }
}

export type Role = 'ADMIN' | 'INSTRUCTOR' | 'USER';
