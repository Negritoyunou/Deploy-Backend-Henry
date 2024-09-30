import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './user.interface';
import { CreateUserdto } from './dtos/create-user.dto';
import { AuthGuard } from '../Auth/auth.guard';

@Controller('users')
export class UserController {
    constructor (
        private readonly userService: UserService
    ) {}

    @UseGuards(AuthGuard)
    @Get('page')
    async findWithPagination(
        @Query('page') page: string = '1',
        @Query('limit') limit: string = '5',
    ) {
        const pageNumber = parseInt(page, 10) || 1;
        const limitNumber = parseInt(limit, 10) || 5;
        const users = await this.userService.getUsers(pageNumber, limitNumber);
        return { data: users };
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    getUserById(@Param('id') id: string){
        return this.userService.getUserById(id);
    }

    @Post()
    async createUser(@Body() user: CreateUserdto){
        return await this.userService.createUser(user);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    updateUserById(@Param('id') id: string, @Body() user: CreateUserdto) {
        return this.userService.updateUserById(id, user);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }

}
