export interface ProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  customization?: {
    id: number;
    name: string;
    options: {
      id: number;
      name: string;
      price: number;
    }[];
  }[];
  restaurantId?: number; // Added to capture restaurant context
  restaurantName?: string;
}
