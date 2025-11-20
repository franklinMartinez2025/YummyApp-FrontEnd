import type { CartItemDto } from '../cart/CartDto';

export type OrderStatusDto = 
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'on_the_way'
  | 'delivered'
  | 'cancelled';

export interface OrderDto {
  id: string;
  userId: string;
  restaurantId: string;
  restaurantName: string;
  items: CartItemDto[];
  status: OrderStatusDto;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  paymentMethod: string;
  estimatedDeliveryTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderDto {
  restaurantId: string;
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  paymentMethod: string;
}

