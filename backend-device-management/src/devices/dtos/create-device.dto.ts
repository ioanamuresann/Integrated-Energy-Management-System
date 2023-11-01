import { User } from "src/users/user.entity";

export class CreateDeviceDto {
    name: string;
    description: string;
    address: string;
    maximumHourlyEnergyConsumption: string;
    imageUrl: string;
    user?: User;
}