import type { IMenuGateway } from "../../../domain/gateways/restaurant/IMenuGateway";
import { GetInitialDataUseCase } from "../../use-cases/resturant/menu/GetInitialDataUseCase";
import type { MenuViewModel } from "../../viewmodels/menu.view-model";
import type { Response } from "../../../../shared/types/api";
import type { RegisterDishDto } from "../../dtos/restaurant/RegisterDish.dto";

export class MenuService {
    
    private getInitialDataUseCase: GetInitialDataUseCase;
    private menuGateway: IMenuGateway;


    constructor(menuGateway: IMenuGateway) {
        this.getInitialDataUseCase = new GetInitialDataUseCase();
        this.menuGateway = menuGateway;
    }

    async getInitialData(restaurantId: number): Promise<Response<MenuViewModel>> {
        this.getInitialDataUseCase.execute(restaurantId); 
        const response = await this.menuGateway.getInitialData(restaurantId);
        return response;
    }

    async registerDish(dish: RegisterDishDto): Promise<Response<boolean>> {
        const response = await this.menuGateway.registerDish(dish);
        return response;
    }
}   