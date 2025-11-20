import type { IRestaurantGateway } from '../../domain/gateways/IRestaurantGateway';
import type { RestaurantDto } from '../dtos/restaurant/RestaurantDto';

export class RestaurantService {
  private restaurantGateway: IRestaurantGateway;

  constructor(restaurantGateway: IRestaurantGateway) {
    this.restaurantGateway = restaurantGateway;
  }

  async getAllRestaurants(): Promise<RestaurantDto[]> {
    return await this.restaurantGateway.getAllRestaurants();
  }

  async getRestaurantById(id: string): Promise<RestaurantDto | null> {
    return await this.restaurantGateway.getRestaurantById(id);
  }

  async getRestaurantsByCuisine(cuisine: string): Promise<RestaurantDto[]> {
    return await this.restaurantGateway.getRestaurantsByCuisine(cuisine);
  }

  async searchRestaurants(query: string): Promise<RestaurantDto[]> {
    return await this.restaurantGateway.searchRestaurants(query);
  }

  async getNearbyRestaurants(lat: number, lng: number, radius: number): Promise<RestaurantDto[]> {
    return await this.restaurantGateway.getNearbyRestaurants(lat, lng, radius);
  }
}
