import { Body, Injectable, Param } from '@nestjs/common';
import { CreateUserdto } from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { UpdateUserdto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>  
    ) {}

    async findAll(){
      return this.usersRepository.find()
    }

    async getUsers(page: number, limit: number) {
      const skip = (page - 1) * limit
        return await this.usersRepository.find({
          take: limit,
          skip: skip,
        });
    }

    getUserById(id: string): Promise<User> {
        return this.usersRepository.findOneBy({ id });
    }

    async createUser(user: CreateUserdto): Promise<User> {
      const newUser = this.usersRepository.create(user);
        return await this.usersRepository.save(newUser);
    }

    async updateUserById(id: string, user: UpdateUserdto): Promise<User> {
        const userFind = await this.usersRepository.findOneBy({ id })
        if(!userFind){
          throw new Error('User not found')
        }
          await this.usersRepository.update(id, user);
          return await this.usersRepository.findOneBy({ id })
      }


      
      async deleteUser(id: string): Promise<{id: string}> {
        await this.usersRepository.delete(id);
        return { id };
      }

      async findByEmail(email: string){
        return this.usersRepository.findOne({ where: { email: email }});
      }
}