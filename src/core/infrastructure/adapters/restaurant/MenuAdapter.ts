import type { MenuViewModel } from "../../../application/viewmodels/menu.view-model";
import type { Response } from "../../../../shared/types/api";
import type { IMenuGateway } from "../../../domain/gateways/restaurant/IMenuGateway";
import { secureFetch } from "../../../../shared/utils/secureFetch";

export class MenuAdapter implements IMenuGateway {
    
    url = 'https://localhost:7180/api/';

    async getInitialData(restaurantId: number): Promise<Response<MenuViewModel>> {
        const response = await secureFetch(`${this.url}Menu/GetInitialData?RestaurantId=${restaurantId}`);
        
        if (!response.ok) {
            throw new Error(`Error fetching menu data: ${response.statusText}`);
        }
        return await response.json();
    }
}