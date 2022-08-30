import { Injectable } from '@nestjs/common';
import { EntitiesService } from 'src/entities/entities.service';
import { TemporalEntityService } from 'src/temporalEntities/temporalEntities.service';
import { TimerService } from 'src/timer/timer.service';
import { ServerDto } from './dtos/server.dto';

@Injectable()
export class ServersService {
    private _board: Record<string, ServerDto> = {};

    constructor(
        private readonly entitiesService: EntitiesService,
        private readonly temporalEntityService: TemporalEntityService,
        private readonly timerService: TimerService,
    ) {}

    setup() {
        this.clear();
        this.entitiesService.list().forEach(entity => {
            this._board[entity.name] = {
                quantity: entity.quantity,
                queue: [],
                finiteServers: new Array(entity.quantity).fill(0).map(() => {
                    return {
                        available: true,
                        leaveTime: 0,
                        cameIn: 0,
                        availabilityChange: [{ time: 0, available: true }],
                    };
                }),
                queueIdleness: {
                    total: 0,
                    totalTime: 0,
                },
                serverIdleness: {
                    total: 0,
                    totalTime: 0,
                },
                queueChanges: [],
            };
        });
    }

    clear() {
        this._board = {};
    }

    list() {
        return this._board;
    }

    addQueue(temporalEntityName: string, serverName: string) {
        const time = this.timerService.getTime();
        console.log(`${time}:\tqueue: adding ${temporalEntityName} to ${serverName} queue`);
        this._board[serverName].queue.push({ temporalEntityName, cameIn: time });
        this.registerQueueChange(this._board[serverName]);
        this.processQueue(this._board[serverName], serverName);
    }

    process() {
        Object.keys(this._board).forEach(serverName => {
            const server = this._board[serverName];
            this.processServer(server, serverName);
        });
    }

    processQueue(server: ServerDto, serverName: string) {
        server.queue.forEach(entityInQueue => {
            if (!this.serverAvailable(server)) return;
            const time = this.timerService.getTime();

            const nextMove = this.temporalEntityService.getMove(entityInQueue.temporalEntityName);
            const finiteServer = this.getAvailableServer(server);

            finiteServer.available = false;
            finiteServer.availabilityChange?.push({ time, available: false });
            finiteServer.leaveTime = time + nextMove.time;
            finiteServer.cameIn = time;
            finiteServer.temporalEntityName = entityInQueue.temporalEntityName;
            this.temporalEntityService.incrementMove(entityInQueue.temporalEntityName);
            this.timerService.addToTimeBoard(entityInQueue.temporalEntityName, time + nextMove.time);

            server.queueIdleness.total++;
            server.queueIdleness.totalTime += time - entityInQueue.cameIn;

            server.queue.shift();
            this.registerQueueChange(server);
            console.log(`${time}:\tqueue: sending ${entityInQueue.temporalEntityName} to ${serverName} server`);
        });
    }

    serverAvailable(server: ServerDto) {
        return server.quantity === 0 || server.finiteServers.find(server => server.available);
    }

    processServer(server: ServerDto, serverName: string) {
        server.finiteServers.forEach(finiteServer => {
            if (finiteServer.available) return;
            const time = this.timerService.getTime();
            if (finiteServer.leaveTime === time) {
                server.serverIdleness.total++;
                server.serverIdleness.totalTime += finiteServer.leaveTime - finiteServer.cameIn;

                console.log(`${time}:\tserver: removing ${finiteServer.temporalEntityName} from ${serverName}`);
                finiteServer.available = true;
                finiteServer.availabilityChange?.push({ time, available: true });
                finiteServer.temporalEntityName = undefined;
                finiteServer.leaveTime = 0;
                this.processQueue(server, serverName);
            }
        });
    }

    getAvailableServer(server: ServerDto) {
        const hasAvailableServer = server.finiteServers.find(server => server.available);

        if (server.quantity === 0 && !hasAvailableServer) {
            server.finiteServers.push({ available: true, leaveTime: 0, cameIn: 0 });
        }

        return hasAvailableServer ?? server.finiteServers[server.finiteServers.length - 1];
    }

    getIdleness() {
        return Object.keys(this._board).map(server => {
            if (this._board[server].quantity === 0) {
                return { server, idleness: 0 };
            }
            return {
                server,
                servers: this._board[server].finiteServers.map((finiteServer, i) => {
                    finiteServer.availabilityChange.push({ time: this.timerService.getTime(), available: false });
                    return {
                        server: `${server}_${i}`,
                        idleness: finiteServer.availabilityChange.reduce((acc, occurrence) => {
                            if (!occurrence.available) acc += occurrence.time;
                            else acc -= occurrence.time;
                            return acc;
                        }, 0),
                    };
                }),
            };
        });
    }

    getQueueAverage() {
        return Object.keys(this._board).map(server => {
            return {
                server,
                averageTime: this._board[server].queueIdleness.totalTime / (this._board[server].queueIdleness.total || 1),
            };
        });
    }

    getServerAverage() {
        return Object.keys(this._board).map(server => {
            return {
                server,
                averageTime: this._board[server].serverIdleness.totalTime / (this._board[server].serverIdleness.total || 1),
            };
        });
    }

    registerQueueChange(server: ServerDto) {
        server.queueChanges.push({ temporalEntities: server.queue.length, time: this.timerService.getTime() });
    }

    getTemporalEntitiesQueueAverage() {
        return Object.keys(this._board).map(server => {
            if (this._board[server].quantity === 0) return { server, average: 0 };
            this._board[server].queueChanges.push({ temporalEntities: 0, time: this.timerService.getTime() });
            return {
                server,
                average:
                    this._board[server].queueChanges
                        .reduce((acc, change) => {
                            const changeTimeInAcc = acc.find(i => i.time === change.time);
                            if (!changeTimeInAcc) {
                                acc.push(change);
                            } else {
                                changeTimeInAcc.temporalEntities = Math.min(changeTimeInAcc.temporalEntities, change.temporalEntities);
                            }
                            return acc;
                        }, [] as Array<{ temporalEntities: number; time: number }>)
                        .reduce(
                            (acc, occurrence) => {
                                acc.total += (occurrence.time - acc.lastTime) * acc.lastCount;
                                acc.lastTime = occurrence.time;
                                acc.lastCount = occurrence.temporalEntities;
                                return acc;
                            },
                            { lastTime: 0, lastCount: 0, total: 0 },
                        ).total / this.timerService.getTime(),
            };
        });
    }
}
