import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import {
  AuthContract,
  SignInInputContract,
} from 'src/data/contracts/domain/auth';
import { CreateUserInputContract } from 'src/data/contracts/domain/user';
import { AuthUseCases } from 'src/domain/use-cases/auth';
import { HttpResponse } from '../contracts/http-reponse';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthUseCases) {}
  @Post()
  async signIn(
    @Body() input: SignInInputContract,
  ): Promise<HttpResponse<AuthContract>> {
    try {
      console.log(input);
      const auth = await this.service.signIn(input);
      return {
        statusCode: 200,
        data: auth,
      };
    } catch (err) {
      return {
        statusCode: 400,
        data: err,
      };
    }
  }

  @Post('signup')
  async signUp(
    @Body() input: CreateUserInputContract,
  ): Promise<HttpResponse<AuthContract>> {
    try {
      console.log(input);
      const auth = await this.service.signUp(input);
      console.log(auth);
      return {
        statusCode: 200,
        data: auth,
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 400,
        data: err,
      };
    }
  }

  @Get()
  async refresh(
    @Headers('authorization') input: string,
  ): Promise<HttpResponse<AuthContract>> {
    try {
      const token = input.split(' ')[1];
      const auth = await this.service.refresh(token);
      return {
        statusCode: 200,
        data: auth,
      };
    } catch (err) {
      return {
        statusCode: 400,
        data: err,
      };
    }
  }
}
