import { History } from './history';
import { Workout } from './workout';

export class User {
  id: string;
  role: Role;
  doc: string;
  gender: string;
  name: string;
  email: string;
  birthdate: string;
  password: string;
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
