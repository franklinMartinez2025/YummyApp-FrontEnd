import type { IRestaurantGateway } from "../../../domain/gateways/restaurant/IRestaurantGateway";
import type { GetAvailableRestaurantDto } from "../../../application/dtos/restaurant/GetAvailableRestaurant.dto";
import type { Response } from "../../../../shared/types/api";
import { apiClient } from "../../api/apiClient";
import { API_SERVICES } from "../../../config/api.config";
import type { RestaurantDetailDto } from "../../../application/dtos/restaurant/RestaurantDetail.dto";

export class RestaurantAdapter implements IRestaurantGateway {
    
    async getAvailableRestaurants(): Promise<Response<GetAvailableRestaurantDto[]>> {
        return await apiClient.get<Response<GetAvailableRestaurantDto[]>>(`${API_SERVICES.RESTAURANTS}/RestaurantInfo/GetAvailableRestaurants`, { skipAuth: true });
    }

    async getRestaurantDetailsById(restaurantId:number): Promise<Response<RestaurantDetailDto>> {
        return await apiClient.get<Response<RestaurantDetailDto>>(`${API_SERVICES.RESTAURANTS}/RestaurantInfo/GetRestaurantDetailsById?RestaurantId=${restaurantId}`, { skipAuth: true });
    }
}