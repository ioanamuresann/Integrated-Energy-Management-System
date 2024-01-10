import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AdminGuard } from 'src/auth/admin.guard';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [TypeOrmModule.forFeature([User]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: 3600 },
  }),
  ],
  providers: [UsersService,JwtStrategy,{
    provide: APP_GUARD,
    useClass: AdminGuard,
  }],
  controllers: [UsersController],
  exports: [JwtStrategy, PassportModule]
})
export class UsersModule { }    
