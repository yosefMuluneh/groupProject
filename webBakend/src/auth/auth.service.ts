import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, AuthLogDto } from './dto';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config/dist/config.service';


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, 
        private jwt : JwtService,
        private configService:ConfigService
        ){}


    async signup(dto:AuthDto){
        //generate hash
        const hash = await argon.hash(dto.password)

        try{
            //save the new user into db
            const user = this.prisma.user.create({
                data:{
                    email:dto.email,
                    firstName:dto.firstName,
                    lastName:dto.lastName,
                    hash,
                }
            })
            return this.signToken((await user).id,(await user).email)
        }catch(error){
            if (error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException("credentials taken")
                }
            }
            throw error
        }
        
    }

    async signin(dto:AuthLogDto){
        //find user
        const user = await this.prisma.user.findUnique({
            where:{
                email:dto.email,
            }
        })
        // if not found throw error
        if(!user){
            throw new ForbiddenException("credentials incorrect")
        }
        //verify password
        const pwMatches = await argon.verify(
            user.hash,
            dto.password
        )
            
        if(!pwMatches){
            throw new ForbiddenException("credentials incorrect")
        }
        return this.signToken(user.id, user.email)
    }

    async signToken(userId:number, email:string):Promise<{acces_token:string}>{
        const payload = {
            sub: userId,
            email,
        }
        const token = await this.jwt.signAsync(payload,{
            secret: this.configService.get('JWT_SECRET')
        })
        return {
            acces_token:token
        }
    }
}
