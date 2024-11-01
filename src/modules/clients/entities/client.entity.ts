import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false, unique: true })
  email: string;

  @Column({ type: 'text', nullable: false })
  phone: string;

  @Column({ type: 'int', nullable: false })
  age: number;

  @OneToMany(() => Order, (order) => order.client)
  orders: Order[];

  @ManyToMany(() => Restaurant, (restaurant) => restaurant.clients)
  restaurants: Restaurant[];
}
