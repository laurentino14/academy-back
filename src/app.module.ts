import { Module } from '@nestjs/common';
import { UserModule } from './main/modules/user';
import { AuthModule } from './main/modules/auth';

@Module({
  imports: [UserModule, AuthModule],
})
export class AppModule {}
