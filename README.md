# YummyApp 🍔

Aplicación de pedidos de comida en línea similar a Rappi, construida con React, TypeScript y Clean Architecture.

## 🏗️ Arquitectura

Este proyecto implementa una **arquitectura modular combinada con Clean Architecture**, diseñada específicamente para una aplicación frontend que consume APIs REST. La arquitectura está centrada en **DTOs (Data Transfer Objects)** y utiliza **Gateways y Adapters** para consumir los endpoints que expone el backend a través de sus controladores.

### Características Principales

- ✅ **DTOs en lugar de Entidades**: El frontend solo maneja DTOs que representan los datos del backend
- ✅ **Gateways como Contratos**: Interfaces que definen qué endpoints están disponibles
- ✅ **Adapters como Implementaciones**: Implementaciones HTTP que consumen los endpoints del controlador
- ✅ **Clean Architecture**: Separación clara en capas (Domain, Application, Infrastructure, Presentation)
- ✅ **Arquitectura Modular**: Features organizados por módulos independientes
- ✅ **Layouts Flexibles**: Sistema adaptable para páginas públicas, privadas, auth y admin
- ✅ **TypeScript**: Tipado fuerte en toda la aplicación

## 📐 Estructura del Proyecto

```
src/
├── core/                    # Núcleo (Clean Architecture)
│   ├── domain/              # Capa de dominio
│   │   ├── dtos/            # DTOs (Data Transfer Objects)
│   │   ├── gateways/        # Gateways (Contratos de endpoints)
│   │   └── use-cases/       # Casos de uso del negocio
│   ├── application/         # Capa de aplicación
│   │   └── services/        # Servicios que orquestan casos de uso
│   └── infrastructure/      # Capa de infraestructura
│       ├── api/             # Cliente HTTP
│       └── adapters/        # Adapters (Implementaciones HTTP)
│
├── features/                # Módulos por feature
│   ├── auth/                # Módulo de autenticación
│   ├── restaurants/         # Módulo de restaurantes
│   ├── cart/                # Módulo de carrito
│   ├── orders/              # Módulo de órdenes
│   └── shared/              # Componentes compartidos entre features
│
├── shared/                  # Recursos compartidos globalmente
│   ├── components/          # Componentes reutilizables
│   ├── hooks/               # Hooks compartidos
│   ├── utils/               # Utilidades
│   └── types/               # Tipos TypeScript compartidos
│
└── layouts/                 # Sistema de layouts flexible
    ├── BaseLayout/          # Layout base configurable
    ├── PublicLayout/         # Layout para páginas públicas
    ├── PrivateLayout/        # Layout para páginas privadas
    ├── AuthLayout/           # Layout para autenticación
    └── AdminLayout/          # Layout para administración
```

## 🎯 Principios de la Arquitectura

### DTOs vs Entidades

- **DTOs**: Interfaces TypeScript que representan los datos que vienen del backend
- **Entidades**: Se gestionan en el backend, no en el frontend
- **Ventaja**: Separación clara de responsabilidades, el frontend solo maneja datos

### Gateways (Contratos)

Los gateways son **interfaces** que definen qué endpoints están disponibles en el backend:

```typescript
export interface IUserGateway {
  /**
   * GET /api/users/:id
   * Obtiene un usuario por su ID
   */
  getUserById(id: string): Promise<UserDto | null>;
}
```

### Adapters (Implementaciones)

Los adapters **implementan** los gateways y hacen las llamadas HTTP:

```typescript
export class UserAdapter implements IUserGateway {
  async getUserById(id: string): Promise<UserDto | null> {
    return await apiClient.get<UserDto>(`/users/${id}`);
  }
}
```

### Capas de Clean Architecture

1. **Domain (Dominio)**
   - DTOs que representan los datos del backend
   - Gateways (contratos de endpoints)
   - Casos de uso (validaciones del frontend)
   - Sin dependencias externas

