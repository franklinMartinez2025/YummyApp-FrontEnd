export interface ProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  customization?: {
    name: string;
    options: {
      name: string;
      price: number;
    }[];
  }[];
}
