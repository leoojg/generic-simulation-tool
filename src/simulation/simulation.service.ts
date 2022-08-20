import { BadRequestException, Injectable } from '@nestjs/common';
import { Entities } from 'src/config/entities/entities';
import { EntityRelations } from 'src/config/entities/entity-relations';

@Injectable()
export class SimulationService {
    constructor(private readonly entities: Entities, private readonly entityRelations: EntityRelations) {}
    execute() {
        const entites = this.entities.list();
        if (entites.length === 0) throw new BadRequestException(`Entites are not loaded`);
    }
}
