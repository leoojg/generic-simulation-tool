import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Entities } from './config/entities/entities';
import { EntityRelations } from './config/entities/entity-relations';
import { SimulationModule } from './simulation/simulation.module';

@Module({
    controllers: [AppController],
    providers: [AppService, Entities, EntityRelations],
    imports: [SimulationModule, Entities, EntityRelations],
})
export class AppModule {}
