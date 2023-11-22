import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'bson';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Day, Set, Type } from 'src/domain/entities/set';
import { CreateSetInput, UpdateSetInput } from 'src/domain/use-cases/set';

export abstract class SetContract extends Set {}

export type DayContract = Day;
export type TypeContract = Type;
export abstract class CreateSetInputContract implements CreateSetInput {
  @ApiProperty({ example: new ObjectId(), required: true })
  @IsNotEmpty()
  machineId: string;

  @ApiProperty({ example: 10, required: true })
  @IsNotEmpty()
  reps: number;

  @ApiProperty({ example: 3, required: true })
  @IsNotEmpty()
  series: number;

  @ApiProperty({ example: 'CHEST', required: true })
  @IsNotEmpty()
  type: Type;

  @ApiProperty({ example: new ObjectId(), required: true })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 40, required: false })
  @IsOptional()
  weight?: number;

  @ApiProperty({ example: 'MONDAY', required: true })
  @IsNotEmpty()
  day: Day;

  @ApiProperty({ example: new ObjectId(), required: true })
  @IsNotEmpty()
  exerciseId: string;

  @ApiProperty({ example: new ObjectId(), required: true })
  @IsNotEmpty()
  workoutId: string;
}

export abstract class UpdateSetInputContract implements UpdateSetInput {
  @ApiProperty({ example: new ObjectId(), required: true })
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 12, required: false })
  @IsOptional()
  reps?: number;

  @ApiProperty({ example: 'LEGS', required: false })
  @IsOptional()
  type?: Type;

  @ApiProperty({ example: 3, required: false })
  @IsOptional()
  series?: number;

  @ApiProperty({ example: 50, required: false })
  @IsOptional()
  weight?: number;

  @ApiProperty({ example: 'TUESDAY', required: false })
  @IsOptional()
  day?: Day;

  @ApiProperty({ example: new ObjectId(), required: false })
  @IsOptional()
  exerciseId?: string;

  @ApiProperty({ example: new ObjectId(), required: false })
  @IsOptional()
  workoutId?: string;
}
