import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevicesModule } from './devices/devices.module';
import { Device } from './devices/device.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { SharedKeyJwtMiddleware } from './shared/shared-key-jwt.middleware';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './shared/constants';

@Module({
  imports: [DevicesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'dbdevice',
      port: 3306,
      username: 'root',
      password: 'root123',
      database: 'devices',
      entities: [Device,User],
      synchronize: true
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 3600 },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SharedKeyJwtMiddleware).forRoutes('*');
  }
}
