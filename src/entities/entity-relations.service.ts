import { Injectable } from '@nestjs/common';
import { EntityRelationsDto } from './dtos/entity-relations.dto';
import { EntityDto } from './dtos/entity.dto';

@Injectable()
export class EntityRelationsService {
    private relations: Record<string, Array<EntityRelationsDto>> = {};

    get(entity: EntityDto) {
        return this.relations[entity.name];
    }

    list() {
        return this.relations;
    }

    add({ entity, relation, chance }: { entity: string; relation: string; chance: number }) {
        if (!this.relations[entity]) {
            this.relations[entity] = [];
        }
        if (!this.relations[entity].find(i => i.relation === relation)) {
            this.relations[entity].push({ relation, chance, absoluteChance: this.getAbsoluteChance(entity) + chance });
        }
        return this.relations[entity];
    }

    clear() {
        this.relations = {};
    }

    getAbsoluteChance(entity: string) {
        const [lastRelation] = this.relations[entity].slice(-1);

        return lastRelation?.absoluteChance ?? 0;
    }
}
