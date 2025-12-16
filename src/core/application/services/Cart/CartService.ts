import type { ICartGateway } from "../../../domain/gateways/cart/ICartGateway";
import type { AddToCartDto } from "../../dtos/cart/AddToCart.dto";
import type { Response } from "../../../../shared/types/api";
import type { RemoveFromCartDto } from "../../dtos/cart/RemoveFromCart.dto";
import type { GetCartsByUserIdDto } from "../../dtos/cart/GetCartsByUserId.dto";

export class CartService {
    private readonly cartGateway: ICartGateway;

    constructor(cartGateway: ICartGateway) {
        this.cartGateway = cartGateway;
    }

    async addToCart(addToCartDto: AddToCartDto): Promise<Response<number>> {
        return await this.cartGateway.addToCart(addToCartDto); 
    }

    async removeFromCart(cartItem: RemoveFromCartDto): Promise<Response<boolean>> {
        return await this.cartGateway.removeFromCart(cartItem);
    }

    async getCartsByUserId(userId: number): Promise<Response<GetCartsByUserIdDto[]>> {
        return await this.cartGateway.getCartsByUserId(userId);
    }


}
    
