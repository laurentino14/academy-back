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
import { SetContract } from 'src/data/contracts/domain/set';
import {
  CreateSetInput,
  SetUseCases,
  UpdateSetInput,
} from 'src/domain/use-cases/set';
import { AuthGuard } from '../guards/auth';

@Controller('set')
@UseGuards(AuthGuard)
export class SetController {
  constructor(private readonly service: SetUseCases) {}

  @Post()
  async create(
    @Body() input: CreateSetInput,
    @Res() res: Response,
  ): Promise<Response<SetContract>> {
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
  @Get(':id')
  async getById(
    @Param('id') input: string,
    @Res() res: Response,
  ): Promise<Response<SetContract>> {
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

  @Get('user/:id')
  async getAllByUserID(
    @Param('id') input: string,
    @Res() res: Response,
  ): Promise<Response<SetContract[]>> {
    try {
      const handle = await this.service.getAllByUserID(input);
      return res.status(200).json({
        data: handle,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }

  @Patch()
  async update(
    @Body() input: UpdateSetInput,
    @Res() res: Response,
  ): Promise<Response<SetContract>> {
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
  @Delete(':id')
  async delete(
    @Param('id') input: string,
    @Res() res: Response,
  ): Promise<Response<SetContract>> {
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
}
