import type { GenericItemName } from "../../../shared/types/common";
import type { FoodItemDto } from "../dtos/restaurant/FoodItem.dto";
import type { ModifierGroupsTemplateDto } from "../dtos/restaurant/ModifierGroupsTemplate.dto";

export interface MenuViewModel {
    /**
     * Lista de categorías
     */
    categories: GenericItemName[];

    /**
     * Lista de alimentos o comidas
     */
    foodItems: FoodItemDto[];

    /**
     * Lista de plantillas de grupos de modificadores
     */
    modifierGroupsTemplates: ModifierGroupsTemplateDto[];

    /**
     * Lista de componentes
     */
    components: GenericItemName[];
}
