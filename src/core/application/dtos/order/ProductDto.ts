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
    id: number; // Added for parity with Restaurant ProductDto
    name: string;
    options: {
      id: number; // Added for parity
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

