import { Role, User } from '../entities/user';

export abstract class UserUseCases {
  abstract create(input: CreateUserInput): Promise<User>;
  abstract getById(input: string): Promise<User>;
  abstract getByEmail(input: string): Promise<User>;
  abstract update(input: UpdateUserInput): Promise<User>;
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

export abstract class UpdateUserInput {
  abstract id: string;
  abstract role?: Role;
  abstract gender?: string;
  abstract name?: string;
  abstract email?: string;
  abstract birthdate?: string;
  abstract password?: string;
}
