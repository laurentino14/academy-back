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
import { SetContract } from 'src/data/contracts/domain/set';
import {
  CreateSetInput,
  SetUseCases,
  UpdateSetInput,
} from 'src/domain/use-cases/set';
import { HttpResponse } from '../contracts/http-reponse';
import { AuthGuard } from '../guards/auth';

@Controller('set')
export class SetController {
  constructor(private readonly service: SetUseCases) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() input: CreateSetInput,
  ): Promise<HttpResponse<SetContract>> {
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
  ): Promise<HttpResponse<SetContract>> {
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
  @Patch()
  async update(
    @Body() input: UpdateSetInput,
  ): Promise<HttpResponse<SetContract>> {
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
  @Delete(':id')
  async delete(@Param('id') input: string): Promise<HttpResponse<SetContract>> {
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
}
