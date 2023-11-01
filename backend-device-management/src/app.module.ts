import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevicesModule } from './devices/devices.module';
import { Device } from './devices/device.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
