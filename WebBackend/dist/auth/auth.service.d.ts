import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, AuthLogDto } from './dto';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config/dist/config.service';
export declare class AuthService {
    private prisma;
    private jwt;
    private configService;
    constructor(prisma: PrismaService, jwt: JwtService, configService: ConfigService);
    signup(dto: AuthDto): Promise<{
        acces_token: string;
    }>;
    signin(dto: AuthLogDto): Promise<{
        acces_token: string;
    }>;
    signToken(userId: number, email: string): Promise<{
        acces_token: string;
    }>;
}
