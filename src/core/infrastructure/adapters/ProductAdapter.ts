import type { IProductGateway } from '../../domain/gateways/IProductGateway';
import type { ProductDto } from '../../application/dtos/order/ProductDto';
import { apiClient } from '../api/apiClient';

export class ProductAdapter implements IProductGateway {
  async getProductsByRestaurant(restaurantId: string): Promise<ProductDto[]> {
    try {
      return await apiClient.get<ProductDto[]>(`/restaurants/${restaurantId}/products`);
    } catch (error) {
      console.error('Error fetching products by restaurant:', error);
      return [];
    }
  }

  async getProductById(id: string): Promise<ProductDto | null> {
    try {
      return await apiClient.get<ProductDto>(`/products/${id}`);
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  }

  async getProductsByCategory(restaurantId: string, category: string): Promise<ProductDto[]> {
    try {
      return await apiClient.get<ProductDto[]>(
        `/restaurants/${restaurantId}/products?category=${category}`
      );
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  }
}

