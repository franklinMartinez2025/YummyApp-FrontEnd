import type { AddToCartDto } from "../../../application/dtos/cart/AddToCart.dto";
import type { Response } from "../../../../shared/types/api";
import { apiClient } from "../../api/apiClient";
import { API_SERVICES } from "../../../config/api.config";
import type { ICartGateway } from "../../../domain/gateways/cart/ICartGateway";

export class CartAdapter implements ICartGateway {

    async addToCart(addToCartDto: AddToCartDto): Promise<Response<boolean>> {
        return await apiClient.post<Response<boolean>>(`${API_SERVICES.CARTS}/AddCart`, {dto:addToCartDto});
    }
}
    
