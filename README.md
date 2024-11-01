# Restaurant API

API REST desarrollada con NestJS para la gestión de restaurantes, clientes y órdenes.

## Descripción

Esta API permite gestionar:
- Clientes (solo mayores de edad)
- Restaurantes (con control de capacidad)
- Órdenes
- Relaciones entre clientes y restaurantes

## Tecnologías Utilizadas

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- Docker
- Swagger

## Estructura de la Base de Datos

```sql
create table clients (
    id bigint primary key generated always as identity,
    name text not null,
    email text not null unique,
    phone text not null,
    age int,
    constraint check_age check (age >= 18)
);

create table restaurants (
    id bigint primary key generated always as identity,
    name text not null,
    address text not null,
    capacity int not null,
    constraint check_capacity check (capacity >= 0)
);

create table orders (
    id bigint primary key generated always as identity,
    description text not null,
    client_id bigint references clients (id),
    restaurant_id bigint references restaurants (id)
);

create table restaurant_clients (
    id bigint primary key generated always as identity,
    client_id bigint references clients (id),
    restaurant_id bigint references restaurants (id)
);
```

## Requisitos Previos

- Node.js (v18 o superior)
- Docker y Docker Compose
- PostgreSQL (si no se usa Docker)

## Instalación

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd restaurant-api
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

## Ejecución

### Con Docker:
```bash
# Construir y levantar contenedores
docker-compose up -d --build

# Ver logs
docker-compose logs -f
```

### Sin Docker:
```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## Documentación API

La documentación de la API está disponible en Swagger:
```
http://localhost:3000/api/docs
```

### Endpoints Principales

#### Clientes
- `POST /clients` - Crear cliente
- `GET /clients` - Listar clientes
- `GET /clients/:id` - Obtener cliente
- `PATCH /clients/:id` - Actualizar cliente
- `DELETE /clients/:id` - Eliminar cliente

#### Restaurantes
- `POST /restaurants` - Crear restaurante
- `GET /restaurants` - Listar restaurantes
- `GET /restaurants/:id` - Obtener restaurante
- `PATCH /restaurants/:id` - Actualizar restaurante
- `DELETE /restaurants/:id` - Eliminar restaurante
- `POST /restaurants/:id/clients/:clientId` - Añadir cliente a restaurante

#### Órdenes
- `POST /orders` - Crear orden
- `GET /orders` - Listar órdenes
- `GET /orders/:id` - Obtener orden
- `PATCH /orders/:id` - Actualizar orden
- `DELETE /orders/:id` - Eliminar orden

## Validaciones Implementadas

- Clientes mayores de 18 años
- Email único por cliente
- Capacidad máxima por restaurante
- Verificación de existencia de cliente y restaurante en órdenes

## Tests

```bash
# Tests unitarios
npm run test

# Tests e2e
npm run test:e2e

# Cobertura
npm run test:cov
```

## Características Adicionales

- Documentación con Swagger
- Containerización con Docker
- Validaciones de datos
- Manejo de errores personalizado
- Relaciones Many-to-Many entre clientes y restaurantes
 