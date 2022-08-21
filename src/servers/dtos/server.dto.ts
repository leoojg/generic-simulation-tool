import { ServersUsersDto } from './server-users.dto';

export class ServerDto {
    name: string;
    queue: Array<string>;
    quantity: number;
    users: Record<string, ServersUsersDto>;
}
