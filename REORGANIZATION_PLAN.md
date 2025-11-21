# Plan de Reorganización de Módulos y Layouts

## Estructura Propuesta

### Módulos por Rol

```
src/modules/
├── admin/              # Solo administradores 
│   └── pages/
│
├── restaurant/        # Solo restaurantes
│   └── pages/
│
├── client/            # Solo clientes
│   ├── cart/
│   └── restaurants/   # Ver restaurantes (clientes)
│
└── shared/            # Compartido entre roles
    ├── auth/          # Autenticación (todos)
    ├── orders/        # Órdenes (clientes y restaurantes)
    ├── landing/       # Página pública
    └── pages/         # NotFoundPage, etc.
```

### Layouts por Rol

```
src/shared/ui/layouts/
├── admin/             # Layout para administradores
│   ├── AdminLayout.tsx
│   ├── components/
│   │   ├── AdminSidebar.tsx
│   │   └── AdminHeader.tsx
│   └── AdminLayout.css
│
├── restaurant/        # Layout para restaurantes
│   ├── RestaurantLayout.tsx
│   ├── components/
│   │   └── RestaurantSidebar.tsx
│   └── RestaurantLayout.css
│
├── client/            # Layout para clientes
│   ├── ClientLayout.tsx
│   └── ClientLayout.css
│
├── public/            # Layout público
│   ├── PublicLayout.tsx
│   ├── components/
│   │   ├── PublicHeader.tsx
│   │   └── PublicFooter.tsx
│   └── PublicLayout.css
│
└── auth/              # Layout de autenticación
    ├── AuthLayout.tsx
    └── AuthLayout.css
```

## Beneficios

1. **Separación clara por roles**: Cada módulo y layout está claramente asociado a un rol
2. **Escalabilidad**: Fácil agregar nuevos módulos o layouts
3. **Mantenibilidad**: Estructura más fácil de entender y mantener
4. **Reutilización**: Módulos compartidos claramente identificados

## Pasos de Migración

1. Crear nueva estructura de layouts
2. Mover componentes de layouts a sus nuevas ubicaciones
3. Actualizar importaciones en router
4. Mover módulos a sus nuevas ubicaciones
5. Actualizar todas las importaciones

