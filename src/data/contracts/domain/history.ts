import { IsNotEmpty } from 'class-validator';
import { History } from 'src/domain/entities/history';
import { CreateHistoryInput } from 'src/domain/use-cases/history';

export abstract class HistoryContract extends History {}

export abstract class CreateHistoryInputContract implements CreateHistoryInput {
  @IsNotEmpty()
  setId: string;
  @IsNotEmpty()
  userId: string;
}

export abstract class GetAllByDayInputContract {
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  date: string;
}
