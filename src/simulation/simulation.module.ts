import { Module } from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { SimulationController } from './simulation.controller';
import { Entities } from 'src/config/entities/entities';
import { EntityRelations } from 'src/config/entities/entity-relations';

@Module({
    controllers: [SimulationController],
    providers: [SimulationService, Entities, EntityRelations],
})
export class SimulationModule {}
