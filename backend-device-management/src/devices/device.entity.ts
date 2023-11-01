import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Device {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    address: string;

    @Column()
    maximumHourlyEnergyConsumption: string;

    @Column()
    imageUrl: string;
   
    // @ManyToOne(() => User, user => user.devices)
    // @JoinColumn({ name: "user_id" })
    // user: User = new User();

    
    @ManyToOne(() => User,user => user.devices)
    @JoinColumn({ name: "user_id" })
    user: User = new User();

}