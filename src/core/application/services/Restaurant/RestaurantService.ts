import type { IRestaurantGateway } from "../../../domain/gateways/restaurant/IRestaurantGateway";
import type { GetAvailableRestaurantDto } from "../../../application/dtos/restaurant/GetAvailableRestaurant.dto";
import type { Response } from "../../../../shared/types/api";
import type { RestaurantDetailDto } from "../../dtos/restaurant/RestaurantDetail.dto";
import type { GenericItemName } from "../../../../shared/types/common";

export class RestaurantService {
    
    private readonly restaurantGateway: IRestaurantGateway;

    constructor(restaurantGateway: IRestaurantGateway) {
        this.restaurantGateway = restaurantGateway;
    }

    async getAvailableRestaurants(): Promise<Response<GetAvailableRestaurantDto[]>> {
        return await this.restaurantGateway.getAvailableRestaurants();
    }

    async getRestaurantDetailsById(restaurantId:number): Promise<Response<RestaurantDetailDto>> {
        return await this.restaurantGateway.getRestaurantDetailsById(restaurantId);
    }

    async getRestaurantNameByUserId(userId: number): Promise<Response<GenericItemName>> {
        return await this.restaurantGateway.getRestaurantNameByUserId(userId);
    }
}