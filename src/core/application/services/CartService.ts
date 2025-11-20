import type { ICartGateway } from '../../domain/gateways/ICartGateway';
import type { CartDto, AddCartItemDto, UpdateCartItemDto } from '../dtos/cart/CartDto';

export class CartService {
  private cartGateway: ICartGateway;

  constructor(cartGateway: ICartGateway) {
    this.cartGateway = cartGateway;
  }

  async getCart(): Promise<CartDto | null> {
    return await this.cartGateway.getCart();
  }

  async createCart(): Promise<CartDto> {
    return await this.cartGateway.createCart();
  }

  async addItemToCart(item: AddCartItemDto): Promise<CartDto> {
    return await this.cartGateway.addItemToCart(item);
  }

  async updateCartItem(productId: string, item: UpdateCartItemDto): Promise<CartDto> {
    return await this.cartGateway.updateCartItem(productId, item);
  }

  async removeItemFromCart(productId: string): Promise<CartDto> {
    return await this.cartGateway.removeItemFromCart(productId);
  }

  async clearCart(): Promise<CartDto> {
    return await this.cartGateway.clearCart();
  }

  async deleteCart(): Promise<void> {
    return await this.cartGateway.deleteCart();
  }
}
