import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
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
      const auth = await this.service.signUp(input);
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

  @Post('recovery')
  async recoveryPassword(
    @Body() input: { email: string; password: string; confirmPassword: string },
  ): Promise<HttpResponse<boolean>> {
    try {
      const data = await this.service.recoveryPassword(input);
      return {
        statusCode: 200,
        data: data,
      };
    } catch (err) {
      console.error(err);
      return {
        statusCode: 400,
        data: err,
      };
    }
  }

  @Get('recovery/:email')
  async recoveryCode(@Param('email') input: string): Promise<number> {
    const code = await this.service.recoveryCode(input);
    return code;
  }
}
