import { IsNotEmpty, IsString } from "class-validator";

export class PicDto {
    //As we put the name of the image file on the database it is nesessary
    @IsString()
    @IsNotEmpty()
    pathName : string

    @IsString()
    @IsNotEmpty()
    descr : string

    @IsString()
    @IsNotEmpty()
    place :string

    @IsString()
    @IsNotEmpty()
    animals :string
}
