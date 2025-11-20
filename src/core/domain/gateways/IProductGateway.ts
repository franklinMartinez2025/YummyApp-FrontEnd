import type { ProductDto } from '../../application/dtos/order/ProductDto';

export interface IProductGateway {

  getProductsByRestaurant(restaurantId: string): Promise<ProductDto[]>;

  getProductById(id: string): Promise<ProductDto | null>;

  getProductsByCategory(restaurantId: string, category: string): Promise<ProductDto[]>;
}

