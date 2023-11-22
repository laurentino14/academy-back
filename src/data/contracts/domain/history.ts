import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'bson';
import { IsNotEmpty } from 'class-validator';
import { History } from 'src/domain/entities/history';
import { CreateHistoryInput } from 'src/domain/use-cases/history';

export abstract class HistoryContract extends History {}

export abstract class CreateHistoryInputContract implements CreateHistoryInput {
  @ApiProperty({ example: new ObjectId(), required: true })
  @IsNotEmpty()
  setId: string;

  @ApiProperty({ example: new ObjectId(), required: true })
  @IsNotEmpty()
  userId: string;
}

export abstract class GetAllByDayInputContract {
  @ApiProperty({ example: new ObjectId(), required: true })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: '2021-05-05', required: true })
  @IsNotEmpty()
  date: string;
}
