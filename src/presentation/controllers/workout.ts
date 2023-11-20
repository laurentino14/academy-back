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
  CreateWorkoutInputContract,
  UpdateWorkoutInputContract,
  WorkoutContract,
} from 'src/data/contracts/domain/workout';
import { Workout } from 'src/domain/entities/workout';
import { WorkoutUseCases } from 'src/domain/use-cases/workout';
import { AuthGuard } from '../guards/auth';

@Controller('workout')
export class WorkoutController {
  constructor(private readonly service: WorkoutUseCases) {}
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() input: CreateWorkoutInputContract,
    @Res() res: Response,
  ): Promise<Response<WorkoutContract>> {
    try {
      const handle = await this.service.create(input);
      return res.status(201).json({
        data: handle,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  async getById(
    @Param('id') input: string,
    @Res() res: Response,
  ): Promise<Response<WorkoutContract>> {
    try {
      const handle = await this.service.getById(input);
      return res.status(200).json({
        data: handle,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }
  @UseGuards(AuthGuard)
  @Get('user/:id')
  async getByUserId(
    @Param('id') input: string,
    @Res() res: Response,
  ): Promise<Response<Workout[]>> {
    try {
      const handle = await this.service.getByUserId(input);
      return res.status(200).json({
        data: handle,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }
  @UseGuards(AuthGuard)
  @Get('instructor/:id')
  async getByInstructorId(
    @Param('id') input: string,
    @Res() res: Response,
  ): Promise<Response<Workout[]>> {
    try {
      const handle = await this.service.getByInstructorId(input);
      return res.status(200).json({
        data: handle,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(
    @Param('id') input: string,
    @Res() res: Response,
  ): Promise<Response<WorkoutContract>> {
    try {
      const handle = await this.service.delete(input);
      return res.status(200).json({
        data: handle,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }
  @UseGuards(AuthGuard)
  @Patch()
  async update(
    @Body() input: UpdateWorkoutInputContract,
    @Res() res: Response,
  ): Promise<Response<WorkoutContract>> {
    try {
      const handle = await this.service.update(input);
      return res.status(200).json({
        data: handle,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Post('active')
  async turnActive(
    @Body() input: { userId: string; workoutId: string },
    @Res() res: Response,
  ): Promise<Response<boolean>> {
    try {
      const handle = await this.service.turnActive(input);
      return res.status(200).json({
        data: handle,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }
}
