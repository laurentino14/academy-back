import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepository } from 'src/data/contracts/repositories/auth';
import { AuthService } from 'src/data/services/auth';
import { AuthUseCases } from 'src/domain/use-cases/auth';
import { PrismaDB } from 'src/infra/data-sources/prisma';
import { PrismaAuthRepository } from 'src/infra/repositories/prisma/auth';
import { AuthController } from 'src/presentation/controllers/auth';

@Module({
  imports: [JwtModule.register({ secret: process.env.SECRET_KEY })],
  controllers: [AuthController],
  providers: [
    PrismaDB,
    {
      provide: AuthRepository,
      useClass: PrismaAuthRepository,
    },
    { provide: AuthUseCases, useClass: AuthService },
  ],
})
export class AuthModule {}
