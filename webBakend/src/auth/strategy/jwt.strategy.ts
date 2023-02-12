import {PassportStrategy} from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt';
import {ConfigService} from '@nestjs/config/dist/config.service'
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(config:ConfigService, private prisma: PrismaService){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : config.get('JWT_SECRET'),

        }
            
        )
    }
    async validate(payload:{email:string, sub:number}){
        const user = await this.prisma.user.findUnique({
            where : {
                id:payload.sub
            }
        })
        return user
    }
}