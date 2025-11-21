import type { ProductDto } from "../../restaurant/ProductDto";

export interface CartItemDto {
  product: ProductDto;
  quantity: number;
  options?: {
    name: string;
    selected: string;
    price: number;
  }[];
}
