import { History } from '../entities/history';

export abstract class HistoryUseCases {
  abstract create(input: CreateHistoryInput): Promise<History>;
  abstract getById(input: string): Promise<History>;
  abstract getAllByUserID(input: string): Promise<History[]>;
  abstract getAllByUserIDAndDate(input: GetAllByDayInput): Promise<History[]>;
  abstract delete(input: string): Promise<History>;
}

export abstract class CreateHistoryInput {
  abstract setId: string;
  abstract userId: string;
}

export abstract class GetAllByDayInput {
  abstract userId: string;
  abstract date: string;
}
