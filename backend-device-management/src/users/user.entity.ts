
import { Device } from "src/devices/device.entity";
import {Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @OneToMany(() => Device, device => device.user)
    devices: Device[];
}