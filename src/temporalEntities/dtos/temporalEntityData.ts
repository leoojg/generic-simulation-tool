import { UserRelationDto } from './temporalEntityRelation';

export class UserDataDto {
    constructor() {
        this.relations = [];
        this.currentRelation = 0;
    }
    startTime: number;

    relations: Array<UserRelationDto>;

    currentRelation: number;
}
