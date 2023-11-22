import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'bson';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/domain/entities/user';
import {
  CreateUserInput,
  UpdatePasswordInput,
  UpdateUserInput,
} from 'src/domain/use-cases/user';

export abstract class UserContract extends User {}

export abstract class UpdateUserPasswordContract
  implements UpdatePasswordInput
{
  @ApiProperty({ example: new ObjectId(), required: true })
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: '123456', required: true })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: '123456', required: true })
  @IsNotEmpty()
  passwordConfirmation: string;

  @ApiProperty({ example: '123456', required: true })
  @IsNotEmpty()
  oldPassword: string;
}
export abstract class CreateUserInputContract implements CreateUserInput {
  @ApiProperty({ example: 'USER', required: true })
  @IsNotEmpty()
  role: 'ADMIN' | 'USER' | 'INSTRUCTOR';

  @ApiProperty({ example: '12345678900', required: true })
  @IsNotEmpty()
  doc: string;

  @ApiProperty({ example: 'MASC', required: true })
  @IsNotEmpty()
  gender: string;

  @ApiProperty({ example: 'Vinicius', required: true })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'vinicius@leprevost.com',
    required: true,
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '1999-01-01', required: true })
  @IsNotEmpty()
  birthdate: string;

  @ApiProperty({ example: '123456', required: true })
  @IsNotEmpty()
  password: string;
}

export abstract class UpdateUserInputContract implements UpdateUserInput {
  @ApiProperty({ example: new ObjectId(), required: true })
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'Vinicius', required: false })
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'vinicius@leprevost', required: false })
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '75', required: false })
  @IsOptional()
  weigth?: number | null | undefined;

  @ApiProperty({ example: '1.75', required: false })
  @IsOptional()
  height?: number | null | undefined;

  @ApiProperty({ example: '123456', required: true })
  @IsNotEmpty()
  password: string;
}
