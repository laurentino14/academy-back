import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from 'src/data/contracts/repositories/user';
import { UserService } from 'src/data/services/user';
import { UserUseCases } from 'src/domain/use-cases/user';
import { PrismaDB } from 'src/infra/data-sources/prisma';
import { PrismaUserRepository } from 'src/infra/repositories/prisma/user';
import { UserController } from 'src/presentation/controllers/user';

@Module({
  imports: [JwtModule.register({})],
  controllers: [UserController],
  providers: [
    PrismaDB,
    { provide: UserUseCases, useClass: UserService },
    { provide: UserRepository, useClass: PrismaUserRepository },
  ],
})
export class UserModule {}
