import { Role, User } from '../entities/user';

export abstract class UserUseCases {
  abstract create(input: CreateUserInput): Promise<User>;
  abstract getById(input: string): Promise<User>;
  abstract getByEmail(input: string): Promise<User>;
  abstract getAll(): Promise<User[]>;
  abstract update(input: UpdateUserInput): Promise<User>;
  abstract updatePassword(input: UpdatePasswordInput): Promise<User>;
  abstract toInstructor(input: string): Promise<User>;
  abstract delete(input: string): Promise<User>;
}

export abstract class CreateUserInput {
  abstract role: Role;
  abstract doc: string;
  abstract name: string;
  abstract gender: string;
  abstract email: string;
  abstract birthdate: Date | string;
  abstract password: string;
}

export abstract class UpdatePasswordInput {
  abstract id: string;
  abstract password: string;
  abstract passwordConfirmation: string;
  abstract oldPassword: string;
}

export abstract class UpdateUserInput {
  abstract id: string;
  abstract weigth?: number | null | undefined;
  abstract height?: number | null | undefined;
  abstract name?: string;
  abstract email?: string;
  abstract password: string;
}
