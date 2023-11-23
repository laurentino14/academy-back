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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiHeaders,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ObjectId } from 'bson';
import { Response } from 'express';
import {
  CreateHistoryInputContract,
  GetAllByDayInputContract,
  HistoryContract,
} from 'src/data/contracts/domain/history';
import { HistoryUseCases } from 'src/domain/use-cases/history';
import { BadRequest } from '../contracts/bad-request';
import { BooleanResponse } from '../contracts/boolean';
import { NonAuthorized } from '../contracts/non-authorized';
import { AuthGuard } from '../guards/auth';

@Controller('history')
@ApiTags('History')
@ApiBearerAuth()
@ApiHeaders([
  {
    name: 'Content-Type',
    enum: ['application/json'],
    required: true,
  },
])
@ApiUnauthorizedResponse({
  status: 401,
  description: 'When your token is invalid',
  type: NonAuthorized,
})
@UseGuards(AuthGuard)
export class HistoryController {
  constructor(private readonly service: HistoryUseCases) {}
  @Post()
  @ApiOperation({ summary: 'Create new history' })
  @ApiResponse({
    status: 201,
    description: 'On success case',
    type: HistoryContract,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  async create(
    @Body() input: CreateHistoryInputContract,
    @Res() res: Response,
  ): Promise<Response<HistoryContract>> {
    try {
      const data = await this.service.create(input);

      return res.status(201).json({
        data,
      });
    } catch (err) {
      return res.status(400).json({
        data: err.message,
      });
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a history by ID' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: HistoryContract,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
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
  @ApiOperation({ summary: 'Get all history by user ID' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: [HistoryContract],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
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
  @ApiOperation({
    summary: 'Get all history by user ID and Date',
  })
  @ApiParam({ name: 'id', type: String, example: new ObjectId() })
  @ApiParam({ name: 'date', type: String, example: '2023-01-01' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: [HistoryContract],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
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
  @ApiOperation({ summary: 'Update how many stars has in a specific history' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: BooleanResponse,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  async changeStars(
    @Body() input: { id: string; stars: number },
    @Res() res: Response,
  ): Promise<Response<boolean>> {
    try {
      const data = await this.service.changeStars(input);
      return res.status(200).send(data);
    } catch (err) {
      return res.status(400).json({
        data: err.message,
      });
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete history by ID' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: HistoryContract,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
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
