export interface GetMyOrderDto {
  orderId: number;
  status: string;
  totalAmount: number;
  deliveryAddress: string;
  createdAt: string;
  items: GetMyOrderItemDto[];
}

export interface GetMyOrderItemDto {
  productId: number;
  productName: string;
  imageUrl?: string;
  restaurantId: number;
  restaurantName: string;
  unitPrice: number;
  quantity: number;
  note?: string;
}
