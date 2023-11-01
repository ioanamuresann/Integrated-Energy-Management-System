import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';

@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'dbuser',
      port: 3306,
      username: 'root',
      password: 'root123',
      database: 'users',
      entities: [User],
      synchronize: true
    }),

    UsersModule,
 
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
