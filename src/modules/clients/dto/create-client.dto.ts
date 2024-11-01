import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ description: 'Nombre del cliente' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email del cliente' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Teléfono del cliente' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ description: 'Edad del cliente' })
  @IsNotEmpty()
  @Min(18, { message: 'El cliente debe ser mayor de edad' })
  age: number;
}
