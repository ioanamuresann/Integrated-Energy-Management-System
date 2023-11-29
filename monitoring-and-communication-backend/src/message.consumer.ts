import {  Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { MeasurementService } from './measurement/measurement.service';

@Controller()
export class MessageConsumer {
  private readonly logger = new Logger(MessageConsumer.name);

  constructor(private readonly measurementService: MeasurementService) {}

  @MessagePattern()
  async processMeasurement(
    @Payload() measurement: any,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    try {
      this.logger.log(`Received measurement: ${JSON.stringify(measurement)}`);
      await this.measurementService.processAndStoreMeasurement(measurement);

      // Acknowledge the message to RabbitMQ
    //  channel.ack(originalMessage);
    } catch (error) {
      // Handle the error, optionally you can reject or requeue the message
      this.logger.error(`Error processing measurement: ${error.message}`);
      channel.ack(originalMessage);
    }
  }

  @EventPattern('device_event')
  async handleDeviceEvent(@Payload() payload: any, @Ctx() context: RmqContext): Promise<void> {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    let userId = null;
    try {
     this.logger.log(`Received device event: ${JSON.stringify(payload)}`);
     const { action, device } = payload;

     if(device.user!=null){
      userId = device.user.user_id;
     }

     switch (action) {
       case 'create':
         await this.measurementService.handleDeviceCreation(device);
         break;
       case 'update':
         await this.measurementService.handleDeviceUpdate(device);
         break;
       case 'delete-device':
         await this.measurementService.handleDeviceDeletion(device);
         break;
       case 'associateUser':
         await this.measurementService.associateUserWithDevice(userId, device.id);
         break;
       case 'disconnectUser':
         await this.measurementService.disconnectDeviceFromUser(device.id);
        break;
     }
    } catch (error) {
      this.logger.error(`Error handling device event: ${error.message}`);
      channel.ack(originalMessage);
    }
  }

}

