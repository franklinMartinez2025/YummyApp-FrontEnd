export interface CartItemModifierDto {
  id: number;
  name: string;
  price: number;
  options: {
    id: number;
    name: string;
    price: number;
  }[];
}

export interface CartItemDto {
  productId: string;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    restaurantId?: number;
  };
  quantity: number;
  subtotal: number;
  specialInstructions?: string;
  selectedModifiers?: CartItemModifierDto[];
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
  selectedModifiers?: CartItemModifierDto[];
}

export interface UpdateCartItemDto {
  quantity: number;
  specialInstructions?: string;
}

