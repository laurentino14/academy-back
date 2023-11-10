import { History } from './history';
export class Set {
  id: string;
  reps: number;
  weight?: number;
  type: Type;
  day: Day;
  userId: string;
  machineId: string;
  exerciseId: string;
  workoutId?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  history?: History[];
}
export type Type = 'BACK' | 'CHEST' | 'LEGS' | 'SHOULDERS' | 'ARMS' | 'ABS';
export type Day =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';
