import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  CreateHistoryInputContract,
  GetAllByDayInputContract,
  HistoryContract,
} from 'src/data/contracts/domain/history';
import {
  CreateHistoryInput,
  HistoryUseCases,
} from 'src/domain/use-cases/history';
import { HttpResponse } from '../contracts/http-reponse';
import { AuthGuard } from '../guards/auth';

@Controller('history')
@UseGuards(AuthGuard)
export class HistoryController {
  constructor(private readonly service: HistoryUseCases) {}
  @Post()
  async create(
    @Body() input: CreateHistoryInputContract,
  ): Promise<HttpResponse<HistoryContract>> {
    try {
      const data = await this.service.create(input);

      return {
        statusCode: 200,
        data,
      };
    } catch (err) {
      return {
        statusCode: 500,
        data: err.message,
      };
    }
  }

  @Get(':id')
  async getById(
    @Param('id') input: string,
  ): Promise<HttpResponse<HistoryContract>> {
    try {
      const data = await this.service.getById(input);

      return {
        statusCode: 200,
        data,
      };
    } catch (err) {
      return {
        statusCode: 500,
        data: err.message,
      };
    }
  }

  @Get('user/:id')
  async getAllByUserID(
    @Param() input: string,
  ): Promise<HttpResponse<HistoryContract[]>> {
    try {
      const data = await this.service.getAllByUserID(input);

      return {
        statusCode: 200,
        data,
      };
    } catch (err) {
      return {
        statusCode: 500,
        data: err.message,
      };
    }
  }

  @Get('user/:id/:date')
  async getAllByUserIDAndDate(
    @Param('id') inputId: string,
    @Param('date') inputDate: string,
  ): Promise<HttpResponse<HistoryContract[]>> {
    try {
      const input: GetAllByDayInputContract = {
        date: inputDate,
        userId: inputId,
      };

      const data = await this.service.getAllByUserIDAndDate(input);

      return {
        statusCode: 200,
        data,
      };
    } catch (err) {
      return {
        statusCode: 500,
        data: err.message,
      };
    }
  }

  @Delete(':id')
  async delete(@Param() input: string): Promise<HttpResponse<HistoryContract>> {
    try {
      const data = await this.service.delete(input);

      return {
        statusCode: 200,
        data,
      };
    } catch (err) {
      return {
        statusCode: 500,
        data: err.message,
      };
    }
  }
}
