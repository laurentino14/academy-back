import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  CreateUserInputContract,
  UpdateUserInputContract,
  UpdateUserPasswordContract,
  UserContract,
} from 'src/data/contracts/domain/user';
import { User } from 'src/domain/entities/user';
import { UserUseCases } from 'src/domain/use-cases/user';
import { HttpResponse } from '../contracts/http-reponse';
import { AuthGuard } from '../guards/auth';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserUseCases) {}

  @Post()
  async create(
    @Body() input: CreateUserInputContract,
  ): Promise<HttpResponse<User>> {
    try {
      const user = await this.service.create(input);
      return {
        statusCode: 201,
        data: user,
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        data: err,
      };
    }
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  async getById(@Param('id') input: string): Promise<HttpResponse<User>> {
    try {
      const user = await this.service.getById(input);
      return {
        statusCode: 200,
        data: user,
      };
    } catch (err) {
      return {
        statusCode: 500,
        data: err,
      };
    }
  }
  @UseGuards(AuthGuard)
  @Get('email/:email')
  async getByEmail(@Param('email') input: string): Promise<HttpResponse<User>> {
    try {
      const user = await this.service.getByEmail(input);
      return {
        statusCode: 200,
        data: user,
      };
    } catch (err) {
      return {
        statusCode: 500,
        data: err,
      };
    }
  }
  @UseGuards(AuthGuard)
  @Patch()
  async update(
    @Body() input: UpdateUserInputContract,
  ): Promise<HttpResponse<User>> {
    console.log(input);
    try {
      const user = await this.service.update(input);
      return {
        statusCode: 200,
        data: user,
      };
    } catch (err) {
      return {
        statusCode: 500,
        data: err,
      };
    }
  }

  @Patch('password')
  async updatePassword(
    @Body() input: UpdateUserPasswordContract,
  ): Promise<HttpResponse<UserContract>> {
    try {
      const user = await this.service.updatePassword(input);
      return {
        statusCode: 200,
        data: user,
      };
    } catch (err) {
      return {
        statusCode: 500,
        data: err,
      };
    }
  }
}
