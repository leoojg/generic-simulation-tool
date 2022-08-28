import { Injectable, NotFoundException } from '@nestjs/common';
import { randomInt } from 'crypto';
import { EntityRelationsDto } from 'src/entities/dtos/entity-relations.dto';
import { EntityDto } from 'src/entities/dtos/entity.dto';
import { EntitiesService } from 'src/entities/entities.service';
import { EntityRelationsService } from 'src/entities/entity-relations.service';
import { TemportalEntityDataDto } from './dtos/temporalEntityData';
import { TemporalEntityRelationDto } from './dtos/temporalEntityRelation';

@Injectable()
export class TemporalEntityService {
    private temporalEntity: Record<string, TemportalEntityDataDto> = {};
    constructor(private readonly entities: EntitiesService, private readonly entityRelations: EntityRelationsService) {}

    generateData(numberOfTemporalEnities: number) {
        const [initalEntity, finalEntity] = [this.entities.getInitial(), this.entities.getFinal()];

        if (!initalEntity) throw new NotFoundException('Initial entity not found');
        if (!finalEntity) throw new NotFoundException('Final entity not found');

        this.clear();

        for (let i = 0; i < numberOfTemporalEnities; i++) {
            const temporalEntity: TemportalEntityDataDto = new TemportalEntityDataDto();
            temporalEntity.startTime = i + 1;

            let entity: EntityDto = initalEntity;
            do {
                const relation = {
                    current: entity.name,
                } as TemporalEntityRelationDto;
                const possibilities = this.entityRelations.get(entity);

                relation.time = entity.minimalTime + Math.floor(Math.random() * (entity.maximumTime - entity.minimalTime + 1));

                entity = this.choiceEntity(possibilities);
                relation.next = entity.name;

                temporalEntity.relations.push(relation);
            } while (!entity.final);

            this.temporalEntity[`temporal_entity_${i + 1}`] = temporalEntity;
        }
    }

    clear() {
        this.temporalEntity = {};
    }

    choiceEntity(possibilities: Array<EntityRelationsDto>): EntityDto {
        const random = randomInt(0, 101);

        for (const possiblity of possibilities) {
            if (random <= possiblity.absoluteChance * 100) {
                return this.entities.getByName(possiblity.relation);
            }
        }
    }

    list() {
        return this.temporalEntity;
    }

    getMove(temporalEntityName: string) {
        const temporalEntity = this.get(temporalEntityName);
        return temporalEntity.relations[temporalEntity.currentRelation];
    }

    get(temporalEntityName: string) {
        return this.temporalEntity[temporalEntityName];
    }

    incrementMove(temporalEntityName: string) {
        const temporalEntity = this.get(temporalEntityName);
        temporalEntity.currentRelation++;
    }
}
