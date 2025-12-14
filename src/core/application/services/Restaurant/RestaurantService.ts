import type { IRestaurantGateway } from "../../../domain/gateways/restaurant/IRestaurantGateway";
import type { GetAvailableRestaurantDto } from "../../../application/dtos/restaurant/GetAvailableRestaurant.dto";
import type { Response } from "../../../../shared/types/api";

export class RestaurantService {
    
    private readonly restaurantGateway: IRestaurantGateway;

    constructor(restaurantGateway: IRestaurantGateway) {
        this.restaurantGateway = restaurantGateway;
    }

    async getAvailableRestaurants(): Promise<Response<GetAvailableRestaurantDto[]>> {
        return await this.restaurantGateway.getAvailableRestaurants();
    }

    async getRestaurant(id: string): Promise<Response<GetAvailableRestaurantDto>> {
        return await this.restaurantGateway.getRestaurant(id);
    }
}