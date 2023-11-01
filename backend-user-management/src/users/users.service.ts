import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';


@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async getUser(_id: string): Promise<User[]> {
        return await this.usersRepository.find({
            select: ["id", "name", "email", "password", "isAdmin"],
            where: [{ "id": _id }]
        });
    }
      

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<void> {
        const user = await this.getUser(id);
    
        if (!user || user.length === 0) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        try {
            await this.usersRepository.update(user[0].id, {
                name: updateUserDto.name,
                email: updateUserDto.email,
                password: updateUserDto.password,
                isAdmin: false,
            });
        } catch (error) {
            throw new Error(`Failed to update the user: ${error.message}`);
        }
    }

    async deleteUser(user: User) {
        await this.usersRepository.delete(user);
    }
    

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.id = uuidv4();
        user.name = createUserDto.name;
        user.email = createUserDto.email;
        user.password = createUserDto.password;
        user.isAdmin = false;

        try {
            const newUser = await this.usersRepository.save(user);
            return newUser;
        } catch (error) {
            throw new Error(`Failed to create a new user: ${error.message}`);
        }
    }

    async createAdmin(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.id = uuidv4();
        user.name = createUserDto.name;
        user.email = createUserDto.email;
        user.password = createUserDto.password;
        user.isAdmin = true;

        try {
            const newUser = await this.usersRepository.save(user);
            return newUser;
        } catch (error) {
            throw new Error(`Failed to create a new user: ${error.message}`);
        }
    }

    async authenticateUser(email: string, password: string): Promise<User | null> {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
            return null; 
        }
        if (password === user.password) {
            return user; 
        }
        return null; 
    }
}
