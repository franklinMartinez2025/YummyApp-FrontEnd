import type { ICartGateway } from '../../domain/gateways/ICartGateway';
import type { CartDto, AddCartItemDto, UpdateCartItemDto } from '../../application/dtos/cart/CartDto';
import { apiClient } from '../api/apiClient';

export class CartAdapter implements ICartGateway {
  async getCart(): Promise<CartDto | null> {
    try {
      return await apiClient.get<CartDto>('/cart');
    } catch (error) {
      console.error('Error fetching cart:', error);
      return null;
    }
  }

  async createCart(): Promise<CartDto> {
    return await apiClient.post<CartDto>('/cart', {});
  }

  async addItemToCart(item: AddCartItemDto): Promise<CartDto> {
    return await apiClient.post<CartDto>('/cart/items', item);
  }

  async updateCartItem(productId: string, item: UpdateCartItemDto): Promise<CartDto> {
    return await apiClient.put<CartDto>(`/cart/items/${productId}`, item);
  }

  async removeItemFromCart(productId: string): Promise<CartDto> {
    return await apiClient.delete<CartDto>(`/cart/items/${productId}`);
  }

  async clearCart(): Promise<CartDto> {
    return await apiClient.delete<CartDto>('/cart/items');
  }

  async deleteCart(): Promise<void> {
    await apiClient.delete('/cart');
  }
}

