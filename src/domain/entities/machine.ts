import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'bson';
import { Set } from './set';

export class Machine {
  @ApiProperty({ example: new ObjectId(), required: true })
  id: string;
  @ApiProperty({ example: 'BW-01', required: true })
  name: string;
  @ApiProperty({
    example: new Date(),
    required: true,
  })
  createdAt: Date | string;
  @ApiProperty({
    example: new Date(),
    required: true,
  })
  updatedAt: Date | string;
  @ApiProperty({
    example: [],
    required: false,
  })
  sets?: Set[];
}
