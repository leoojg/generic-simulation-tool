import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { readFileSync } from 'fs';
import { EntityDto } from 'src//entities/dtos/entity.dto';
import { ExecuteSimulationDto } from './dtos/execute-simulation.dto';
import { UsersService } from 'src/users/users.service';
import { EntitiesService } from 'src/entities/entities.service';
import { EntityRelationsService } from 'src/entities/entity-relations.service';
import { ServersService } from 'src/servers/servers.service';

@Injectable()
export class SimulationService {
    constructor(
        private readonly entities: EntitiesService,
        private readonly entityRelations: EntityRelationsService,
        private readonly usersService: UsersService,
        private readonly serversService: ServersService,
    ) {}
    execute(executeData: ExecuteSimulationDto) {
        const entites = this.entities.list();
        if (entites.length === 0) this.load();

        // generate data for each user in all entities.
        this.usersService.generateData(executeData.numberOfUsers);

        this.serversService.setup();

        // generate simulation board with all actions to optmize executions

        // populate each server idleness
        const user = this.usersService.list();
        return user;
    }

    load() {
        this.clear();
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
