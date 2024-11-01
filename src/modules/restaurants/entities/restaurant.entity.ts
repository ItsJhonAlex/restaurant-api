import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from '../../clients/entities/client.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity('restaurants')
export class Restaurant {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  address: string;

  @Column({ type: 'int', nullable: false })
  capacity: number;

  @OneToMany(() => Order, (order) => order.restaurant)
  orders: Order[];

  @ManyToMany(() => Client, (client) => client.restaurants)
  @JoinTable({
    name: 'restaurant_clients',
    joinColumn: {
      name: 'restaurant_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'client_id',
      referencedColumnName: 'id',
    },
  })
  clients: Client[];
}
