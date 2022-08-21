import { Module } from '@nestjs/common';
import { EntitiesModule } from 'src/entities/entities.module';
import { ServersService } from './servers.service';

@Module({
    providers: [ServersService],
    imports: [EntitiesModule],
    exports: [ServersService],
})
export class ServersModule {}
