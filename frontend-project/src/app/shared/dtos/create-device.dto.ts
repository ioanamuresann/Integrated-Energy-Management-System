export class CreateDeviceDto {
    constructor(
      public name: string,
      public description: string,
      public address: string,
      public maximumHourlyEnergyConsumption: string,
      public imageUrl: string,
    ) {}
  }
  