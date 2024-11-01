import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateRestaurantDto {
  @ApiProperty({ description: 'Nombre del restaurante' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Dirección del restaurante' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ description: 'Capacidad del restaurante' })
  @IsNotEmpty()
  @Min(0, { message: 'La capacidad no puede ser negativa' })
  capacity: number;
}
