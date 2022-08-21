import { Injectable } from '@nestjs/common';
import { EntityDto } from './dtos/entity.dto';

@Injectable()
export class EntitiesService {
    private entities: Array<EntityDto> = [];

    list() {
        return this.entities;
    }

    get(entity: EntityDto) {
        return this.entities.find(i => i.name === entity.name);
    }

    add(entity: EntityDto) {
        if (this.get(entity)) return this.entities;
        return this.entities.push(entity);
    }

    clear() {
        this.entities.length = 0;
    }

    getInitial() {
        return this.entities.find(entity => entity.initial);
    }

    getFinal() {
        return this.entities.find(entity => entity.final);
    }
}
