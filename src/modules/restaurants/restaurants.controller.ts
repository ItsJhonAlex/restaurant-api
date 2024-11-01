import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantsService } from './restaurants.service';

@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo restaurante' })
  @ApiResponse({ status: 201, description: 'Restaurante creado exitosamente' })
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los restaurantes' })
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un restaurante por ID' })
  findOne(@Param('id') id: string) {
    return this.restaurantsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un restaurante' })
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantsService.update(+id, updateRestaurantDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un restaurante' })
  remove(@Param('id') id: string) {
    return this.restaurantsService.remove(+id);
  }

  @Post(':id/clients/:clientId')
  @ApiOperation({ summary: 'Añadir un cliente al restaurante' })
  @ApiResponse({
    status: 200,
    description: 'Cliente añadido exitosamente al restaurante',
  })
  @ApiResponse({
    status: 400,
    description: 'Capacidad máxima alcanzada o cliente ya registrado',
  })
  addClient(@Param('id') id: string, @Param('clientId') clientId: string) {
    return this.restaurantsService.addClient(+id, +clientId);
  }

  @Delete(':id/clients/:clientId')
  @ApiOperation({ summary: 'Remover un cliente del restaurante' })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeClient(@Param('id') id: string, @Param('clientId') clientId: string) {
    return this.restaurantsService.removeClient(+id, +clientId);
  }
}
