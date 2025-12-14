import type { FoodItemDto } from "./FoodItem.dto";

export interface RestaurantDetailDto {
  restaurantId: number;
  name: string;
  description: string;
  image: string;
  banner: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  foodItems: FoodItemDto[];
}