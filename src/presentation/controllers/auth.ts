import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  AuthContract,
  SignInInputContract,
} from 'src/data/contracts/domain/auth';
import { CreateUserInputContract } from 'src/data/contracts/domain/user';
import { AuthUseCases } from 'src/domain/use-cases/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthUseCases) {}
  @Post()
  async signIn(
    @Body() input: SignInInputContract,
    @Res() res: Response,
  ): Promise<Response<AuthContract>> {
    try {
      const auth = await this.service.signIn(input);
      return res.status(200).json({
        data: auth,
      });
    } catch (err) {
      return res.status(401).json({
        data: err,
      });
    }
  }

  @Post('signup')
  async signUp(
    @Body() input: CreateUserInputContract,
    @Res() res: Response,
  ): Promise<Response<AuthContract>> {
    try {
      const auth = await this.service.signUp(input);
      return res.status(201).json({
        data: auth,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }

  @Get()
  async refresh(
    @Headers('authorization') input: string,
    @Res() res: Response,
  ): Promise<Response<AuthContract>> {
    try {
      const token = input.split(' ')[1];
      const auth = await this.service.refresh(token);
      return res.status(200).json({
        data: auth,
      });
    } catch (err) {
      return res.status(401).json({
        data: err,
      });
    }
  }

  @Post('recovery')
  async recoveryPassword(
    @Body() input: { email: string; password: string; confirmPassword: string },
    @Res() res: Response,
  ): Promise<Response<boolean>> {
    try {
      const data = await this.service.recoveryPassword(input);
      return res.status(200).json({
        data,
      });
    } catch (err) {
      console.error(err);
      return res.status(401).json({
        data: err,
      });
    }
  }

  @Get('recovery/:email')
  async recoveryCode(@Param('email') input: string): Promise<number> {
    const code = await this.service.recoveryCode(input);
    return code;
  }
}
