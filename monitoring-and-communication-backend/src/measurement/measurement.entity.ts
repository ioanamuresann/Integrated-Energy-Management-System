import { Device } from 'src/device/device.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';


@Entity()
export class Measurement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  timestamp: Date;

  @Column('float')
  measurement_value: number;

  @ManyToOne(() => Device, device => device.measurements)
  @JoinColumn({ name: 'device_id' })
  device: Device;
}
