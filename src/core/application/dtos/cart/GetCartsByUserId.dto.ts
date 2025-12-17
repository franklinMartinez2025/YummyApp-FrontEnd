import type { GenericItemName } from "../../../../shared/types/common";

export interface GetCartsByUserIdDto {
  cartId: number;
  restaurantId: number;
  restaurantName: string;
  dishId: number;
  dishName: string;
  dishImage: string;
  unitPrice: number;
  quantity: number;
  modifierGroups: CartByUserIdModifierGroupDto[];
}

export interface CartByUserIdModifierGroupDto {
  modifierGroupTemplateId: number;
  modifierGroupTemplateName: string;
  options: GenericItemName[];
}