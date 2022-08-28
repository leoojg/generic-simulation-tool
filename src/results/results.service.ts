import { Injectable } from '@nestjs/common';
import { TemporalEntityService } from 'src/temporalEntities/temporalEntities.service';
import { TimerService } from 'src/timer/timer.service';

@Injectable()
export class ResultsService {
    private averageTimeInModel = {
        totalEntities: 0,
        totalTime: 0,
    };

    constructor(private readonly temporalEntityService: TemporalEntityService, private readonly timerService: TimerService) {}

    addAverageTimeInModel(time: number) {
        this.averageTimeInModel.totalEntities++;
        this.averageTimeInModel.totalTime += time;
    }

    getAverageTimeInModel() {
        return this.averageTimeInModel.totalTime / this.averageTimeInModel.totalEntities;
    }

    clear() {
        this.averageTimeInModel = {
            totalEntities: 0,
            totalTime: 0,
        };
    }

    processAverageTimeInModel(temporalEntityName: string) {
        this.addAverageTimeInModel(this.timerService.getTime() - this.temporalEntityService.get(temporalEntityName).startTime);
    }
}
