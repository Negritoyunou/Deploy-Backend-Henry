import { Body, Injectable, Param } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.interface';
import { Userdto } from './dtos/user.dto';

@Injectable()
export class UserService {
    constructor(private usersRepository: UsersRepository) {}

    getUsers(page: number, limit: number) {
        return this.usersRepository.getUsers(page, limit);
    }

    getUserById(id: number) {
        return this.usersRepository.getUserById(id);
    }

    createUser(user: Omit<Userdto, 'id'>):Promise<{id : number}> {
        return this.usersRepository.createUser(user);
    }

    updateUserById(id: number, user: Userdto): Promise<number> {
        return this.usersRepository.updateUserById(id, user);
      }
      
      deleteUser(id: number): Promise<number> {
        return this.usersRepository.deleteUser(id);
      }
}