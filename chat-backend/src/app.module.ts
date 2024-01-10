import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './shared/constants';
import { SharedKeyJwtMiddleware } from './shared/shared-key-jwt.middleware';

@Module({
  imports: [ChatModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 3600 },
    }),],
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