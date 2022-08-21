import { Injectable, NotFoundException } from '@nestjs/common';
import { EntitiesService } from 'src/entities/entities.service';
import { EntityRelationsService } from 'src/entities/entity-relations.service';
import { UserDataDto } from './dtos/userData.dto';

@Injectable()
export class UsersService {
    private users: Array<UserDataDto> = [];
    constructor(private readonly entities: EntitiesService, private readonly entityRelations: EntityRelationsService) {}

    generateData(numberOfUsers: number) {
        const [hasInitalEntity, hasFinalEntity] = [this.entities.getInitial(), this.entities.getFinal()];

        if (!hasInitalEntity) throw new NotFoundException('Initial entity not found');
        if (!hasFinalEntity) throw new NotFoundException('Final entity not found');

        this.clear();

        this.users = new Array(numberOfUsers).fill(0).map((_, i) => {
            const user = new UserDataDto(`user_${i}`);

            return user;
        });

        const users = this.users;
    }

    clear() {
        this.users.length = 0;
    }
}
