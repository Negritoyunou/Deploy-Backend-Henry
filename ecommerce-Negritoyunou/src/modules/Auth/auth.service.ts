import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../Users/users.entity';
import { Repository } from 'typeorm';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { UserService } from '../Users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { hash, compare } from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async signIn(credentials: SignInAuthDto){
        const user = await this.userService.findByEmail(credentials.email);
        if(!user){
            throw new HttpException('User Not Found', 404)
        }

        const isPasswordMatching = await compare(
            credentials.password, 
            user.password
        )

        if(!isPasswordMatching){
            throw new HttpException('Wrong credentials provided', HttpStatus.UNAUTHORIZED)
        }

        const token = await this.createToken(user)
        return { token };

    }

    async signUp(signUpUser: SignUpAuthDto){
        if(signUpUser.password !== signUpUser.passwordConfirm){
            throw new HttpException('Password does not match', 400)
        }

        signUpUser.password = await hash(signUpUser.password, 10)
        const newUser = await this.userService.createUser(signUpUser)
        return newUser;
    }

    private async createToken(user: User){
        const payload = {
            id: user.id,
            email: user.email,
            roles: user.administrador,
        };

        return this.jwtService.signAsync(payload);
    }
}