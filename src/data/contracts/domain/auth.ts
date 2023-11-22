import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Auth } from 'src/domain/entities/auth';
import { Role } from 'src/domain/entities/user';
import { SignInInput, SignUpInput } from 'src/domain/use-cases/auth';

export abstract class AuthContract extends Auth {}

export abstract class SignInInputContract implements SignInInput {
  @ApiProperty({
    example: 'vinicius@leprevost.com',
    required: true,
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '123456', required: true })
  @IsNotEmpty()
  password: string;
}

export abstract class SignUpInputContract implements SignUpInput {
  @ApiProperty({ example: 'USER', required: true })
  @IsNotEmpty()
  role: Role;

  @ApiProperty({ example: '12345678900', required: true })
  @IsNotEmpty()
  doc: string;

  @ApiProperty({ example: 'MASC', required: true })
  @IsNotEmpty()
  gender: string;

  @ApiProperty({ example: 'Victor', required: true })
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

export abstract class RecoveryPasswordInputContract {
  @ApiProperty({
    example: 'victor@leprevost.com',
    required: true,
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '123456', required: true })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: '123456', required: true })
  @IsNotEmpty()
  confirmPassword: string;
}
