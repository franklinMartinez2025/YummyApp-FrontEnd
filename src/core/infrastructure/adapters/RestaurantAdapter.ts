import type { IRestaurantGateway } from '../../domain/gateways/IRestaurantGateway';
import type { RestaurantDto } from '../../application/dtos/restaurant/RestaurantDto';
import { apiClient } from '../api/apiClient';
import { API_SERVICES } from '../../config/api.config';

export class RestaurantAdapter implements IRestaurantGateway {
  
  async getAllRestaurants(): Promise<RestaurantDto[]> {
    try {
      return await apiClient.get<RestaurantDto[]>(API_SERVICES.RESTAURANTS);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      return [];
    }
  }

  async getRestaurantById(id: string): Promise<RestaurantDto | null> {
    try {
      return await apiClient.get<RestaurantDto>(`${API_SERVICES.RESTAURANTS}/${id}`);
    } catch (error) {
      console.error('Error fetching restaurant:', error);
      return null;
    }
  }

  async getRestaurantsByCuisine(cuisine: string): Promise<RestaurantDto[]> {
    try {
      return await apiClient.get<RestaurantDto[]>(`${API_SERVICES.RESTAURANTS}?cuisine=${cuisine}`);
    } catch (error) {
      console.error('Error fetching restaurants by cuisine:', error);
      return [];
    }
  }

  async searchRestaurants(query: string): Promise<RestaurantDto[]> {
    try {
      return await apiClient.get<RestaurantDto[]>(`${API_SERVICES.RESTAURANTS}/search?q=${query}`);
    } catch (error) {
      console.error('Error searching restaurants:', error);
      return [];
    }
  }

  async getNearbyRestaurants(lat: number, lng: number, radius: number): Promise<RestaurantDto[]> {
    try {
      return await apiClient.get<RestaurantDto[]>(
        `${API_SERVICES.RESTAURANTS}/nearby?lat=${lat}&lng=${lng}&radius=${radius}`
      );
    } catch (error) {
      console.error('Error fetching nearby restaurants:', error);
      return [];
    }
  }
}

