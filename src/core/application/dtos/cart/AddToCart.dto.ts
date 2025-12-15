export interface AddToCartDto {
  userId: number;
  restaurantId: number;
  dishId: number;
  dishName: string;
  quantity: number;
  modifierGroups: AddToCartModifierGroupDto[];
}

export interface AddToCartModifierGroupDto {
  modifierGroupTemplateId: number;
  modifierGroupTemplateName: string;
  options: AddToCartModifierOptionDto[];
}

export interface AddToCartModifierOptionDto {
  modifierItemId: number;
  modifierItemName: string;
}
