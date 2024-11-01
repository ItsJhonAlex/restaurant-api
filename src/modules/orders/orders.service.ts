import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientsService } from '../clients/clients.service';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly clientsService: ClientsService,
    private readonly restaurantsService: RestaurantsService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const client = await this.clientsService.findOne(createOrderDto.clientId);
    const restaurant = await this.restaurantsService.findOne(
      createOrderDto.restaurantId,
    );

    try {
      await this.restaurantsService.addClient(restaurant.id, client.id);
    } catch (error) {
      if (!error.message.includes('ya está registrado')) {
        throw error;
      }
    }

    const order = this.orderRepository.create({
      description: createOrderDto.description,
      client,
      restaurant,
    });

    return await this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: ['client', 'restaurant'],
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['client', 'restaurant'],
    });

    if (!order) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);

    if (updateOrderDto.clientId) {
      order.client = await this.clientsService.findOne(updateOrderDto.clientId);
    }

    if (updateOrderDto.restaurantId) {
      order.restaurant = await this.restaurantsService.findOne(
        updateOrderDto.restaurantId,
      );
    }

    if (updateOrderDto.description) {
      order.description = updateOrderDto.description;
    }

    return await this.orderRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }
}