2. **Application (Aplicación)**
   - Servicios que orquestan casos de uso
   - Coordinan entre dominio e infraestructura

3. **Infrastructure (Infraestructura)**
   - Adapters que implementan los gateways
   - Cliente HTTP para comunicación con APIs

4. **Presentation (Presentación)**
   - Componentes React
   - Hooks personalizados
   - Páginas

## 🎨 Sistema de Layouts

El proyecto incluye un sistema flexible de layouts:

- **PublicLayout**: Para páginas públicas (sin autenticación)
- **PrivateLayout**: Para páginas privadas (requieren autenticación)
- **AuthLayout**: Para páginas de autenticación (login, registro)
- **AdminLayout**: Para páginas de administración

Cada layout es configurable y puede incluir/ocultar header, footer y sidebar según necesidad.

## 📦 Módulos Implementados

### ✅ Auth (Autenticación)
- LoginForm component
- useAuth hook
- LoginPage

### ✅ Restaurants (Restaurantes)
- RestaurantCard component
- useRestaurants hook
- RestaurantsPage

### ✅ Cart (Carrito)
- CartItem component
- CartPage

### ✅ Orders (Órdenes)
- OrdersPage

## 🧩 Componentes Compartidos

- **Button**: Botón reutilizable con variantes
- **Card**: Tarjeta contenedora
- **LoadingSpinner**: Indicador de carga

## 🔄 Flujo de Datos

```
Componente React
    ↓
Hook Personalizado
    ↓
Servicio de Aplicación
    ↓
Caso de Uso (Validaciones)
    ↓
Gateway Interface (Contrato)
    ↓
Adapter Implementación (HTTP)
    ↓
API Client
    ↓
Backend Controller (Endpoint REST)
    ↓
DTOs retornados
```

## 🛠️ Tecnologías

- React 19
- TypeScript
- Vite
- CSS Modules (por componente)

## 🚀 Scripts

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview

# Lint
npm run lint
```

## 📚 Documentación

- **[ARCHITECTURE.md](./ARCHITECTURE.md)**: Documentación completa de la arquitectura
- Incluye ejemplos de uso, flujos de datos y guías para agregar nuevas features

## 📝 Próximos Pasos

- [ ] Implementar React Router para navegación
- [ ] Agregar estado global (Context API o Zustand)
- [ ] Implementar tests unitarios
- [ ] Agregar validación de formularios más robusta
- [ ] Implementar manejo de errores global
- [ ] Agregar más features (búsqueda, filtros, etc.)

## 📋 Convenciones

- Cada módulo es independiente y autocontenido
- Los componentes se organizan por feature
- Los DTOs se definen en `/core/domain/dtos/`
- Los gateways (contratos) se definen en `/core/domain/gateways/`
- Los adapters (implementaciones) se definen en `/core/infrastructure/adapters/`
- Los hooks personalizados encapsulan lógica reutilizable
- Las utilidades son funciones puras sin dependencias
- Los layouts son flexibles y configurables

## 🎓 Conceptos Clave

### Gateway Pattern
Los gateways definen contratos de qué endpoints están disponibles. Son interfaces que documentan los endpoints del controlador del backend.

### Adapter Pattern
Los adapters implementan los gateways y hacen las llamadas HTTP reales a los endpoints. Cada adapter consume un controlador específico del backend.

### DTO Pattern
Los DTOs representan los datos que vienen del backend. No contienen lógica de negocio, solo estructura de datos.

## 🔗 Relación con el Backend

El frontend consume los endpoints que expone el backend a través de sus controladores:

- **Controlador de Usuario** → `IUserGateway` → `UserAdapter`
- **Controlador de Autenticación** → `IAuthGateway` → `AuthAdapter`
- **Controlador de Restaurantes** → `IRestaurantGateway` → `RestaurantAdapter`

Cada controlador del backend expone endpoints REST, y el frontend los consume a través de adapters que implementan gateways.
