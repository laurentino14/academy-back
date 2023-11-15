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
  CreateMachineInputContract,
  UpdateMachineInputContract,
} from 'src/data/contracts/domain/machine';
import { MachineUseCases } from 'src/domain/use-cases/machine';
import { HttpResponse } from '../contracts/http-reponse';
import { AuthGuard } from '../guards/auth';
import { Machine } from './../../domain/entities/machine';

@Controller('machine')
@UseGuards(AuthGuard)
export class MachineController {
  constructor(private readonly service: MachineUseCases) {}

  @Get(':id')
  async get(@Param('id') input: string): Promise<HttpResponse<Machine>> {
    try {
      const machine = await this.service.get(input);
      return {
        statusCode: 200,
        data: machine,
      };
    } catch (err) {
      return {
        statusCode: 500,
        data: err.message,
      };
    }
  }

  @Get()
  async getAll(): Promise<HttpResponse<Machine[]>> {
    try {
      const machines = await this.service.getAll();
      return {
        statusCode: 200,
        data: machines,
      };
    } catch (err) {
      return {
        statusCode: 500,
        data: err.message,
      };
    }
  }
  @Post()
  async create(
    @Body() input: CreateMachineInputContract,
  ): Promise<HttpResponse<Machine>> {
    try {
      const machine = await this.service.create(input);
      return {
        statusCode: 201,
        data: machine,
      };
    } catch (err) {
      return {
        statusCode: 500,
        data: err.message,
      };
    }
  }
  @Patch()
  async update(
    @Body() input: UpdateMachineInputContract,
  ): Promise<HttpResponse<Machine>> {
    try {
      const machine = await this.service.update(input);
      return {
        statusCode: 200,
        data: machine,
      };
    } catch (err) {
      return {
        statusCode: 500,
        data: err.message,
      };
    }
  }
  @Delete(':id')
  async delete(@Param('id') input: string): Promise<HttpResponse<Machine>> {
    try {
      const machine = await this.service.delete(input);
      return {
        statusCode: 200,
        data: machine,
      };
    } catch (err) {
      return {
        statusCode: 500,
        data: err.message,
      };
    }
  }
}
