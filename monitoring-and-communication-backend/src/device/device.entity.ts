import { Measurement } from 'src/measurement/measurement.entity';
import { Entity, OneToMany, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Device {
  @PrimaryColumn('uuid')
  device_id: string;

  @Column()
  maximumHourlyEnergyConsumption: number;

  @Column({ nullable: true }) 
  user_id: string;

  @OneToMany(() => Measurement, measurement => measurement.device)
  measurements: Measurement[];
}
