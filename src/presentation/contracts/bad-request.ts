import { ApiProperty } from '@nestjs/swagger';

export abstract class BadRequest {
  @ApiProperty({
    example: 'Error at connect with the database!',
    required: true,
  })
  data: string;
}
