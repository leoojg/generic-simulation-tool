import { Injectable, NotFoundException } from '@nestjs/common';
import { randomInt } from 'crypto';
import { EntityRelationsDto } from 'src/entities/dtos/entity-relations.dto';
import { EntityDto } from 'src/entities/dtos/entity.dto';
import { EntitiesService } from 'src/entities/entities.service';
import { EntityRelationsService } from 'src/entities/entity-relations.service';
import { UserDataDto } from './dtos/userData.dto';
import { UserRelationDto } from './dtos/userRelation.dto';

@Injectable()
export class UsersService {
    private users: Record<string, UserDataDto> = {};
    constructor(private readonly entities: EntitiesService, private readonly entityRelations: EntityRelationsService) {}

    generateData(numberOfUsers: number) {
        const [initalEntity, finalEntity] = [this.entities.getInitial(), this.entities.getFinal()];

        if (!initalEntity) throw new NotFoundException('Initial entity not found');
        if (!finalEntity) throw new NotFoundException('Final entity not found');

        this.clear();

        for (let i = 0; i < numberOfUsers; i++) {
            const user: UserDataDto = new UserDataDto();
            user.startTime = i + 1;

            let entity: EntityDto = initalEntity;
            do {
                const relation = {
                    current: entity.name,
                } as UserRelationDto;
                const possibilities = this.entityRelations.get(entity);

                relation.time = entity.minimalTime + Math.floor(Math.random() * (entity.maximumTime - entity.minimalTime + 1));

                entity = this.choiceEntity(possibilities);
                relation.next = entity.name;

                user.relations.push(relation);
            } while (!entity.final);

            this.users[`user_${i + 1}`] = user;
        }
    }

    clear() {
        this.users = {};
    }

    choiceEntity(possibilities: Array<EntityRelationsDto>): EntityDto {
        const random = randomInt(0, 101);

        for (const possiblity of possibilities) {
            if (random <= possiblity.absoluteChance * 100) {
                return this.entities.getByName(possiblity.relation);
            }
        }
    }

    list() {
        return this.users;
    }

    getMove(userName: string) {
        const user = this.get(userName);
        return user.relations[user.currentRelation];
    }

    get(userName: string) {
        return this.users[userName];
    }

    incrementMove(userName: string) {
        const user = this.get(userName);
        user.currentRelation++;
    }
}
