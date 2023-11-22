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
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import {
  CreateMachineInputContract,
  MachineContract,
  UpdateMachineInputContract,
} from 'src/data/contracts/domain/machine';
import { MachineUseCases } from 'src/domain/use-cases/machine';
import { BadRequest } from '../contracts/bad-request';
import { NonAuthorized } from '../contracts/non-authorized';
import { AuthGuard } from '../guards/auth';

@Controller('machine')
@ApiTags('Machine')
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
export class MachineController {
  constructor(private readonly service: MachineUseCases) {}

  @Post()
  @ApiOperation({ summary: 'Create a new machine' })
  @ApiResponse({
    status: 201,
    description: 'On success case',
    type: MachineContract,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  async create(
    @Body() input: CreateMachineInputContract,
    @Res() res: Response,
  ): Promise<Response<MachineContract>> {
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

  @Get(':id')
  @ApiOperation({ summary: 'Get a machine by ID' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: MachineContract,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  async get(
    @Param('id') input: string,
    @Res() res: Response,
  ): Promise<Response<MachineContract>> {
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
  @ApiOperation({ summary: 'Get all machines' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: MachineContract,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  async getAll(@Res() res: Response): Promise<Response<MachineContract[]>> {
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

  @Patch()
  @ApiOperation({ summary: 'Update a machine' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: MachineContract,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  async update(
    @Body() input: UpdateMachineInputContract,
    @Res() res: Response,
  ): Promise<Response<MachineContract>> {
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
  @ApiOperation({ summary: 'Delete a machine by ID' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: MachineContract,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  async delete(
    @Param('id') input: string,
    @Res() res: Response,
  ): Promise<Response<MachineContract>> {
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
