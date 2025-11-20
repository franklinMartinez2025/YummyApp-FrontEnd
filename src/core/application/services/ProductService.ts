import type { IProductGateway } from '../../domain/gateways/IProductGateway';
import type { ProductDto } from '../dtos/order/ProductDto';
 
export class ProductService {
  private productGateway: IProductGateway;

  constructor(productGateway: IProductGateway) {
    this.productGateway = productGateway;
  }

  async getProductsByRestaurant(restaurantId: string): Promise<ProductDto[]> {
    return await this.productGateway.getProductsByRestaurant(restaurantId);
  }

  async getProductById(id: string): Promise<ProductDto | null> {
    return await this.productGateway.getProductById(id);
  }

  async getProductsByCategory(restaurantId: string, category: string): Promise<ProductDto[]> {
    return await this.productGateway.getProductsByCategory(restaurantId, category);
  }
}
