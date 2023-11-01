import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dtos/create-device.dto';
import { Device } from './device.entity';

@Controller('devices')
export class DevicesController {

    constructor(private deviceService: DevicesService){}

    @Post('create-device')
    createDevice(@Body() createDeviceDto: CreateDeviceDto): Promise<Device> {
      return this.deviceService.createDevice(createDeviceDto);
    }

    @Get()
    getAllDevices(): Promise<Device[]> {
        return this.deviceService.getDevices();
    }

    @Get(':id')
    getDeviceById(@Param() params): Promise<Device[]> {
        return this.deviceService.getDevice(params.id);
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.deviceService.deleteDevice(params.id);
    }

    @Post('associate-user/:userId/:deviceId')
    associateUserWithDevice(@Param('userId') userId: string, @Param('deviceId') deviceId: string): Promise<boolean> {
        return this.deviceService.associateUserWithDevice(userId, deviceId);
    }
   
    @Delete('disconnect-device/:deviceId')
    disconnectDeviceFromUser(@Param('deviceId') deviceId: string): Promise<boolean> {
        return this.deviceService.disconnectDeviceFromUser(deviceId);
    }

    @Get('user-devices/:userId')
    async getUserDevices(@Param('userId') userId: string): Promise<Device[]> {
        const userDevices = await this.deviceService.getDevicesByClientId(userId);
        return userDevices; 
    }

    @Delete('clear-user-association/:userId')
    async clearUserAssociation(@Param('userId') userId: string): Promise<void> {
        await this.deviceService.clearUserAssociation(userId);
    }
    
    
}
