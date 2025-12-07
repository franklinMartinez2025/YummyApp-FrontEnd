import type { MenuViewModel } from "../../../application/viewmodels/menu.view-model";
import type { Response } from "../../../../shared/types/api";
import { apiClient } from "../../api/apiClient";
import type { IMenuGateway } from "../../../domain/gateways/restaurant/IMenuGateway";

export class MenuAdapter implements IMenuGateway {
    
    async getInitialData(restaurantId: number): Promise<Response<MenuViewModel>> {
        return await apiClient.get<Response<MenuViewModel>>(`/Menu/GetInitialData/${restaurantId}`);  
    }
}