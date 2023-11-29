import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Measurement } from './measurement.entity';
import { Device } from 'src/device/device.entity';
import { MessageGateway } from 'src/message.gateway';


@Injectable()
export class MeasurementService {
  constructor(
    @InjectRepository(Measurement)
    private readonly measurementRepository: Repository<Measurement>,
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
    private readonly messageGateway: MessageGateway,
  ) { }

  async processAndStoreMeasurement(measurementData: any): Promise<void> {
    try {
      console.log('Received measurement:', measurementData);
      const timestamp = new Date(measurementData.timestamp);
      const newMeasurement = this.measurementRepository.create({
        timestamp,
        measurement_value: measurementData.measurement_value,
      });

      let device = await this.findDevice(measurementData.device_id);
      newMeasurement.device = device;

      //websockets
      const MAXIMUM_LIMIT = device.maximumHourlyEnergyConsumption;
      const userId = device.user_id;
      if (measurementData.measurement_value >= MAXIMUM_LIMIT) {
        this.messageGateway.handleSendMessage(userId);
      }

      await this.measurementRepository.save(newMeasurement);
    } catch (error) {
      console.error('Error processing measurement:', error.message);
    }

  }

  private async findDevice(deviceId: string): Promise<Device> {
    let device = await this.deviceRepository.findOne({ where: { device_id: deviceId } });
    if (!device) {
      throw new Error('Device not found');
    }
    return device;
  }

  async handleDeviceCreation(deviceData: any): Promise<void> {
    console.log('Received device creation event:', deviceData);
    const newDevice = this.deviceRepository.create({
      device_id: deviceData.id,
      maximumHourlyEnergyConsumption: deviceData.maximumHourlyEnergyConsumption,
    });
    await this.deviceRepository.save(newDevice);
  }

  async handleDeviceUpdate(deviceData: any): Promise<void> {
    console.log('Received device update event:', deviceData);
    const { device_id, maximumHourlyEnergyConsumption } = deviceData;
    const device = await this.deviceRepository.findOne({ where: { device_id } });
    device.maximumHourlyEnergyConsumption = maximumHourlyEnergyConsumption;
    await this.deviceRepository.save(device);
  }

  async handleDeviceDeletion(deviceData: any): Promise<void> {
    console.log('Received device deletion event:', deviceData);
    const { device_id } = deviceData;
    const device = await this.deviceRepository.findOne({ where: { device_id } });
    await this.deviceRepository.remove(device);
  }

  async associateUserWithDevice(userId: string, deviceId: string): Promise<void> {
    console.log('Received device association event:', { userId, deviceId });
    const device = await this.findDevice(deviceId);
    device.user_id = userId;
    await this.deviceRepository.save(device);
  }

  async disconnectDeviceFromUser(deviceId: string): Promise<void> {
    console.log('Received device disconnection event: deviceId = ', deviceId);
    const device = await this.findDevice(deviceId);
    device.user_id = null;
    await this.deviceRepository.save(device);
  }


  async getHistoricalEnergyConsumption(userId: string, day: Date): Promise<Measurement[]> {
    const startOfDay = new Date(day);
    startOfDay.setUTCHours(0, 0, 0, 0);
  
    const endOfDay = new Date(day);
    endOfDay.setUTCHours(23, 59, 59, 999);
  
    return this.measurementRepository.find({
      where: {
        device: {
          user_id: userId,
        },
        timestamp: Between(startOfDay, endOfDay), 
      },
    });
  }


}
