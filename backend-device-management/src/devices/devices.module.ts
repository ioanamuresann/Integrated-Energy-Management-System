import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { Device } from './device.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [TypeOrmModule.forFeature([Device,User]),
  ClientsModule.register([
    {
      name: 'DEVICE_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://lmatbgmf:dGqZpeoK1Zsdkr71F_M-mg418R_JsNGL@crow.rmq.cloudamqp.com/lmatbgmf'], 
        queue: 'device_changes',
        queueOptions: {
          durable: false,
        },
      },
    },
  ]),],
  providers: [DevicesService],
  controllers: [DevicesController]
})
export class DevicesModule {}
