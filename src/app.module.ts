import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SimulationModule } from './simulation/simulation.module';
import { EntitiesModule } from './entities/entities.module';
import { ServersModule } from './servers/servers.module';
import { TimerModule } from './timer/timer.module';
import { TemporalEntityModule } from './temporalEntities/temporalEntities.module';

@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [SimulationModule, TemporalEntityModule, EntitiesModule, ServersModule, TimerModule],
})
export class AppModule {}
