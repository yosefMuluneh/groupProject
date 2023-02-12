import { IsNotEmpty, IsString } from "class-validator";

export class PicDto {
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