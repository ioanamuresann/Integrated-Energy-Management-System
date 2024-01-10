import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const rmqConfigQueue1: MicroserviceOptions = {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://lmatbgmf:dGqZpeoK1Zsdkr71F_M-mg418R_JsNGL@crow.rmq.cloudamqp.com/lmatbgmf'],
      queue: 'smart_meter_data',
    },
  };

  const rmqConfigQueue2: MicroserviceOptions = {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://lmatbgmf:dGqZpeoK1Zsdkr71F_M-mg418R_JsNGL@crow.rmq.cloudamqp.com/lmatbgmf'],
      queue: 'device_changes'
    },
  };

  app.connectMicroservice(rmqConfigQueue1);
  app.connectMicroservice(rmqConfigQueue2);

  // Start all microservices
  await app.startAllMicroservices();
  await app.listen(3002);
}

bootstrap();
