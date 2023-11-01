import { HttpServer, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './device.entity';
import { Repository } from 'typeorm';
import { CreateDeviceDto } from './dtos/create-device.dto';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/users/user.entity';
import { Http2Server } from 'http2';

@Injectable()
export class DevicesService {

    constructor(
        @InjectRepository(Device)
        private deviceRepository: Repository<Device>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async createDevice(createDeviceDto: CreateDeviceDto): Promise<Device> {
        const device = new Device();
        device.id = uuidv4();
        device.name = createDeviceDto.name;
        device.description = createDeviceDto.description;
        device.address = createDeviceDto.address;
        device.maximumHourlyEnergyConsumption = createDeviceDto.maximumHourlyEnergyConsumption;
        device.imageUrl = createDeviceDto.imageUrl;

        try {
            const newDevice = await this.deviceRepository.save(device);
            return newDevice;
        } catch (error) {
            throw new Error(`Failed to create a new device: ${error.message}`);
        }
    }


    async getDevice(id: string): Promise<Device[]> {
        return await this.deviceRepository.find({
            select: [ "id", "name", "description", "address", "maximumHourlyEnergyConsumption", "imageUrl", "user"],
            where: [{ "id": id }]
        });
    }

    async getDevices(): Promise<Device[]> {
        const devices = await this.deviceRepository
          .createQueryBuilder('device')
          .leftJoinAndSelect('device.user', 'user')
          .getMany();
      
        return devices;
    }
      
    async deleteDevice(device: Device) {
        this.deviceRepository.delete(device);
    }

    async associateUserWithDevice(userId: string, deviceId: string): Promise<boolean> {
        const device = await this.getDevice(deviceId);

        if (!device) {
            throw new Error('Device not found');
        }

        const user = new User();
        user.user_id = userId;

        await this.userRepository.save(user);
        
        if (device[0].user.user_id === undefined) {
            device[0].user = user;
        }
        else {
            throw new Error('Device is already associated with a user');
        }
        device[0].id = deviceId;

        try {
            await this.deviceRepository.save(device[0]);
            return true;
        } catch (error) {
            throw new Error(`Failed to associate user with device: ${error.message}`);
        }

    }

    async disconnectDeviceFromUser(deviceId: string): Promise<boolean> {

        const device = await this.deviceRepository
            .createQueryBuilder('device')
            .leftJoinAndSelect('device.user', 'user')
            .where('device.id = :id', { id: deviceId })
            .getOne();

        if (!device) {
            throw new Error('Device not found');
        }

        if (device.user === null) {
            throw new Error('Device is not associated with a user');
        }
        
        device.user = null;

        try {
            await this.deviceRepository.save(device);
            return true;
        } catch (error) {
            throw new Error(`Failed to disconnect device from user: ${error.message}`);
        }

    }

    async getDevicesByClientId(clientId: string): Promise<Device[]> {
        const devices = await this.deviceRepository
            .createQueryBuilder('device')
            .innerJoin('device.user', 'user')
            .where('user.user_id = :clientId', { clientId })
            .getMany();
        
        return devices;
    }

    async clearUserAssociation(userId: string): Promise<void> {
        const devices = await this.deviceRepository
            .createQueryBuilder('device')
            .where('device.user.user_id = :userId', { userId })
            .getMany();
    
        for (const device of devices) {
            device.user = null;
            await this.deviceRepository.save(device);
        }
    }
    
    


}
