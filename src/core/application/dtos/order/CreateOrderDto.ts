import type { CartItemDto } from "../cart/CartItemDto";

export interface CreateOrderDto {
  items: CartItemDto[];
  totalAmount: number;
  deliveryAddress: {
    street: string;
    city: string;
    zipCode: string;
    instructions?: string;
  };
  paymentMethod: {
    type: "credit_card" | "cash";
    cardLast4?: string; // For display purposes after mock payment
  };
}
