import { Module } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { EntityRelationsService } from './entity-relations.service';

@Module({
    providers: [EntitiesService, EntityRelationsService],
    exports: [EntitiesService, EntityRelationsService],
})
export class EntitiesModule {}
