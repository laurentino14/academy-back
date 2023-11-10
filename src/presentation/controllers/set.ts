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
@UseGuards(AuthGuard)
export class SetController {
  constructor(private readonly service: SetUseCases) {}

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

  @Get('user/:id')
  async getAllByUserID(
    @Param('id') input: string,
  ): Promise<HttpResponse<SetContract[]>> {
    try {
      const handle = await this.service.getAllByUserID(input);
      return {
        statusCode: 200,
        data: handle,
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        data: err,
      };
    }
  }

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
