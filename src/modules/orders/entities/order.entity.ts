import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from '../../clients/entities/client.entity';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'text', nullable: false })
  description: string;

  @ManyToOne(() => Client, (client) => client.orders)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;
}
