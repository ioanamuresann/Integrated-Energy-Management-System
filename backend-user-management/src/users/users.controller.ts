import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) { }

    @Get(':id')
    get(@Param() params): Promise<User[]> {
        return this.userService.getUser(params.id);
    }

    @Get()
    getAllUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @Post('register')
    createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
      return this.userService.createUser(createUserDto);
    }

    @Post('register-admin')
    createAdmin(@Body() createUserDto: CreateUserDto): Promise<User> {
      return this.userService.createAdmin(createUserDto);
    }

    @Put(':id')
    update(@Param() params, @Body() user: UpdateUserDto): Promise<void> {
        return this.userService.updateUser(params.id,user);
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.userService.deleteUser(params.id);
    }

    @Post('login')
    login(@Body() loginData: { email: string, password: string }): Promise<User> {
       return  this.userService.authenticateUser(loginData.email, loginData.password);
    }
}
