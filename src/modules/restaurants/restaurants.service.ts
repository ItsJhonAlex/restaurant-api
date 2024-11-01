import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../clients/entities/client.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    if (createRestaurantDto.capacity < 0) {
      throw new BadRequestException('La capacidad no puede ser negativa');
    }

    const restaurant = this.restaurantRepository.create(createRestaurantDto);
    return await this.restaurantRepository.save(restaurant);
  }

  async findAll(): Promise<Restaurant[]> {
    return await this.restaurantRepository.find({
      relations: ['clients', 'orders'],
    });
  }

  async findOne(id: number): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id },
      relations: ['clients', 'orders'],
    });

    if (!restaurant) {
      throw new NotFoundException(`Restaurante con ID ${id} no encontrado`);
    }

    return restaurant;
  }

  async update(
    id: number,
    updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    const restaurant = await this.findOne(id);

    if (
      updateRestaurantDto.capacity !== undefined &&
      updateRestaurantDto.capacity < 0
    ) {
      throw new BadRequestException('La capacidad no puede ser negativa');
    }

    Object.assign(restaurant, updateRestaurantDto);
    return await this.restaurantRepository.save(restaurant);
  }

  async remove(id: number): Promise<void> {
    const restaurant = await this.findOne(id);
    await this.restaurantRepository.remove(restaurant);
  }

  async addClient(restaurantId: number, clientId: number): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: restaurantId },
      relations: ['clients'],
    });

    if (!restaurant) {
      throw new NotFoundException(
        `Restaurante con ID ${restaurantId} no encontrado`,
      );
    }

    const client = await this.clientRepository.findOne({
      where: { id: clientId },
    });

    if (!client) {
      throw new NotFoundException(`Cliente con ID ${clientId} no encontrado`);
    }

    if (restaurant.clients.length >= restaurant.capacity) {
      throw new BadRequestException(
        'El restaurante está en su capacidad máxima',
      );
    }

    const clientExists = restaurant.clients.some((c) => c.id === clientId);
    if (clientExists) {
      throw new BadRequestException(
        'El cliente ya está registrado en este restaurante',
      );
    }

    restaurant.clients.push(client);
    return await this.restaurantRepository.save(restaurant);
  }

  async removeClient(
    restaurantId: number,
    clientId: number,
  ): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: restaurantId },
      relations: ['clients'],
    });

    if (!restaurant) {
      throw new NotFoundException(
        `Restaurante con ID ${restaurantId} no encontrado`,
      );
    }

    restaurant.clients = restaurant.clients.filter(
      (client) => client.id !== clientId,
    );
    return await this.restaurantRepository.save(restaurant);
  }
}
