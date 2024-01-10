import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Admin } from 'src/auth/role.decorator';


@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) { }

    @UseGuards(AuthGuard())
    @Get(':id')
    get(@Param() params): Promise<User[]> {
        return this.userService.getUser(params.id);
    }

    @UseGuards(AuthGuard())
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

    @UseGuards(AuthGuard())
    @Admin()
    @Put(':id')
    update(@Param() params, @Body() user: UpdateUserDto): Promise<void> {
        return this.userService.updateUser(params.id,user);
    }

    @UseGuards(AuthGuard())
    @Admin()
    @Delete(':id')
    deleteUser(@Param() params) {
        return this.userService.deleteUser(params.id);
    }

    @Post('login')
    login(@Body() loginData: { email: string, password: string }) {
       return  this.userService.authenticateUser(loginData.email, loginData.password);
    }
}
