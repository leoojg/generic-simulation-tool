import { Module } from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { SimulationController } from './simulation.controller';
import { UsersModule } from 'src/users/users.module';
import { EntitiesModule } from 'src/entities/entities.module';
import { ServersModule } from 'src/servers/servers.module';
import { TimerModule } from 'src/timer/timer.module';

@Module({
    controllers: [SimulationController],
    providers: [SimulationService],
    imports: [UsersModule, EntitiesModule, ServersModule, TimerModule],
})
export class SimulationModule {}
