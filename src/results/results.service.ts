import { Injectable } from '@nestjs/common';

@Injectable()
export class ResultsService {
    private averageTimeInModel = 0;

    addAverageTimeInModel(time: number) {
        this.averageTimeInModel += time;
    }

    getAverageTimeInModel() {
        return this.averageTimeInModel;
    }

    clear() {
        this.averageTimeInModel = 0;
    }
}
