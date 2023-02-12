import { User } from '@prisma/client';
import { PicDto } from 'src/picture/PicDto';
import { PictureService } from 'src/picture/picture.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserUpdateDto } from './user-update-dto';
import { UserService } from './user.service';
export declare class UserController {
    private picture;
    private prisma;
    private userService;
    constructor(picture: PictureService, prisma: PrismaService, userService: UserService);
    update(id: number, userId: number, userUpdto: UserUpdateDto): Promise<User>;
    mySelf(id: number): Promise<User>;
    likePicture(userId: number, pict: PicDto): Promise<import(".prisma/client").Picture | {
        pics: import(".prisma/client").Picture[];
    }>;
    sharePic(): Promise<{
        users: User[];
    }>;
    favorite(userId: number): Promise<{
        pics: import(".prisma/client").Picture[];
    }>;
    getPicId(userId: number, pathName: string): Promise<{
        theId: number;
    } | {
        theId: string;
    }>;
    deletePic(userId: number, picId: number): Promise<{
        pics: import(".prisma/client").Picture[];
    }>;
    searchUser(userId: number, email: string): Promise<User[]>;
}
