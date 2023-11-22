import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'bson';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Exercise } from 'src/domain/entities/exercise';
import {
  CreateExerciseInput,
  UpdateExerciseInput,
} from 'src/domain/use-cases/exercise';

export abstract class ExerciseContract extends Exercise {}

export abstract class CreateExerciseInputContract
  implements CreateExerciseInput
{
  @ApiProperty({ example: 'Smith squat', required: true })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Squat with a barbell on the shoulders',
    required: false,
  })
  @IsOptional()
  description?: string;
}

export abstract class UpdateExerciseInputContract
  implements UpdateExerciseInput
{
  @ApiProperty({ example: new ObjectId(), required: true })
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'Smith squat', required: false })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'Squat with a barbell on the shoulders',
    required: false,
  })
  @IsOptional()
  description?: string;
}
