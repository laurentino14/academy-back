import { Set } from './set';

export class Workout {
  id: string;
  name: string;
  active: boolean;
  sets?: Set[];
  userId: string;
  instructorId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
