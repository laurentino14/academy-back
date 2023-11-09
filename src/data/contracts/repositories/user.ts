import { IsNotEmpty } from 'class-validator';
import { Role } from 'src/domain/entities/user';
import { UpdateUserInputContract, UserContract } from '../domain/user';

export abstract class UserRepository {
  abstract create(input: InputCreate): Promise<UserContract>;
  abstract getById(input: string): Promise<UserContract>;
  abstract getByEmail(input: string): Promise<UserContract>;
  abstract update(input: UpdateUserInputContract): Promise<UserContract>;
}

export abstract class InputCreate {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  role: Role;
  @IsNotEmpty()
  doc: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  gender: string;
  @IsNotEmpty()
  birthdate: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  createdAt: Date | string;
  @IsNotEmpty()
  updatedAt: Date | string;
}
