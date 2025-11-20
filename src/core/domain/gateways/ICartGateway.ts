import type { CartDto, AddCartItemDto, UpdateCartItemDto } from '../../application/dtos/cart/CartDto';

export interface ICartGateway {

  getCart(): Promise<CartDto | null>;

  createCart(): Promise<CartDto>;

  addItemToCart(item: AddCartItemDto): Promise<CartDto>;

  updateCartItem(productId: string, item: UpdateCartItemDto): Promise<CartDto>;

  removeItemFromCart(productId: string): Promise<CartDto>;

  clearCart(): Promise<CartDto>;

  deleteCart(): Promise<void>;

  removeItemFromCart(productId: string): Promise<CartDto>;

  clearCart(): Promise<CartDto>;

  deleteCart(): Promise<void>;
}


