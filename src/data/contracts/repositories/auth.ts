import { SignInInputContract } from '../domain/auth';
import { CreateUserInputContract, UserContract } from '../domain/user';
import { InputCreate } from './user';

export abstract class AuthRepository {
  abstract signIn(input: SignInInputContract): Promise<UserContract>;
  abstract refresh(input: string): Promise<UserContract>;
  abstract signUp(input: InputCreate): Promise<UserContract>;
}
