import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, AuthLogDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('signup')
    signup(@Body() dto:AuthDto){

        return this.authService.signup(dto)
    }

    @Post('login')
    login(@Body() dto:AuthLogDto){
        return this.authService.signin(dto)
    }
}
