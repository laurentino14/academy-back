import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'bson';

export class History {
  @ApiProperty({ example: new ObjectId(), required: true })
  id: string;
  @ApiProperty({ example: new ObjectId(), required: true })
  setId: string;
  @ApiProperty({ example: 5, required: true })
  stars?: number;
  @ApiProperty({ example: new Date(), required: true })
  createdAt: Date | string;
  @ApiProperty({ example: new Date(), required: true })
  updatedAt: Date | string;
  @ApiProperty({ example: new ObjectId(), required: true })
  userId: string;
}
