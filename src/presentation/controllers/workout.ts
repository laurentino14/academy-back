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
  CreateWorkoutInputContract,
  UpdateWorkoutInputContract,
  WorkoutContract,
} from 'src/data/contracts/domain/workout';
import { Workout } from 'src/domain/entities/workout';
import { WorkoutUseCases } from 'src/domain/use-cases/workout';
import { HttpResponse } from '../contracts/http-reponse';
import { AuthGuard } from '../guards/auth';

@Controller('workout')
export class WorkoutController {
  constructor(private readonly service: WorkoutUseCases) {}
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() input: CreateWorkoutInputContract,
  ): Promise<HttpResponse<WorkoutContract>> {
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
  ): Promise<HttpResponse<WorkoutContract>> {
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
  @Get('user/:id')
  async getByUserId(
    @Param('id') input: string,
  ): Promise<HttpResponse<Workout[]>> {
    try {
      const handle = await this.service.getByUserId(input);
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
  @Get('instructor/:id')
  async getByInstructorId(
    @Param('id') input: string,
  ): Promise<HttpResponse<Workout[]>> {
    try {
      const handle = await this.service.getByInstructorId(input);
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
  ): Promise<HttpResponse<WorkoutContract>> {
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
    @Body() input: UpdateWorkoutInputContract,
  ): Promise<HttpResponse<WorkoutContract>> {
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

  @UseGuards(AuthGuard)
  @Post('active')
  async turnActive(
    @Body() input: { userId: string; workoutId: string },
  ): Promise<HttpResponse<boolean>> {
    try {
      const handle = await this.service.turnActive(input);
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
