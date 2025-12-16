export interface CreateOrderDto {
  userId: number;
  cartId: number;
  deliveryAddress: string;
  items: CreateOrderItemDto[];
}

export interface CreateOrderItemDto {
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
  note?: string;
}