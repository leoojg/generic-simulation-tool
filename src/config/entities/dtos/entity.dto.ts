import { IsString } from 'class-validator';

export class EntityDto {
    @IsString()
    name: string;
}
