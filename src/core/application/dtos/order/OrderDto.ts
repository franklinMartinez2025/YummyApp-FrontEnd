export type OrderStatusDto = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'on_the_way' | 'delivered' | 'cancelled';

export interface OrderItemDto {
    quantity: number;
    product: {
        name: string;
        price?: number;
    };
    subtotal: number;
}

export interface OrderDto {
    id: number;
    restaurantName: string;
    total: number;
    status: OrderStatusDto;
    createdAt: string;
    items: OrderItemDto[];
}
