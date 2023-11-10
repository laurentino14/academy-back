import { Set } from './set';

export class Exercise {
  id: string;
  name: string;
  description?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  sets: Set[];
}
