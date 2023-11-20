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
  CreateHistoryInputContract,
  GetAllByDayInputContract,
  HistoryContract,
} from 'src/data/contracts/domain/history';
import { HistoryUseCases } from 'src/domain/use-cases/history';
import { AuthGuard } from '../guards/auth';

@Controller('history')
@UseGuards(AuthGuard)
export class HistoryController {
  constructor(private readonly service: HistoryUseCases) {}
  @Post()
  async create(
    @Body() input: CreateHistoryInputContract,
    @Res() res: Response,
  ): Promise<Response<HistoryContract>> {
    try {
      const data = await this.service.create(input);

      return res.status(200).json({
        data,
      });
    } catch (err) {
      return res.status(400).json({
        data: err.message,
      });
    }
  }

  @Get(':id')
  async getById(
    @Param('id') input: string,
    @Res() res: Response,
  ): Promise<Response<HistoryContract>> {
    try {
      const data = await this.service.getById(input);

      return res.status(200).json({
        data,
      });
    } catch (err) {
      return res.status(400).json({
        data: err.message,
      });
    }
  }

  @Get('user/:id')
  async getAllByUserID(
    @Param() input: string,
    @Res() res: Response,
  ): Promise<Response<HistoryContract[]>> {
    try {
      const data = await this.service.getAllByUserID(input);

      return res.status(200).json({
        data,
      });
    } catch (err) {
      return res.status(400).json({
        data: err.message,
      });
    }
  }

  @Get('user/:id/:date')
  async getAllByUserIDAndDate(
    @Param('id') inputId: string,
    @Param('date') inputDate: string,
    @Res() res: Response,
  ): Promise<Response<HistoryContract[]>> {
    try {
      const input: GetAllByDayInputContract = {
        date: inputDate,
        userId: inputId,
      };

      const data = await this.service.getAllByUserIDAndDate(input);

      return res.status(200).json({
        data,
      });
    } catch (err) {
      return res.status(400).json({
        data: err.message,
      });
    }
  }

  @Patch()
  async changeStars(
    @Body() input: { id: string; stars: number },
    @Res() res: Response,
  ): Promise<boolean> {
    try {
      const data = await this.service.changeStars(input);

      return data;
    } catch (err) {
      return err.message;
    }
  }

  @Delete(':id')
  async delete(
    @Param('id') input: string,
    @Res() res: Response,
  ): Promise<Response<HistoryContract>> {
    try {
      const data = await this.service.delete(input);

      return res.status(200).json({
        data,
      });
    } catch (err) {
      return res.status(400).json({
        data: err.message,
      });
    }
  }
}
