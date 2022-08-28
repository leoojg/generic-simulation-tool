import { Module } from '@nestjs/common';
import { TemporalEntityModule } from 'src/temporalEntities/temporalEntities.module';
import { TimerModule } from 'src/timer/timer.module';
import { ResultsService } from './results.service';

@Module({
    providers: [ResultsService],
    exports: [ResultsService],
    imports: [TemporalEntityModule, TimerModule],
})
export class ResultsModule {}
