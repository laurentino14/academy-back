import { Module } from '@nestjs/common';
import { AuthModule } from './main/modules/auth';
import { ExerciseModule } from './main/modules/exercise';
import { HistoryModule } from './main/modules/history';
import { MachineModule } from './main/modules/machine';
import { SetModule } from './main/modules/set';
import { UserModule } from './main/modules/user';
import { WorkoutModule } from './main/modules/workout';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ExerciseModule,
    SetModule,
    WorkoutModule,
    MachineModule,
    HistoryModule,
  ],
})
export class AppModule {}
