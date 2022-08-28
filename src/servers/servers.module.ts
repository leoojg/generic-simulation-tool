import { Module } from '@nestjs/common';
import { EntitiesModule } from 'src/entities/entities.module';
import { TemporalEntityModule } from 'src/temporalEntities/temporalEntities.module';
import { TimerModule } from 'src/timer/timer.module';
import { ServersService } from './servers.service';

@Module({
    providers: [ServersService],
    imports: [EntitiesModule, TemporalEntityModule, TimerModule],
    exports: [ServersService],
})
export class ServersModule {}
