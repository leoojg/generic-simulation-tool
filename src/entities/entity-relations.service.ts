import { Injectable } from '@nestjs/common';
import { EntityDto } from './dtos/entity.dto';

@Injectable()
export class EntityRelationsService {
    private relations: Record<string, Array<{ relation: string; chance: number }>> = {};

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
            this.relations[entity].push({ relation: relation, chance });
        }
        return this.relations[entity];
    }

    clear() {
        this.relations = {};
    }
}
