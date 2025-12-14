import type { GetAvailableRestaurantDto } from "../../../application/dtos/restaurant/GetAvailableRestaurant.dto";
import type { Response } from "../../../../shared/types/api";

export interface IRestaurantGateway {
    
    getAvailableRestaurants(): Promise<Response<GetAvailableRestaurantDto[]>>;
    getRestaurant(id: string): Promise<Response<GetAvailableRestaurantDto>>;
} 