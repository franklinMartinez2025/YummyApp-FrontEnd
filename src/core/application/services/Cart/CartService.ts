import type { ICartGateway } from "../../../domain/gateways/cart/ICartGateway";
import type { AddToCartDto } from "../../dtos/cart/AddToCart.dto";
import type { Response } from "../../../../shared/types/api";
import type { RemoveFromCartDto } from "../../dtos/cart/RemoveFromCart.dto";

export class CartService {
    private readonly cartGateway: ICartGateway;

    constructor(cartGateway: ICartGateway) {
        this.cartGateway = cartGateway;
    }

    async addToCart(addToCartDto: AddToCartDto): Promise<Response<boolean>> {
        return await this.cartGateway.addToCart(addToCartDto); 
    }

    async removeFromCart(cartItem: RemoveFromCartDto): Promise<Response<boolean>> {
        return await this.cartGateway.removeFromCart(cartItem);
    }
}
    
