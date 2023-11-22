import { ApiProperty } from '@nestjs/swagger';

export abstract class NonAuthorized {
  @ApiProperty({ example: 'Unauthorized!', required: true })
  message: string;
}
