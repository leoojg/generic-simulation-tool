import { Injectable } from '@nestjs/common';
import { TemporalEntityService } from 'src/temporalEntities/temporalEntities.service';

@Injectable()
export class TimerService {
    private time: number;
    private timeEntries: Array<number> = [];
    private timeBoard: Record<number, Array<string>> = {};
    constructor(private readonly temporalEntityService: TemporalEntityService) {}

    populateTimeBoard() {
        const users = this.temporalEntityService.list();
        Object.keys(users).forEach(userName => {
            this.addToTimeBoard(userName, users[userName].startTime);
        });
    }

    addToTimeBoard(userName: string, time: number) {
        this.timeEntries[time] = 1;
        if (!this.timeBoard[time]) {
            this.timeBoard[time] = [];
        }
        this.timeBoard[time].push(userName);
    }

    setup(time: number) {
        this.timeEntries = new Array(time + 1).fill(0);
        this.time = 1;
    }

    hasExecution(time: number) {
        return this.timeEntries[time] === 1;
    }

    getExecutions(time: number) {
        return this.timeBoard[time];
    }

    getTime() {
        return this.time;
    }

    incrementTime() {
        return ++this.time;
    }
}
