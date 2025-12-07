import type { Response } from "../../../../shared/types/api";
import type { MenuViewModel } from "../../../application/viewmodels/menu.view-model";

export interface IMenuGateway {
    /**Obtiene datos iniciales*/
    getInitialData(restaurantId: number): Promise<Response<MenuViewModel>>;
}