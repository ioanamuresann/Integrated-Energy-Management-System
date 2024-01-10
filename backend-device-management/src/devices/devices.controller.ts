import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dtos/create-device.dto';
import { Device } from './device.entity';
import { AdminGuard } from 'src/shared/admin.guard';

@Controller('devices')
export class DevicesController {

    constructor(private deviceService: DevicesService){}

    @UseGuards(AdminGuard)
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
    
    @UseGuards(AdminGuard)
    @Delete(':id')
    deleteUser(@Param() params) {
        return this.deviceService.deleteDevice(params.id);
    }
    
    @UseGuards(AdminGuard)
    @Post('associate-user/:userId/:deviceId')
    associateUserWithDevice(@Param('userId') userId: string, @Param('deviceId') deviceId: string): Promise<boolean> {
        return this.deviceService.associateUserWithDevice(userId, deviceId);
    }
   
    @UseGuards(AdminGuard)
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

    @UseGuards(AdminGuard)
    @Patch(':id')
    updateDevice(@Param('id') id: string, @Body() updateDeviceDto: CreateDeviceDto): Promise<Device> {
        return this.deviceService.updateDevice(id, updateDeviceDto);
    }
    
    
}
