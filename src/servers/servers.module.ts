import { Module } from '@nestjs/common';
import { EntitiesModule } from 'src/entities/entities.module';
import { TimerModule } from 'src/timer/timer.module';
import { UsersModule } from 'src/users/users.module';
import { ServersService } from './servers.service';

@Module({
    providers: [ServersService],
    imports: [EntitiesModule, UsersModule, TimerModule],
    exports: [ServersService],
})
export class ServersModule {}
