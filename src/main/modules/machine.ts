import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MachineRepository } from 'src/data/contracts/repositories/machine';
import { MachineService } from 'src/data/services/machine';
import { MachineUseCases } from 'src/domain/use-cases/machine';
import { PrismaDB } from 'src/infra/data-sources/prisma';
import { PrismaMachineRepository } from 'src/infra/repositories/prisma/machine';
import { MachineController } from 'src/presentation/controllers/machine';

@Module({
  imports: [JwtModule.register({})],
  controllers: [MachineController],
  providers: [
    PrismaDB,
    { provide: MachineRepository, useClass: PrismaMachineRepository },
    { provide: MachineUseCases, useClass: MachineService },
  ],
})
export class MachineModule {}
