import { Module } from '@nestjs/common';
import { EntitiesModule } from 'src/entities/entities.module';
import { TemporalEntityService } from './temporalEntities.service';

@Module({
    providers: [TemporalEntityService],
    exports: [TemporalEntityService],
    imports: [EntitiesModule],
})
export class TemporalEntityModule {}
