import { UserDto } from "./dtos/user.dto";

export class Device {
    constructor(
      public id: string,
      public name: string,
      public description: string,
      public address: string,
      public maximumHourlyEnergyConsumption: string,
      public imageUrl: string,
      public user: UserDto
    ) { }
  }
  