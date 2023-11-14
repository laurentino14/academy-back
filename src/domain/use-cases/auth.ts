import { Auth } from '../entities/auth';
import { Role } from '../entities/user';

export abstract class AuthUseCases {
  abstract signIn(input: SignInInput): Promise<Auth>;
  abstract refresh(input: string): Promise<Auth>;
  abstract signUp(input: SignUpInput): Promise<Auth>;
  abstract recoveryPassword(input: {
    email: string;
    password: string;
    confirmPassword: string;
  }): Promise<boolean>;
  abstract recoveryCode(input: string): Promise<number>;
}

export abstract class SignInInput {
  abstract email: string;
  abstract password: string;
}

export abstract class SignUpInput {
  role: Role;
  doc: string;
  name: string;
  gender: string;
  email: string;
  birthdate: string;
  password: string;
}
