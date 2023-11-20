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
  CreateExerciseInputContract,
  ExerciseContract,
} from 'src/data/contracts/domain/exercise';
import {
  ExerciseUseCases,
  UpdateExerciseInput,
} from 'src/domain/use-cases/exercise';
import { AuthGuard } from '../guards/auth';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly service: ExerciseUseCases) {}
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() input: CreateExerciseInputContract,
    @Res() res: Response,
  ): Promise<Response<ExerciseContract>> {
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
  ): Promise<Response<ExerciseContract>> {
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
  @Delete(':id')
  async delete(
    @Param('id') input: string,
    @Res() res: Response,
  ): Promise<Response<ExerciseContract>> {
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
    @Body() input: UpdateExerciseInput,
    @Res() res: Response,
  ): Promise<Response<ExerciseContract>> {
    try {
      const handle = await this.service.update({ ...input, id: input.id[0] });
      return res.status(200).json({
        data: handle,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }

  @Get()
  async getAll(@Res() res: Response): Promise<Response<ExerciseContract[]>> {
    try {
      const handle = await this.service.getAll();
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
