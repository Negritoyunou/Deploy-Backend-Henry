import { Injectable, Inject } from '@nestjs/common';
import { UsersRepository } from '../Users/users.repository';

@Injectable()
export class AuthService {
    constructor(
        @Inject(UsersRepository)
        private readonly usersRepository: UsersRepository
    ) {}

    getAuth(): string {
        return 'Get auth';
    }

    async loginAuth(email: string, password: string) {
        const user = await this.usersRepository.getUserByEmail(email);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        if (user.password !== password) {
            throw new Error('Contraseña incorrecta');
        }
        
        return { message: 'Inicio de sesión exitoso', userId: user.id };
    }
}