import { PictureService } from './picture.service';
export declare class PictureController {
    private picture;
    constructor(picture: PictureService);
    searchPic(theString: string): Promise<{
        searchPics: import(".prisma/client").Picture[];
    }>;
}
