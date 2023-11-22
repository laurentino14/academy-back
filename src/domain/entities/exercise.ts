import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'bson';
import { Set } from './set';

export class Exercise {
  @ApiProperty({ example: new ObjectId(), required: true })
  id: string;
  @ApiProperty({ example: 'Smith squat', required: true })
  name: string;
  @ApiProperty({
    example: 'Squat with a barbell on the shoulders',
    required: false,
  })
  description?: string;
  @ApiProperty({ example: new Date(), required: true })
  createdAt: Date | string;
  @ApiProperty({ example: new Date(), required: true })
  updatedAt: Date | string;
  @ApiProperty({ example: null, required: false })
  deletedAt?: Date | undefined | null;
  @ApiProperty({ example: [], required: true })
  sets: Set[];
}
