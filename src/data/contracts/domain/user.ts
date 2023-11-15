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
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  passwordConfirmation: string;
  @IsNotEmpty()
  oldPassword: string;
}
export abstract class CreateUserInputContract implements CreateUserInput {
  @IsNotEmpty()
  role: 'ADMIN' | 'USER' | 'INSTRUCTOR';
  @IsNotEmpty()
  doc: string;
  @IsNotEmpty()
  gender: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  birthdate: string;
  @IsNotEmpty()
  password: string;
}

export abstract class UpdateUserInputContract implements UpdateUserInput {
  @IsNotEmpty()
  id: string;

  @IsOptional()
  name?: string;
  @IsOptional()
  email?: string;
  @IsOptional()
  weigth?: number | null | undefined;
  @IsOptional()
  height?: number | null | undefined;
  @IsNotEmpty()
  password: string;
}
