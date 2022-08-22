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

    addQueue(userName: string, serverName: string) {
        console.log(`${this.timerService.getTime()}:\tqueue: adding ${userName} to ${serverName} queue`);
        this.board[serverName].queue.push(userName);
        this.processQueue(this.board[serverName], serverName);
    }

    process() {
        Object.keys(this.board).forEach(serverName => {
            const server = this.board[serverName];
            this.processServer(server, serverName);
        });
    }

    processQueue(server: ServerDto, serverName: string) {
        server.queue.forEach(userName => {
            if (!this.serverAvailable(server)) return;
            const nextMove = this.usersService.getMove(userName);

            const time = this.timerService.getTime();
            if (nextMove) {
                server.users[userName] = { enteredTime: time, time: nextMove.time };
                this.usersService.incrementMove(userName);
                this.timerService.addToTimeBoard(userName, time + nextMove.time);
            }

            server.queue.shift();
            console.log(`${time}:\tqueue: sending ${userName} to ${serverName} server`);
        });
    }

    serverAvailable(server: ServerDto) {
        return server.quantity === 0 || server.quantity - Object.keys(server.users).length > 0;
    }

    processServer(server: ServerDto, serverName: string) {
        Object.keys(server.users).forEach(userName => {
            const time = this.timerService.getTime();
            const userServer = server.users[userName];

            if (time === userServer.enteredTime + userServer.time) {
                delete server.users[userName];
                console.log(`${time}:\tserver: removing ${userName} from ${serverName}`);
                this.processQueue(server, serverName);
            }
        });
    }
}
