import { History } from './history';
import { Set } from './set';
import { Workout } from './workout';

export class User {
  id: string;
  role: Role;
  doc: string;
  hash: number;
  gender: string;
  name: string;
  weigth?: number | null | undefined;
  height?: number | null | undefined;
  email: string;
  birthdate: string;
  password: string;
  sets: Set[];
  createdAt: Date | string;
  updatedAt: Date | string;
  workouts?: Workout[];
  history?: History[];
  instructorWorkouts?: Workout[];

  constructor(input: Partial<User>) {
    Object.assign(this, input);
  }
}

export type Role = 'ADMIN' | 'INSTRUCTOR' | 'USER';
