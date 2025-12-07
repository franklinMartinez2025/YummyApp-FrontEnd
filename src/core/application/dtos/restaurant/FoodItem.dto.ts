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
     * Precio del plato
     */
    price: number;
}
    
