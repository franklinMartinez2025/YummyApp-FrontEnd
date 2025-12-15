export interface RemoveFromCartDto {
  userId: number;
  restaurantId: number;
  dishId: number;
  modifierGroups: RemoveCartModifierGroupDto[];
}

export interface RemoveCartModifierGroupDto {
  modifierGroupTemplateId: number;
  optionIds: number[];
}
