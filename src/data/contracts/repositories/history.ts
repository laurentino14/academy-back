import { IsNotEmpty } from 'class-validator';
import { HistoryContract } from '../domain/history';

export abstract class HistoryRepository {
  abstract create(input: CreateHistoryInputRepo): Promise<HistoryContract>;
  abstract getById(input: string): Promise<HistoryContract>;
  abstract getAllByUserID(input: string): Promise<HistoryContract[]>;
  abstract getAllByUserIDAndDate(
    input: GetAllByDayInputRepo,
  ): Promise<HistoryContract[]>;
  abstract delete(input: string): Promise<HistoryContract>;
  abstract changeStars(input: { id: string; stars: number }): Promise<boolean>;
}

export abstract class CreateHistoryInputRepo {
  @IsNotEmpty()
  abstract id: string;
  @IsNotEmpty()
  abstract setId: string;
  @IsNotEmpty()
  abstract userId: string;
}

export abstract class GetAllByDayInputRepo {
  @IsNotEmpty()
  abstract userId: string;
  @IsNotEmpty()
  abstract date: string;
}
