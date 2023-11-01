import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { Device } from './device.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Device,User])],
  providers: [DevicesService],
  controllers: [DevicesController]
})
export class DevicesModule {}
