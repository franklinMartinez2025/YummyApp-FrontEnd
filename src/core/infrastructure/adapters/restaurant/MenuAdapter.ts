import type { MenuViewModel } from "../../../application/viewmodels/menu.view-model";
import type { Response } from "../../../../shared/types/api";
import type { IMenuGateway } from "../../../domain/gateways/restaurant/IMenuGateway";
import { apiClient } from "../../api/apiClient";
import { API_SERVICES } from "../../../config/api.config";

export class MenuAdapter implements IMenuGateway {
    
    async getInitialData(restaurantId: number): Promise<Response<MenuViewModel>> {
        return await apiClient.get<Response<MenuViewModel>>(`${API_SERVICES.RESTAURANTS}/Menu/GetInitialData?RestaurantId=${restaurantId}`);
    }
}