import { AuthService } from './auth.service';
import { AuthDto, AuthLogDto } from './dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: AuthDto): Promise<{
        acces_token: string;
    }>;
    login(dto: AuthLogDto): Promise<{
        acces_token: string;
    }>;
}
