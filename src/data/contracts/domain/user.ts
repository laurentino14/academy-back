import { IsNotEmpty, IsOptional } from 'class-validator';
import { Role, User } from 'src/domain/entities/user';
import { CreateUserInput, UpdateUserInput } from 'src/domain/use-cases/user';

export abstract class UserContract extends User {}

export abstract class CreateUserInputContract implements CreateUserInput {
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

export abstract class UpdateUserInputContract implements UpdateUserInput {
  @IsNotEmpty()
  id: string;
  @IsOptional()
  role?: Role;
  @IsOptional()
  name?: string;
  @IsOptional()
  email?: string;
  @IsOptional()
  birthdate?: string;
  @IsOptional()
  password?: string;
}
