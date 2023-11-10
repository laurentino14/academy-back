import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HistoryRepository } from 'src/data/contracts/repositories/history';
import { HistoryService } from 'src/data/services/history';
import { HistoryUseCases } from 'src/domain/use-cases/history';
import { PrismaDB } from 'src/infra/data-sources/prisma';
import { PrismaHistoryRepository } from 'src/infra/repositories/prisma/history';
import { HistoryController } from 'src/presentation/controllers/history';

@Module({
  imports: [JwtModule.register({})],
  controllers: [HistoryController],
  providers: [
    PrismaDB,
    { provide: HistoryRepository, useClass: PrismaHistoryRepository },
    { provide: HistoryUseCases, useClass: HistoryService },
  ],
})
export class HistoryModule {}
