import { Body, Controller, Get, Post, HttpException, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { UserResponseDto } from '../Users/dtos/response-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    signIn(@Body() credentials: SignInAuthDto){
        return this.authService.signIn(credentials)
    }

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    async signUp(@Body() signUpUser: SignUpAuthDto){
       const user = await this.authService.signUp(signUpUser);
       return new UserResponseDto(user);
    }
}