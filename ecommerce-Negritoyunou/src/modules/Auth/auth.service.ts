import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../Users/users.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
    // constructor(
    //     @InjectRepository(User)
    //     private readonly usersRepository: Repository<User>
    // ) {}

    // getAuth(): string {
    //     return 'Get auth';
    // }

    // async loginAuth(email: string, password: string) {
    //     const user = await this.usersRepository.getUserByEmail(email);

    //     if (!user) {
    //         throw new Error('Usuario no encontrado');
    //     }

    //     if (user.password !== password) {
    //         throw new Error('Contraseña incorrecta');
    //     }
        
    //     return { message: 'Inicio de sesión exitoso', userId: user.id };
    // }
}