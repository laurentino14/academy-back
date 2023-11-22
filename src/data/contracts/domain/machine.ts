import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'bson';
import { IsNotEmpty } from 'class-validator';
import { Machine } from 'src/domain/entities/machine';
import {
  CreateMachineInput,
  UpdateMachineInput,
} from 'src/domain/use-cases/machine';

export abstract class MachineContract extends Machine {}

export abstract class CreateMachineInputContract implements CreateMachineInput {
  @ApiProperty({ example: 'BW-01', required: true })
  @IsNotEmpty()
  name: string;
}

export abstract class UpdateMachineInputContract implements UpdateMachineInput {
  @ApiProperty({ example: new ObjectId(), required: true })
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'BW-02', required: true })
  @IsNotEmpty()
  name: string;
}
