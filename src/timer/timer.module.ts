import { Module } from '@nestjs/common';
import { TemporalEntityModule } from 'src/temporalEntities/temporalEntities.module';
import { TimerService } from './timer.service';

@Module({
    providers: [TimerService],
    exports: [TimerService],
    imports: [TemporalEntityModule],
})
export class TimerModule {}
