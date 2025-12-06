# Documentación de Módulos - YummyApp (v2.0)

Este documento detalla la estructura de módulos de la aplicación, incluyendo las recientes actualizaciones y mejoras implementadas para optimizar la experiencia de usuario y la gestión operativa.

## 1. Visión General de Roles

La aplicación maneja 4 roles principales, cada uno con su propio conjunto de módulos y funcionalidades:

1.  **Cliente**: Usuario final que explora restaurantes, realiza pedidos y rastrea su estado en tiempo real.
2.  **Administrador General (Admin)**: Dueño del sistema, gestiona restaurantes, usuarios y finanzas globales.
3.  **Restaurante**: Dueño de un local, gestiona su catálogo unificado con extras, pedidos y repartidores.
4.  **Repartidor**: Encargado de la entrega de pedidos de un restaurante específico.

---

## 2. Detalle de Módulos Innovadores

### 👤 Módulo Cliente (Actualizado)
**Directorio**: `src/modules/client`

Ahora cuenta con herramientas avanzadas para la fidelización y seguimiento.

*   **Restaurantes (`/restaurants`)**: Catálogo visual con filtros y búsqueda.
*   **Pedidos (`/orders`)** ✨ *[NUEVO]*:
    *   **Funcionalidad "Mis Pedidos"**: Panel centralizado donde el cliente ve el historial de sus compras pasadas y el estado de las actuales.
    *   **Rastreo en Tiempo Real**: Línea de tiempo animada que muestra el progreso del pedido (Recibido -> Cocina -> Camino -> Entregado).
    *   **Diseño**: Interfaz moderna con animaciones y transiciones suaves.

### 🍽️ Módulo Restaurante (Actualizado)
**Directorio**: `src/modules/restaurant`

Gestión operativa simplificada y potente.

*   **Gestión de Menú Unificada (`/menus`)** ✨ *[MEJORADO]*:
    *   Se ha centralizado la gestión de todos los productos (Comidas, Bebidas, Postres) en una sola interfaz potente.
    *   **Gestión de Extras**: Ahora es posible configurar grupos de modificadores para cada plato (ej. "Elige tu salsa", "Toppings extra") con precios adicionales, directamente desde el modal de creación/edición.
    *   **Reducción de Redundancia**: Elimina la necesidad de navegar por múltiples páginas para gestionar diferentes tipos de items.
*   **Dashboard (`/dashboard`)**: Métricas en tiempo real.
*   **Pedidos (`/orders`)**: Bandeja de entrada para cocina.
*   **Conductores (`/drivers`)**: Gestión de flota propia.

### 🏢 Módulo Admin y 🛵 Delivery
Mantiene sus funcionalidades core robustas:
*   **Admin**: Control total de finanzas, usuarios y reportes.
*   **Delivery**: Interfaz simplificada "Mobile-First" para entregas rápidas.

---

## 3. Estado de Mejoras Implementadas

| Característica | Estado Anterior | Estado Actual |
| :--- | :--- | :--- |
| **Historial de Pedidos (Cliente)** | Inexistente. El usuario perdía rastro tras pagar. | **Implementado**. Página dedicada con tabs (Activos/Historial) y tracking visual. |
| **Gestión de Extras (Restaurante)** | No existía opción para añadir modificadores. | **Implementado**. Modal avanzado que permite crear grupos de extras (obligatorios/opcionales) y opciones con precio. |
| **Estructura de Menú** | Dispersa en múltiples páginas (Foods/Drinks/etc). | **Unificada**. Una sola vista "Gestión de Menú" filtra por categorías y gestiona todo el catálogo, mejorando la UX del dueño. |
| **Estética y UX** | Funcional pero básica. | **Premium**. Se añadieron animaciones (`animate-fade-in-up`), efectos hover, glassmorphism y feedback visual de estados. |

---
*Generado por Asistente de Desarrollo YummyApp - Actualizado 2025*
