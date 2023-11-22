import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'bson';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Day, Type } from 'src/domain/entities/set';
import { Workout } from 'src/domain/entities/workout';
import {
  CreateWorkoutInput,
  UpdateWorkoutInput,
} from 'src/domain/use-cases/workout';
import { SetContract } from './set';

export abstract class WorkoutContract extends Workout {}

export abstract class CreateWorkoutInputContract implements CreateWorkoutInput {
  @ApiProperty({ example: 'Weight loss', required: true })
  @IsNotEmpty()
  name: string;
  @ApiProperty({ example: true, required: true })
  @IsNotEmpty()
  active: boolean;
  @ApiProperty({
    example: [
      {
        reps: 12,
        series: 3,
        weight: 90,
        type: 'CHEST',
        day: 'MONDAY',
        machineId: new ObjectId(),
        exerciseId: new ObjectId(),
      },
      {
        reps: 12,
        series: 3,
        weight: 120,
        type: 'LEGS',
        day: 'TUESDAY',
        machineId: new ObjectId(),
        exerciseId: new ObjectId(),
      },
    ],
    required: false,
  })
  @IsNotEmpty()
  sets: SetWorkoutModel[];

  @ApiProperty({ example: new ObjectId(), required: true })
  @IsNotEmpty()
  userId: string;
  @ApiProperty({ example: new ObjectId(), required: true })
  @IsNotEmpty()
  instructorId: string;
}

export abstract class SetWorkoutModel {
  reps: number;
  series: number;
  weight?: number;
  type: Type;
  day: Day;
  userId: string;
  machineId: string;
  exerciseId: string;
  workoutId?: string;
}

export abstract class UpdateWorkoutInputContract implements UpdateWorkoutInput {
  @ApiProperty({ example: new ObjectId(), required: true })
  @IsNotEmpty()
  id: string;
  @ApiProperty({ example: true, required: false })
  @IsOptional()
  active?: boolean;

  @ApiProperty({ example: 'Weight loss', required: false })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: [
      {
        reps: 12,
        series: 3,
        weight: 90,
        type: 'CHEST',
        day: 'MONDAY',
        machineId: new ObjectId(),
        exerciseId: new ObjectId(),
      },
      {
        reps: 12,
        series: 3,
        weight: 120,
        type: 'LEGS',
        day: 'TUESDAY',
        machineId: new ObjectId(),
        exerciseId: new ObjectId(),
      },
    ],
    required: false,
  })
  @IsOptional()
  sets?: SetContract[];

  @ApiProperty({ example: new ObjectId(), required: false })
  @IsOptional()
  userId?: string;

  @ApiProperty({ example: new ObjectId(), required: false })
  @IsOptional()
  instructorId?: string;
}
