export interface RestaurantDto {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  minimumOrder: number;
  cuisine: string[];
  isOpen: boolean;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  createdAt?: string;
  updatedAt?: string;
}

