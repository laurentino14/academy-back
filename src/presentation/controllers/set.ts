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
  CreateSetInputContract,
  SetContract,
  UpdateSetInputContract,
} from 'src/data/contracts/domain/set';
import { SetUseCases } from 'src/domain/use-cases/set';
import { BadRequest } from '../contracts/bad-request';
import { NonAuthorized } from '../contracts/non-authorized';
import { AuthGuard } from '../guards/auth';

@Controller('set')
@ApiTags('Set')
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
export class SetController {
  constructor(private readonly service: SetUseCases) {}

  @Post()
  @ApiOperation({ summary: 'Create a new set' })
  @ApiResponse({
    status: 201,
    description: 'On success case',
    type: SetContract,
  })
  @ApiResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  async create(
    @Body() input: CreateSetInputContract,
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
  @ApiOperation({ summary: 'Get a set by ID' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: SetContract,
  })
  @ApiResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  @ApiParam({ name: 'id', type: String, example: new ObjectId() })
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
  @ApiOperation({ summary: 'Get all set by user ID' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: [SetContract],
  })
  @ApiResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  @ApiParam({ name: 'id', type: String, example: new ObjectId() })
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
  @ApiOperation({ summary: 'Update a set by ID' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: SetContract,
  })
  @ApiResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  async update(
    @Body() input: UpdateSetInputContract,
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
  @ApiOperation({ summary: 'Delete set by ID' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: SetContract,
  })
  @ApiResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  @ApiParam({ name: 'id', type: String, example: new ObjectId() })
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
