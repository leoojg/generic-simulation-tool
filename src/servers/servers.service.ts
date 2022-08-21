import { Injectable } from '@nestjs/common';
import { EntitiesService } from 'src/entities/entities.service';
import { ServerDto } from './dtos/server.dto';

@Injectable()
export class ServersService {
    private board: Array<ServerDto> = [];

    constructor(private readonly entitiesService: EntitiesService) {}

    setup() {
        this.clear();
        this.entitiesService.list().forEach(entity => {
            this.add({
                name: entity.name,
                quantity: entity.quantity,
                queue: [],
                users: {},
            });
        });
    }

    clear() {
        this.board.length = 0;
    }

    add(server: ServerDto) {
        this.board.push(server);
    }

    list() {
        return this.board;
    }
}
