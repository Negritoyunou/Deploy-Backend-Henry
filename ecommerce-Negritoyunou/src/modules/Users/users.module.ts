import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { UsersRepository } from './users.repository';

@Module({
  providers: [UserService, UsersRepository],
  controllers: [UserController],
})

export class UserModule {}