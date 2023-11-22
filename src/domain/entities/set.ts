import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'bson';
import { History } from './history';
import { Workout } from './workout';
export class Set {
  @ApiProperty({ example: new ObjectId(), required: true })
  id: string;
  @ApiProperty({ example: 12, required: true })
  reps: number;
  @ApiProperty({ example: 3, required: true })
  series: number;
  @ApiProperty({ example: 20, required: false })
  weight?: number;
  @ApiProperty({ example: 'BACK', required: true })
  type: Type;
  @ApiProperty({ example: 'MONDAY', required: true })
  day: Day;
  @ApiProperty({ example: new ObjectId(), required: true })
  userId: string;
  @ApiProperty({ example: new ObjectId(), required: true })
  machineId: string;
  @ApiProperty({ example: new ObjectId(), required: true })
  exerciseId: string;
  @ApiProperty({ example: [], required: false })
  workout?: Workout;
  @ApiProperty({ example: new ObjectId(), required: false })
  workoutId?: string;
  @ApiProperty({ example: new Date(), required: true })
  createdAt: Date | string;
  @ApiProperty({ example: new Date(), required: true })
  updatedAt: Date | string;
  @ApiProperty({ example: null, required: false })
  deletedAt?: Date | string | null | undefined;
  @ApiProperty({ example: [], required: false })
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
