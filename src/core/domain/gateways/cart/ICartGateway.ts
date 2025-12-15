import type { AddToCartDto } from "../../../application/dtos/cart/AddToCart.dto";
import type { Response } from "../../../../shared/types/api";

export interface ICartGateway {
    addToCart(addToCartDto: AddToCartDto): Promise<Response<boolean>>;
}