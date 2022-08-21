import { UserRelationDto } from './userRelation.dto';

export class UserDataDto {
    constructor(userName: string) {
        this.name = userName;
        this.relations = [];
        this.currentRelation = 0;
    }
    name: string;

    startTime: number;

    relations: Array<UserRelationDto>;

    currentRelation: number;
}
