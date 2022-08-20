import { Injectable } from '@nestjs/common';
import { EntityDto } from './dtos/entity.dto';

@Injectable()
export class EntityRelations {
    private relations: Record<string, Array<string>> = {};

    get(entity: EntityDto) {
        return this.relations[entity.name];
    }

    list() {
        return this.relations;
    }

    add(entity: EntityDto, relation: EntityDto) {
        if (!this.relations[entity.name]) {
            this.relations[entity.name] = [];
        }
        if (!this.relations[entity.name].find(i => i === relation.name)) {
            this.relations[entity.name].push(relation.name);
        }
        return this.relations[entity.name];
    }

    clear() {
        this.relations = {};
    }
}
