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
  CreateUserInputContract,
  UpdateUserInputContract,
  UpdateUserPasswordContract,
  UserContract,
} from 'src/data/contracts/domain/user';
import { UserUseCases } from 'src/domain/use-cases/user';
import { BadRequest } from '../contracts/bad-request';
import { NonAuthorized } from '../contracts/non-authorized';
import { AuthGuard } from '../guards/auth';

@Controller('user')
@ApiTags('User')
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
export class UserController {
  constructor(private readonly service: UserUseCases) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'On success case',
    type: UserContract,
  })
  @ApiResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  @Post()
  async create(
    @Body() input: CreateUserInputContract,
    @Res() res: Response,
  ): Promise<Response<UserContract>> {
    try {
      const user = await this.service.create(input);
      return res.status(201).json({
        data: user,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }

  @ApiOperation({ summary: 'Get an user by ID' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: UserContract,
  })
  @ApiResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  @ApiParam({ name: 'id', type: String, example: new ObjectId() })
  @Get(':id')
  async getById(
    @Param('id') input: string,
    @Res() res: Response,
  ): Promise<Response<UserContract>> {
    try {
      const user = await this.service.getById(input);
      return res.status(200).json({
        data: user,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }

  @ApiOperation({ summary: 'Get an user by E-mail address' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: UserContract,
  })
  @ApiResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  @ApiParam({ name: 'email', type: String, example: 'vinicius@leprevost.com' })
  @Get('email/:email')
  async getByEmail(
    @Param('email') input: string,
    @Res() res: Response,
  ): Promise<Response<UserContract>> {
    try {
      const user = await this.service.getByEmail(input);
      return res.status(200).json({
        data: user,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: [UserContract],
  })
  @ApiResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  @Get()
  async getAll(@Res() res: Response): Promise<Response<UserContract[]>> {
    try {
      const data = await this.service.getAll();

      return res.status(200).json({
        data,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }

  @ApiOperation({ summary: 'Update an user by ID' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: UserContract,
  })
  @ApiResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  @Patch()
  async update(
    @Body() input: UpdateUserInputContract,
    @Res() res: Response,
  ): Promise<Response<UserContract>> {
    try {
      const user = await this.service.update(input);
      return res.status(200).json({
        data: user,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }

  @ApiOperation({ summary: 'Update an user password by ID' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: UserContract,
  })
  @ApiResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  @Patch('password')
  async updatePassword(
    @Body() input: UpdateUserPasswordContract,
    @Res() res: Response,
  ): Promise<Response<UserContract>> {
    try {
      const user = await this.service.updatePassword(input);
      return res.status(200).json({
        data: user,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }

  @ApiOperation({ summary: 'Change an user to instructor by HASH' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: UserContract,
  })
  @ApiResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  @ApiParam({ name: 'id', type: String, example: new ObjectId() })
  @Patch('toInstructor/:id')
  async toInstructor(
    @Param('id') input: string,
    @Res() res: Response,
  ): Promise<Response<UserContract>> {
    try {
      const data = await this.service.toInstructor(input);
      return res.status(200).json({
        data,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }

  @ApiOperation({ summary: 'Change an instructor or admin to user by HASH' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: UserContract,
  })
  @ApiResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  @ApiParam({ name: 'id', type: String, example: new ObjectId() })
  @Patch('toUser/:id')
  async toUser(
    @Param('id') input: string,
    @Res() res: Response,
  ): Promise<Response<UserContract>> {
    try {
      const data = await this.service.toUser(input);
      return res.status(200).json({
        data,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }

  @ApiOperation({ summary: 'Change an user or instructor to admin by HASH' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: UserContract,
  })
  @ApiResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  @ApiParam({ name: 'id', type: String, example: new ObjectId() })
  @Patch('toAdmin/:id')
  async toAdmin(
    @Param('id') input: string,
    @Res() res: Response,
  ): Promise<Response<UserContract>> {
    try {
      const data = await this.service.toAdmin(input);
      return res.status(200).json({
        data,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }

  @ApiOperation({ summary: 'Delete an user by ID' })
  @ApiResponse({
    status: 200,
    description: 'On success case',
    type: UserContract,
  })
  @ApiResponse({
    status: 400,
    description: 'On failure case',
    type: BadRequest,
  })
  @ApiParam({ name: 'id', type: String, example: new ObjectId() })
  @Delete(':id')
  async delete(
    @Param('id') input: string,
    @Res() res: Response,
  ): Promise<Response<UserContract>> {
    try {
      const data = await this.service.delete(input);
      return res.status(200).json({
        data,
      });
    } catch (err) {
      return res.status(400).json({
        data: err,
      });
    }
  }
}
