export interface ModifierGroupsTemplateDto {
    /**
     * Identificador del grupo
     */
    groupId: number;

    /**
     * Nombre del grupo de modificadores
     */
    groupName: string;

    /**
     * Lista de opciones del grupo
     */
    options: ModifierGroupsOptionDto[];
}

export interface ModifierGroupsOptionDto {
    /**
     * Identificador de la opción
     */
    optionId: number;

    /**
     * Identificador del ítem asociado
     */
    itemId: number;

    /**
     * Nombre del ítem asociado
     */
    itemName: string;

    /**
     * Precio adicional o modificador
     */
    price: number;
}
