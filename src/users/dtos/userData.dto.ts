import { UserRelationDto } from './userRelation.dto';

export class UserDataDto {
    constructor(userName: string) {
        this.name = userName;
        this.relations = [];
    }
    name: string;

    relations: Array<UserRelationDto>;
}
