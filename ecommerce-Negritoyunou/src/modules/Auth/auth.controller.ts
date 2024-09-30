import { Body, Controller, Get, Post, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // @Get()
    // getAuth(): string {
    //     return this.authService.getAuth();
    // }

    // @Post('signin')
    // async signin(@Body() body: { email: string; password: string }) {
    //     const { email, password } = body;

    //     if (!email || !password) {
    //         throw new HttpException('Email y password son requeridos', HttpStatus.BAD_REQUEST);
    //     }

    //     try {
    //         const result = await this.authService.loginAuth(email, password);
    //         return result;
    //     } catch (error) {
    //         throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    //     }
    // }
}