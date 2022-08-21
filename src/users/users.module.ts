import { Module } from '@nestjs/common';
import { EntitiesModule } from 'src/entities/entities.module';
import { UsersService } from './users.service';

@Module({
    providers: [UsersService],
    exports: [UsersService],
    imports: [EntitiesModule],
})
export class UsersModule {}
