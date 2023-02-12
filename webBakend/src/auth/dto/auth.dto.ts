import { IsString,IsEmail,IsNotEmpty } from "class-validator"

export class AuthDto{

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsString()
    password:string

    @IsNotEmpty()
    @IsString()
    firstName:string

    @IsNotEmpty()
    @IsString()
    lastName:string
}

export class AuthLogDto {
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsString()
    password:string
}