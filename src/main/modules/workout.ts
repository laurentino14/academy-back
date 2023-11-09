import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { WorkoutRepository } from 'src/data/contracts/repositories/workout';
import { WorkoutService } from 'src/data/services/workout';
import { WorkoutUseCases } from 'src/domain/use-cases/workout';
import { PrismaDB } from 'src/infra/data-sources/prisma';
import { PrismaWorkoutRepository } from 'src/infra/repositories/prisma/workout';
import { WorkoutController } from 'src/presentation/controllers/workout';

@Module({
  imports: [JwtModule.register({})],
  controllers: [WorkoutController],
  providers: [
    PrismaDB,
    { provide: WorkoutUseCases, useClass: WorkoutService },
    { provide: WorkoutRepository, useClass: PrismaWorkoutRepository },
  ],
})
export class WorkoutModule {}
