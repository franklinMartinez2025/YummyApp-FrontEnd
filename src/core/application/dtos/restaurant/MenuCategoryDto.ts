import type { ProductDto } from "./ProductDto";

export interface MenuCategoryDto {
  id: string;
  name: string;
  products: ProductDto[];
}
