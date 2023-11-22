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
  CreateWorkoutInputContract,
  UpdateWorkoutInputContract,
  WorkoutContract,
} from 'src/data/contracts/domain/workout';
import { WorkoutUseCases } from 'src/domain/use-cases/workout';
import { BadRequest } from '../contracts/bad-request';
import { BooleanResponse } from '../contracts/boolean';
import { NonAuthorized } from '../contracts/non-authorized';
import { AuthGuard } from '../guards/auth';

@Controller('workout')
@ApiTags('Workout')
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
export class WorkoutController {
  constructor(private readonly service: WorkoutUseCases) {}
  @Post()
  @ApiOperation({
    summary: 'Create new workout to user',
  })
  @ApiResponse({
    status: 201,
    description: 'On success case',
    type: WorkoutContract,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  async create(
    @Body() input: CreateWorkoutInputContract,
    @Res() res: Response,
  ): Promise<Response<WorkoutContract>> {
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
  @ApiOperation({ summary: 'Turn workout state to active' })
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
  @Post('active')
  async turnActive(
    @Body() input: { userId: string; workoutId: string },
    @Res() res: Response,
  ): Promise<Response<boolean>> {
    try {
      const handle = await this.service.turnActive(input);
      return res.status(200).json({
        data: handle,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }
  @ApiOperation({ summary: 'Get workout by ID' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: WorkoutContract,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  @Get(':id')
  async getById(
    @Param('id') input: string,
    @Res() res: Response,
  ): Promise<Response<WorkoutContract>> {
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
  @ApiOperation({ summary: 'Get all of workouts by user ID' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: [WorkoutContract],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  @Get('user/:id')
  async getByUserId(
    @Param('id') input: string,
    @Res() res: Response,
  ): Promise<Response<WorkoutContract[]>> {
    try {
      const handle = await this.service.getByUserId(input);
      return res.status(200).json({
        data: handle,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }
  @ApiOperation({ summary: 'Get all of workouts by instructor ID' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: [WorkoutContract],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  @Get('instructor/:id')
  async getByInstructorId(
    @Param('id') input: string,
    @Res() res: Response,
  ): Promise<Response<WorkoutContract[]>> {
    try {
      const handle = await this.service.getByInstructorId(input);
      return res.status(200).json({
        data: handle,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }
  @ApiOperation({ summary: 'Update workout' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: WorkoutContract,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  @Patch()
  async update(
    @Body() input: UpdateWorkoutInputContract,
    @Res() res: Response,
  ): Promise<Response<WorkoutContract>> {
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
  @ApiOperation({ summary: 'Delete workout by ID' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: WorkoutContract,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  @Delete(':id')
  async delete(
    @Param('id') input: string,
    @Res() res: Response,
  ): Promise<Response<WorkoutContract>> {
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
