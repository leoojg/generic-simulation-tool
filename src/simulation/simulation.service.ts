import { BadRequestException, Injectable } from '@nestjs/common';
import { Entities } from 'src/config/entities/entities';
import { EntityRelations } from 'src/config/entities/entity-relations';
import { join } from 'path';
import { readFileSync } from 'fs';
import { EntityDto } from 'src/config/entities/dtos/entity.dto';

@Injectable()
export class SimulationService {
    constructor(private readonly entities: Entities, private readonly entityRelations: EntityRelations) {}
    execute() {
        const entites = this.entities.list();
        if (entites.length === 0) throw new BadRequestException(`Entites are not loaded`);
    }

    load() {
        const modelFilePath = join(__dirname, '..', '..', 'model.json');
        const modelFile: { entities: Array<EntityDto>; relations: Array<{ entity: string; relation: string; chance: number }> } = JSON.parse(
            readFileSync(modelFilePath).toString(),
        );

        modelFile.entities.forEach(entity => this.entities.add(entity));
        modelFile.relations.forEach(relation => this.entityRelations.add(relation));

        return this.get();
    }

    get() {
        return { entities: this.entities.list(), relations: this.entityRelations.list() };
    }

    clear() {
        this.entities.clear();
        this.entityRelations.clear();
    }
}
