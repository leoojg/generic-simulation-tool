import { Injectable } from '@nestjs/common';
import { EntitiesService } from 'src/entities/entities.service';
import { TimerService } from 'src/timer/timer.service';
import { UsersService } from 'src/users/users.service';
import { ServerDto } from './dtos/server.dto';

@Injectable()
export class ServersService {
    private board: Record<string, ServerDto> = {};

    constructor(
        private readonly entitiesService: EntitiesService,
        private readonly usersService: UsersService,
        private readonly timerService: TimerService,
    ) {}

    setup() {
        this.clear();
        this.entitiesService.list().forEach(entity => {
            this.add(entity.name, {
                quantity: entity.quantity,
                queue: [],
                users: {},
            });
        });
    }

    clear() {
        this.board = {};
    }

    add(serverName: string, server: ServerDto) {
        this.board[serverName] = server;
    }

    list() {
        return this.board;
    }

    addQueue(userName: string, server: string) {
        this.board[server].queue.push(userName);
    }

    process() {
        Object.keys(this.board).forEach(serverName => {
            const server = this.board[serverName];
            this.processQueue(server);
            this.processServer(server);
        });
    }

    processQueue(server: ServerDto) {
        server.queue.forEach(userName => {
            if (!this.serverAvailable(server)) return;
            const nextMove = this.usersService.getNextMove(userName);

            if (nextMove) {
                const time = this.timerService.getTime();
                server.users[userName] = { enteredTime: time, time: nextMove.time };
                this.timerService.addToTimeBoard(userName, time + nextMove.time);
            }

            server.queue.shift();
        });
    }

    serverAvailable(server: ServerDto) {
        return server.quantity === 0 || server.quantity - Object.keys(server.users).length > 0;
    }

    processServer(server: ServerDto) {
        Object.keys(server.users).forEach(userName => {
            const time = this.timerService.getTime();
            const userTime = server.users[userName];

            if (time === userTime.enteredTime + userTime.time) {
                this.usersService.incrementMove(userName);
                delete server.users[userName];
                const nextMove = this.usersService.getNextMove(userName);
                if (nextMove) {
                    this.addQueue(userName, nextMove.current);
                }
            }
        });
    }
}
