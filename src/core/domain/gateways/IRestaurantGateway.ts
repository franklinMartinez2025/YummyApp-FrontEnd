import type { RestaurantDto } from '../../application/dtos/restaurant/RestaurantDto';

export interface IRestaurantGateway {

  getAllRestaurants(): Promise<RestaurantDto[]>;

  getRestaurantById(id: string): Promise<RestaurantDto | null>;

  getRestaurantsByCuisine(cuisine: string): Promise<RestaurantDto[]>;

  searchRestaurants(query: string): Promise<RestaurantDto[]>;

  getNearbyRestaurants(lat: number, lng: number, radius: number): Promise<RestaurantDto[]>;
}

