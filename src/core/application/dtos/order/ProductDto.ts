export interface ProductDto {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isAvailable: boolean;
  ingredients?: string[];
  nutritionalInfo?: NutritionalInfoDto;
  customization?: {
    name: string;
    options: {
      name: string;
      price: number;
    }[];
  }[];
}

export interface NutritionalInfoDto {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

