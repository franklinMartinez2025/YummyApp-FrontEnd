import type { ModifierGroupsTemplateDto } from "./ModifierGroupsTemplate.dto";

export interface FoodItemDto {
    /**
     * Identificador del plato
     */
    dishId: number;

    /**
     * Nombre del plato
     */
    dishName: string;

    /**
     * Identificador de la categoría
     */
    categoryId: number;

    /**
     * Nombre de la categoría
     */
    categoryName: string;

    /**
     * Descripción del plato
     */
    description: string;

    /**
     * URL de la imagen
     */
    imageUrl?: string | null;

    /**
     * Indica si el plato está activo
     */
    isActive: boolean;

    /**
     * Tiempo de preparación
     */
    preparationTime: number;

    /**
     * Indica si se gestiona el stock
     */
    isStockManaged: boolean;

    /**
     * Stock disponible
     */
    stock: number;

    /**
     * Lista de grupos de modificadores (extras)
     */
    extras:ModifierGroupsTemplateDto[]; 

    /**
     * Precio del plato
     */
    price: number;
}
    
