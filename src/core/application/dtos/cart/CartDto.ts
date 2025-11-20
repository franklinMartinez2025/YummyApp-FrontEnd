export interface CartItemDto {
  productId: string;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
  subtotal: number;
  specialInstructions?: string;
}

export interface CartDto {
  id: string;
  userId: string;
  restaurantId?: string;
  items: CartItemDto[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface AddCartItemDto {
  productId: string;
  quantity: number;
  specialInstructions?: string;
}

export interface UpdateCartItemDto {
  quantity: number;
  specialInstructions?: string;
}

