import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SetRepository } from 'src/data/contracts/repositories/set';
import { SetService } from 'src/data/services/set';
import { SetUseCases } from 'src/domain/use-cases/set';
import { PrismaDB } from 'src/infra/data-sources/prisma';
import { PrismaSetRepository } from 'src/infra/repositories/prisma/set';
import { SetController } from 'src/presentation/controllers/set';

@Module({
  imports: [JwtModule.register({})],
  controllers: [SetController],
  providers: [
    PrismaDB,
    { provide: SetUseCases, useClass: SetService },
    { provide: SetRepository, useClass: PrismaSetRepository },
  ],
})
export class SetModule {}
