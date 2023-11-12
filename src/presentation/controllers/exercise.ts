import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  CreateExerciseInputContract,
  ExerciseContract,
} from 'src/data/contracts/domain/exercise';
import {
  ExerciseUseCases,
  UpdateExerciseInput,
} from 'src/domain/use-cases/exercise';
import { HttpResponse } from '../contracts/http-reponse';
import { AuthGuard } from '../guards/auth';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly service: ExerciseUseCases) {}
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() input: CreateExerciseInputContract,
  ): Promise<HttpResponse<ExerciseContract>> {
    try {
      const handle = await this.service.create(input);
      return {
        statusCode: 201,
        data: handle,
      };
    } catch (err) {
      return {
        statusCode: 500,
        data: err,
      };
    }
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  async getById(
    @Param('id') input: string,
  ): Promise<HttpResponse<ExerciseContract>> {
    try {
      const handle = await this.service.getById(input);
      return {
        statusCode: 200,
        data: handle,
      };
    } catch (err) {
      return {
        statusCode: 500,
        data: err,
      };
    }
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(
    @Param('id') input: string,
  ): Promise<HttpResponse<ExerciseContract>> {
    try {
      const handle = await this.service.delete(input);
      return {
        statusCode: 200,
        data: handle,
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
    @Body() input: UpdateExerciseInput,
  ): Promise<HttpResponse<ExerciseContract>> {
    try {
      const handle = await this.service.update(input);
      return {
        statusCode: 200,
        data: handle,
      };
    } catch (err) {
      return {
        statusCode: 500,
        data: err,
      };
    }
  }

  @Get()
  async getAll(): Promise<HttpResponse<ExerciseContract[]>> {
    try {
      const handle = await this.service.getAll();
      return {
        statusCode: 200,
        data: handle,
      };
    } catch (err) {
      return {
        statusCode: 500,
        data: err,
      };
    }
  }
}
