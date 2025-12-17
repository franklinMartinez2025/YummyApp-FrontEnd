export interface CreateOrderDto {
  userId: number;
  cartId: number;
  deliveryAddress: string;
  items: CreateOrderItemDto[];
}

export interface CreateOrderItemDto {
  productId: number;
  productName: string;
  imageUrl: string;
  restaurantId: number;
  restaurantName: string;
  unitPrice: number;
  quantity: number;
  note?: string;
}