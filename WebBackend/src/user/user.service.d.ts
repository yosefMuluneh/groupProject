import { PrismaService } from 'src/prisma/prisma.service';
import { UserUpdateDto } from './user-update-dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    sharePic(): Promise<{
        users: import(".prisma/client").User[];
    }>;
    updateUser(id: number, userUpdto: UserUpdateDto): Promise<import(".prisma/client").User>;
    searchUser(email: string): Promise<import(".prisma/client").User[]>;
    findMe(id: number): Promise<import(".prisma/client").User>;
}
