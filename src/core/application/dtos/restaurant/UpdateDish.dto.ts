export interface UpdateDishDto {
  dishId: number;
  name: string;
  categoryId: number;
  description: string;
  price: number;
  preparationTime: number;
  isActive: boolean;
  stock?: number;
  extraIds: number[];
  image?: File | null;
}