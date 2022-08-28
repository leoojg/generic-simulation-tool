import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { readFileSync } from 'fs';
import { EntityDto } from 'src//entities/dtos/entity.dto';
import { ExecuteSimulationDto } from './dtos/execute-simulation.dto';
import { EntitiesService } from 'src/entities/entities.service';
import { EntityRelationsService } from 'src/entities/entity-relations.service';
import { ServersService } from 'src/servers/servers.service';
import { TimerService } from 'src/timer/timer.service';
import { TemporalEntityService } from 'src/temporalEntities/temporalEntities.service';

@Injectable()
export class SimulationService {
    constructor(
        private readonly entities: EntitiesService,
        private readonly entityRelations: EntityRelationsService,
        private readonly temporalEntityService: TemporalEntityService,
        private readonly serversService: ServersService,
        private readonly timerService: TimerService,
    ) {}
    execute({ numberOfUsers, time }: ExecuteSimulationDto) {
        // load entities and entity relations
        this.load();
        // generate data for each user in all entities.
        this.temporalEntityService.generateData(numberOfUsers);

        //setup server
        this.serversService.setup();

        // generate simulation board with all actions to optmize execution
        this.timerService.setup(time);
        this.timerService.populateTimeBoard();

        for (; this.timerService.getTime() < time; this.timerService.incrementTime()) {
            if (!this.timerService.hasExecution(this.timerService.getTime())) continue;
            this.serversService.process();
            this.timerService.getExecutions(this.timerService.getTime()).forEach(userName => {
                const userNextMove = this.temporalEntityService.getMove(userName);

                if (userNextMove) {
                    this.serversService.addQueue(userName, userNextMove.current);
                }
            });
        }

        // populate each server idleness
        return this.get();
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
        return {
            entities: this.entities.list(),
            relations: this.entityRelations.list(),
            users: this.temporalEntityService.list(),
        };
    }

    clear() {
        this.entities.clear();
        this.entityRelations.clear();
        this.serversService.clear();
    }
}
