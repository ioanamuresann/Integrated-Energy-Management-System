import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeasurementModule } from './measurement/measurement.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './device/device.entity';
import { Measurement } from './measurement/measurement.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './shared/constants';
import { SharedKeyJwtMiddleware } from './shared/shared-key-jwt.middleware';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [MeasurementModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'dbmonitoring',
      port: 3306,
      username: 'root',
      password: 'root123',
      database: 'monitoring',
      entities: [Device,Measurement],
      synchronize: true
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 3600 },
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SharedKeyJwtMiddleware).forRoutes('*');
    // Add the middleware for WebSocket route
    consumer.apply(SharedKeyJwtMiddleware).forRoutes({ path: '/socket.io/*', method: RequestMethod.ALL });
  }
}
