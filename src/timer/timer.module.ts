import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { TimerService } from './timer.service';

@Module({
    providers: [TimerService],
    exports: [TimerService],
    imports: [UsersModule],
})
export class TimerModule {}
