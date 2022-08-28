import { FiniteServerDto } from './finite-server.dto';
import { ServerQueueDto } from './server-queue.dto';

export class ServerDto {
    queue: Array<ServerQueueDto>;
    quantity: number;
    finiteServers: Array<FiniteServerDto>;
    queueIdleness: {
        totalTime: number;
        total: number;
    };
    serverIdleness: {
        totalTime: number;
        total: number;
    };
    queueChanges: Array<{
        temporalEntities: number;
        time: number;
    }>;
}
