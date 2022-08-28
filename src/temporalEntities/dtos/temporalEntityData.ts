import { TemporalEntityRelationDto } from './temporalEntityRelation';

export class TemportalEntityDataDto {
    constructor() {
        this.relations = [];
        this.currentRelation = 0;
    }
    startTime: number;

    relations: Array<TemporalEntityRelationDto>;

    currentRelation: number;
}
