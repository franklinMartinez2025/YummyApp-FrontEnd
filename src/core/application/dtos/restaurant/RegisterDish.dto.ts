export interface RegisterDishDto {
  restaurantId: number;
  name: string;
  categoryId: number;
  description: string;
  price: number;
  preparationTime: number;
  isActive: boolean;
  stock?: number | null;
  extraIds: number[];
  image: File | null;
}
