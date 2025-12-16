import type { AddToCartDto } from "../../../application/dtos/cart/AddToCart.dto";
import type { Response } from "../../../../shared/types/api";
import { apiClient } from "../../api/apiClient";
import { API_SERVICES } from "../../../config/api.config";
import type { ICartGateway } from "../../../domain/gateways/cart/ICartGateway";
import type { RemoveFromCartDto } from "../../../application/dtos/cart/RemoveFromCart.dto";
import type { GetCartsByUserIdDto } from "../../../application/dtos/cart/GetCartsByUserId.dto";

export class CartAdapter implements ICartGateway {

    async addToCart(addToCartDto: AddToCartDto): Promise<Response<number>> {
        return await apiClient.post<Response<number>>(`${API_SERVICES.CARTS}/Cart/AddCart`, {dto:addToCartDto});
    }

    async removeFromCart(cartItem: RemoveFromCartDto): Promise<Response<boolean>> {
        return await apiClient.delete<Response<boolean>>(`${API_SERVICES.CARTS}/Cart/RemoveFromCart`, {dto:cartItem});
    }

    async getCartsByUserId(userId: number): Promise<Response<GetCartsByUserIdDto[]>> {
        return await apiClient.get<Response<GetCartsByUserIdDto[]>>(`${API_SERVICES.CARTS}/Cart/GetCartsByUserId?userId=${userId}`);
    }
}
    
