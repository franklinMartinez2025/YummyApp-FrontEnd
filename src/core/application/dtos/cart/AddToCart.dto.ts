export interface AddToCartDto {
  userId: number;
  restaurantId: number;
  restaurantName: string;
  dishId: number;
  dishName: string;
  dishImage: string;
  quantity: number;
  unitPrice: number;
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
