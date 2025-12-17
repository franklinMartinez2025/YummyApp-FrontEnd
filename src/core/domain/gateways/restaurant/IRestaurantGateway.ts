import type { GetAvailableRestaurantDto } from "../../../application/dtos/restaurant/GetAvailableRestaurant.dto";
import type { Response } from "../../../../shared/types/api";
import type { RestaurantDetailDto } from "../../../application/dtos/restaurant/RestaurantDetail.dto";
import type { GenericItemName } from "../../../../shared/types/common";

export interface IRestaurantGateway {
    
    getAvailableRestaurants(): Promise<Response<GetAvailableRestaurantDto[]>>;

    getRestaurantDetailsById(restaurantId: number): Promise<Response<RestaurantDetailDto>>;
    
    getRestaurantNameByUserId(userId: number): Promise<Response<GenericItemName>>;
} 