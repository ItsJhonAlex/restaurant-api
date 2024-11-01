import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ description: 'Descripción de la orden' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'ID del cliente' })
  @IsNotEmpty()
  @IsNumber()
  clientId: number;

  @ApiProperty({ description: 'ID del restaurante' })
  @IsNotEmpty()
  @IsNumber()
  restaurantId: number;
}
