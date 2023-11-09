import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ExerciseRepository } from 'src/data/contracts/repositories/exercise';
import { ExerciseService } from 'src/data/services/exercise';
import { ExerciseUseCases } from 'src/domain/use-cases/exercise';
import { PrismaDB } from 'src/infra/data-sources/prisma';
import { PrismaExerciseRepository } from 'src/infra/repositories/prisma/exercise';
import { ExerciseController } from 'src/presentation/controllers/exercise';

@Module({
  imports: [JwtModule.register({})],
  controllers: [ExerciseController],
  providers: [
    PrismaDB,
    { provide: ExerciseUseCases, useClass: ExerciseService },
    { provide: ExerciseRepository, useClass: PrismaExerciseRepository },
  ],
})
export class ExerciseModule {}
