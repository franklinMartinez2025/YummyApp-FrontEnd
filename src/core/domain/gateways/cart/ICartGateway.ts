import type { AddToCartDto } from "../../../application/dtos/cart/AddToCart.dto";
import type { Response } from "../../../../shared/types/api";
import type { RemoveFromCartDto } from "../../../application/dtos/cart/RemoveFromCart.dto";
import type { GetCartsByUserIdDto } from "../../../application/dtos/cart/GetCartsByUserId.dto";

export interface ICartGateway {
    addToCart(addToCartDto: AddToCartDto): Promise<Response<boolean>>;
    removeFromCart(cartItem: RemoveFromCartDto): Promise<Response<boolean>>;
    getCartsByUserId(userId: number): Promise<Response<GetCartsByUserIdDto[]>>;
}