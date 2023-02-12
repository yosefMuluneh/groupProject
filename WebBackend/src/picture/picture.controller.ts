import { Body, Controller, Post } from '@nestjs/common';
import { PictureService } from './picture.service';

@Controller('picture')
export class PictureController {
    constructor(private picture : PictureService){}

    @Post("searchPic")
    searchPic(@Body("theString") theString:string){      
        return this.picture.searchPic(theString)
    }
}
