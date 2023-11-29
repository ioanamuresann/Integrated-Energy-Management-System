import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from 'src/device/device.entity';
import { Measurement } from './measurement.entity';
import { MeasurementService } from './measurement.service';
import { MessageConsumer } from '../message.consumer';
import { MessageGateway } from 'src/message.gateway';
import { MeasurementController } from './measurement.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Device,Measurement])],
    controllers: [MessageConsumer, MeasurementController],
    providers: [MeasurementService, MessageGateway]
})
export class MeasurementModule {}