import type { IMenuGateway } from "../../../domain/gateways/restaurant/IMenuGateway";
import { GetInitialDataUseCase } from "../../use-cases/resturant/menu/GetInitialDataUseCase";
import type { MenuViewModel } from "../../viewmodels/menu.view-model";
import type { Response } from "../../../../shared/types/api";
import type { RegisterDishDto } from "../../dtos/restaurant/RegisterDish.dto";
import type { UpdateDishDto } from "../../dtos/restaurant/UpdateDish.dto";
import type { CreateComponentDto } from "../../dtos/restaurant/CreateComponent.dto";
import type { DesactivateComponentDto } from "../../dtos/restaurant/DesactivateComponent.dto";
import type { ActivateComponentDto } from "../../dtos/restaurant/ActivateComponent.dto";
import type { CreateGroupDto } from "../../dtos/restaurant/CreateGroup.dto";
import type { CreateCategoryDto } from "../../dtos/restaurant/CreateCategory.dto";

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

    async updateDish(dish: UpdateDishDto): Promise<Response<boolean>> {
        const response = await this.menuGateway.updateDish(dish);
        return response;
    }

    async createComponent(data: CreateComponentDto): Promise<Response<boolean>> {
        const response = await this.menuGateway.createComponent(data);
        return response;
    }

    async desactivateComponent(data: DesactivateComponentDto): Promise<Response<boolean>> {
        const response = await this.menuGateway.desactivateComponent(data);
        return response;
    }

    async activateComponent(data: ActivateComponentDto): Promise<Response<boolean>> {
        const response = await this.menuGateway.activateComponent(data);
        return response;
    }

    async createGroup(data: CreateGroupDto): Promise<Response<boolean>> {
        const response = await this.menuGateway.createGroup(data);
        return response;
    }

    async createCategory(data: CreateCategoryDto): Promise<Response<number>> {
        const response = await this.menuGateway.createCategory(data);
        return response;
    }
}   