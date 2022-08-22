import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SimulationModule } from './simulation/simulation.module';
import { UsersModule } from './users/users.module';
import { EntitiesModule } from './entities/entities.module';
import { ServersModule } from './servers/servers.module';
import { TimerModule } from './timer/timer.module';

@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [SimulationModule, UsersModule, EntitiesModule, ServersModule, TimerModule],
})
export class AppModule {}
