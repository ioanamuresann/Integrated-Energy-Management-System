import { Controller, Get, Param } from '@nestjs/common';
import { Measurement } from './measurement.entity';
import { MeasurementService } from './measurement.service';

@Controller('measurement')
export class MeasurementController {
    
    constructor(private measurementService: MeasurementService) {}
    
    @Get('historical-energy/:userId/:day')
    async getHistoricalEnergyConsumption(
        @Param('userId') userId: string,
        @Param('day') day: string,
    ): Promise<Measurement[]> {
        const historicalData = await this.measurementService.getHistoricalEnergyConsumption(
            userId,
            new Date(day),
        );
        return historicalData;
    }
}
