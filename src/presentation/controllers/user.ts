import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import {
  CreateUserInputContract,
  UpdateUserInputContract,
  UpdateUserPasswordContract,
  UserContract,
} from 'src/data/contracts/domain/user';
import { User } from 'src/domain/entities/user';
import { UserUseCases } from 'src/domain/use-cases/user';
import { AuthGuard } from '../guards/auth';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly service: UserUseCases) {}

  @Post()
  async create(
    @Body() input: CreateUserInputContract,
    @Res() res: Response,
  ): Promise<Response<User>> {
    try {
      const user = await this.service.create(input);
      return res.status(201).json({
        data: user,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }

  @Get(':id')
  async getById(
    @Param('id') input: string,
    @Res() res: Response,
  ): Promise<Response<User>> {
    try {
      const user = await this.service.getById(input);
      return res.status(200).json({
        data: user,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }

  @Get('email/:email')
  async getByEmail(
    @Param('email') input: string,
    @Res() res: Response,
  ): Promise<Response<User>> {
    try {
      const user = await this.service.getByEmail(input);
      return res.status(200).json({
        data: user,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }

  @Get()
  async getAll(@Res() res: Response): Promise<Response<UserContract[]>> {
    try {
      const data = await this.service.getAll();

      return res.status(200).json({
        data,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }

  @Patch()
  async update(
    @Body() input: UpdateUserInputContract,
    @Res() res: Response,
  ): Promise<Response<User>> {
    try {
      const user = await this.service.update(input);
      return res.status(200).json({
        data: user,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }

  @Patch('password')
  async updatePassword(
    @Body() input: UpdateUserPasswordContract,
    @Res() res: Response,
  ): Promise<Response<UserContract>> {
    try {
      const user = await this.service.updatePassword(input);
      return res.status(200).json({
        data: user,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }

  @Delete(':id')
  async delete(
    @Param('id') input: string,
    @Res() res: Response,
  ): Promise<Response<UserContract>> {
    try {
      const data = await this.service.delete(input);
      return res.status(200).json({
        data,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }

  @Patch('toInstructor/:id')
  async toInstructor(
    @Param('id') input: string,
    @Res() res: Response,
  ): Promise<Response<UserContract>> {
    try {
      const data = await this.service.toInstructor(input);
      return res.status(200).json({
        data,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }

  @Patch('toUser/:id')
  async toUser(
    @Param('id') input: string,
    @Res() res: Response,
  ): Promise<Response<UserContract>> {
    try {
      const data = await this.service.toUser(input);
      return res.status(200).json({
        data,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }

  @Patch('toAdmin/:id')
  async toAdmin(
    @Param('id') input: string,
    @Res() res: Response,
  ): Promise<Response<UserContract>> {
    try {
      const data = await this.service.toAdmin(input);
      return res.status(200).json({
        data,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }
}
