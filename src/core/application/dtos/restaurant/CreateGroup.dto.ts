export interface CreateGroupDto {
  restaurantId: number;
  name: string;
  minSelect: number;
  maxSelect: number;
  options: GroupOptionDto[];
}

export interface GroupOptionDto {
  itemId: number;
  priceDelta: number;
}
