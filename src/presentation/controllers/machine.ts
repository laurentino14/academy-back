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
  CreateMachineInputContract,
  UpdateMachineInputContract,
} from 'src/data/contracts/domain/machine';
import { MachineUseCases } from 'src/domain/use-cases/machine';
import { AuthGuard } from '../guards/auth';
import { Machine } from './../../domain/entities/machine';

@Controller('machine')
@UseGuards(AuthGuard)
export class MachineController {
  constructor(private readonly service: MachineUseCases) {}

  @Get(':id')
  async get(
    @Param('id') input: string,
    @Res() res: Response,
  ): Promise<Response<Machine>> {
    try {
      const machine = await this.service.get(input);
      return res.status(200).json({
        data: machine,
      });
    } catch (err) {
      return res.status(400).json({
        data: err.message,
      });
    }
  }

  @Get()
  async getAll(@Res() res: Response): Promise<Response<Machine[]>> {
    try {
      const machines = await this.service.getAll();
      return res.status(200).json({
        data: machines,
      });
    } catch (err) {
      return res.status(400).json({
        data: err.message,
      });
    }
  }
  @Post()
  async create(
    @Body() input: CreateMachineInputContract,
    @Res() res: Response,
  ): Promise<Response<Machine>> {
    try {
      const machine = await this.service.create(input);
      return res.status(201).json({
        data: machine,
      });
    } catch (err) {
      return res.status(400).json({
        data: err.message,
      });
    }
  }
  @Patch()
  async update(
    @Body() input: UpdateMachineInputContract,
    @Res() res: Response,
  ): Promise<Response<Machine>> {
    try {
      const machine = await this.service.update(input);
      return res.status(200).json({
        data: machine,
      });
    } catch (err) {
      return res.status(400).json({
        data: err.message,
      });
    }
  }
  @Delete(':id')
  async delete(
    @Param('id') input: string,
    @Res() res: Response,
  ): Promise<Response<Machine>> {
    try {
      const machine = await this.service.delete(input);
      return res.status(200).json({
        data: machine,
      });
    } catch (err) {
      return res.status(400).json({
        data: err.message,
      });
    }
  }
}
