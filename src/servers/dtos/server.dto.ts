import { ServersUsersDto } from './server-users.dto';

export class ServerDto {
    queue: Array<string>;
    quantity: number;
    users: Record<string, ServersUsersDto>;
}
