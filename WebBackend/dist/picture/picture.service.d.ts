import { PrismaService } from 'src/prisma/prisma.service';
import { PicDto } from './PicDto';
export declare class PictureService {
    private prisma;
    constructor(prisma: PrismaService);
    getPic(userId: number, pathName: string): Promise<{
        theId: number;
    } | {
        theId: string;
    }>;
    likePicture(userId: number, pict: PicDto): Promise<import(".prisma/client").Picture | {
        pics: import(".prisma/client").Picture[];
    }>;
    favoritePics(userId: number): Promise<{
        pics: import(".prisma/client").Picture[];
    }>;
    deletePic(userId: number, id: number): Promise<{
        pics: import(".prisma/client").Picture[];
    }>;
    searchPic(searchkey: string): Promise<{
        searchPics: import(".prisma/client").Picture[];
    }>;
}
