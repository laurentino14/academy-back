import { IsNotEmpty } from 'class-validator';
import { Auth } from 'src/domain/entities/auth';
import { Role } from 'src/domain/entities/user';
import { SignInInput, SignUpInput } from 'src/domain/use-cases/auth';

export abstract class AuthContract extends Auth {}

export abstract class SignInInputContract implements SignInInput {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}

export abstract class SignUpInputContract implements SignUpInput {
  @IsNotEmpty()
  role: Role;
  @IsNotEmpty()
  doc: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  birthdate: string;
  @IsNotEmpty()
  password: string;
}
