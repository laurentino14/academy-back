import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'bson';
import { Set } from './set';

export class Workout {
  @ApiProperty({ example: new ObjectId(), required: true })
  id: string;
  @ApiProperty({ example: 'Weight loss', required: true })
  name: string;
  @ApiProperty({ example: true, required: true })
  active: boolean;
  @ApiProperty({ example: [], required: false })
  sets?: Set[];
  @ApiProperty({ example: new ObjectId(), required: true })
  userId: string;
  @ApiProperty({ example: new ObjectId(), required: true })
  instructorId: string;
  @ApiProperty({ example: new Date(), required: true })
  createdAt: Date | string;
  @ApiProperty({ example: new Date(), required: true })
  updatedAt: Date | string;
}
