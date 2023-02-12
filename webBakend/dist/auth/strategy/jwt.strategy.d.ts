import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { PrismaService } from 'src/prisma/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(config: ConfigService, prisma: PrismaService);
    validate(payload: {
        email: string;
        sub: number;
    }): Promise<import(".prisma/client").User>;
}
export {};
