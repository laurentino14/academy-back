import { Module } from '@nestjs/common';
import { AuthModule } from './main/modules/auth';
import { ExerciseModule } from './main/modules/exercise';
import { SetModule } from './main/modules/set';
import { UserModule } from './main/modules/user';
import { WorkoutModule } from './main/modules/workout';

@Module({
  imports: [UserModule, AuthModule, ExerciseModule, SetModule, WorkoutModule],
})
export class AppModule {}
