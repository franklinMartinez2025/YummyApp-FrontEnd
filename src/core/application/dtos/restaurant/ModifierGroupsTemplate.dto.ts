export interface ModifierGroupsTemplateDto {
    
    id: number;

    name: string;

    minSelection: number;

    maxSelection: number;

    options: ModifierGroupsOptionDto[];
}

export interface ModifierGroupsOptionDto {
    
    id: number;

    itemId: number;

    itemName: string;

    price: number;
}
