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
  CreateExerciseInputContract,
  ExerciseContract,
  UpdateExerciseInputContract,
} from 'src/data/contracts/domain/exercise';
import { ExerciseUseCases } from 'src/domain/use-cases/exercise';
import { BadRequest } from '../contracts/bad-request';
import { NonAuthorized } from '../contracts/non-authorized';
import { AuthGuard } from '../guards/auth';

@Controller('exercise')
@ApiTags('Exercise')
@ApiBearerAuth()
@ApiHeaders([
  {
    name: 'Content-Type',
    enum: ['application/json'],
    required: true,
  },
])
@UseGuards(AuthGuard)
@ApiUnauthorizedResponse({
  status: 401,
  description: 'When your token is invalid',
  type: NonAuthorized,
})
export class ExerciseController {
  constructor(private readonly service: ExerciseUseCases) {}
  @Post()
  @ApiOperation({ summary: 'Create a new exercise' })
  @ApiResponse({
    status: 201,
    description: 'On success case',
    type: ExerciseContract,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  async create(
    @Body() input: CreateExerciseInputContract,
    @Res() res: Response,
  ): Promise<Response<ExerciseContract>> {
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
  @ApiOperation({ summary: 'Get a exercise by ID' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: ExerciseContract,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  async getById(
    @Param('id') input: string,
    @Res() res: Response,
  ): Promise<Response<ExerciseContract>> {
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

  @Get()
  @ApiOperation({ summary: 'Get all exercises' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: [ExerciseContract],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  async getAll(@Res() res: Response): Promise<Response<ExerciseContract[]>> {
    try {
      const handle = await this.service.getAll();
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
  @ApiOperation({ summary: 'Update a exercise' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: ExerciseContract,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  async update(
    @Body() input: UpdateExerciseInputContract,
    @Res() res: Response,
  ): Promise<Response<ExerciseContract>> {
    try {
      const handle = await this.service.update({ ...input, id: input.id[0] });
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
  @ApiOperation({ summary: 'Delete exercise by ID' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: ExerciseContract,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  async delete(
    @Param('id') input: string,
    @Res() res: Response,
  ): Promise<Response<ExerciseContract>> {
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
