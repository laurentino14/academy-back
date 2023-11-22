import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiHeaders,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import {
  AuthContract,
  RecoveryPasswordInputContract,
  SignInInputContract,
} from 'src/data/contracts/domain/auth';
import { CreateUserInputContract } from 'src/data/contracts/domain/user';
import { AuthUseCases } from 'src/domain/use-cases/auth';
import { BadRequest } from '../contracts/bad-request';
import { BooleanResponse } from '../contracts/boolean';
import { NonAuthorized } from '../contracts/non-authorized';

@Controller('auth')
@ApiTags('Auth')
@ApiHeaders([
  {
    name: 'Content-Type',
    enum: ['application/json'],
    required: true,
  },
])
export class AuthController {
  constructor(private readonly service: AuthUseCases) {}
  @Post()
  @ApiOperation({ summary: 'Sign in with an account' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: AuthContract,
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'On failure case',
    type: NonAuthorized,
  })
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
        message: 'Unauthorized!',
      });
    }
  }

  @Post('signup')
  @ApiOperation({ summary: 'Sign up an account' })
  @ApiResponse({
    status: 201,
    description: 'On success case',
    type: AuthContract,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
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
        data: err.message,
      });
    }
  }

  @Post('recovery')
  @ApiOperation({ summary: 'Recovery your password after check the code' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: BooleanResponse,
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'On failure case',
    type: BadRequest,
  })
  async recoveryPassword(
    @Body() input: RecoveryPasswordInputContract,
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
        data: err.message,
      });
    }
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Get a new access token and new refresh token token with your old refresh token',
  })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: AuthContract,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'When your token is invalid',
    type: NonAuthorized,
  })
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
      return res.status(400).json({
        data: err.message,
      });
    }
  }

  @Get('recovery/:email')
  @ApiOperation({
    summary:
      'Sent a code to your e-mail before recovery your password - Verify identity',
  })
  @ApiResponse({ status: 200, description: 'On success case', type: Number })
  async recoveryCode(@Param('email') input: string): Promise<number> {
    const code = await this.service.recoveryCode(input);
    return code;
  }
}
