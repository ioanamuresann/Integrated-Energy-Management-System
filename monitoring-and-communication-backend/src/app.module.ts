import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeasurementModule } from './measurement/measurement.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './device/device.entity';
import { Measurement } from './measurement/measurement.entity';

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
      synchronize: false
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
