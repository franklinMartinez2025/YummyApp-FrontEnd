import type { Response } from "../../../../shared/types/api";
import type { RegisterDishDto } from "../../../application/dtos/restaurant/RegisterDish.dto";
import type { MenuViewModel } from "../../../application/viewmodels/menu.view-model";

export interface IMenuGateway {
    /**Obtiene datos iniciales*/
    getInitialData(restaurantId: number): Promise<Response<MenuViewModel>>;

    /**Registra un plato*/
    registerDish(dish: RegisterDishDto): Promise<Response<boolean>>;
}