import { Module } from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { SimulationController } from './simulation.controller';
import { EntitiesModule } from 'src/entities/entities.module';
import { ServersModule } from 'src/servers/servers.module';
import { TimerModule } from 'src/timer/timer.module';
import { TemporalEntityModule } from 'src/temporalEntities/temporalEntities.module';
import { ResultsModule } from 'src/results/results.module';

@Module({
    controllers: [SimulationController],
    providers: [SimulationService],
    imports: [TemporalEntityModule, EntitiesModule, ServersModule, TimerModule, ResultsModule],
})
export class SimulationModule {}
