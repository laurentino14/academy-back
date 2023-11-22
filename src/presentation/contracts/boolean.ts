import { ApiProperty } from '@nestjs/swagger';

export abstract class BooleanResponse {
  @ApiProperty({ example: true, required: true })
  data: boolean;
}
