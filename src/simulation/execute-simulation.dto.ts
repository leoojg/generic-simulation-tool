import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class ExecuteSimulationDto {
    @IsNumber()
    @Transform(({ value }) => {
        if (!Number.isNaN(value) && +value < 1) return undefined;
        return value;
    })
    time: number;

    @IsNumber()
    @Transform(({ value }) => {
        if (!Number.isNaN(value) && +value < 1) return undefined;
        return value;
    })
    users: number;

    @IsString()
    startingFrom: string;
}
