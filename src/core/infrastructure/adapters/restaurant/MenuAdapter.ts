import type { MenuViewModel } from "../../../application/viewmodels/menu.view-model";
import type { Response } from "../../../../shared/types/api";
import type { IMenuGateway } from "../../../domain/gateways/restaurant/IMenuGateway";
import { apiClient } from "../../api/apiClient";
import { API_SERVICES } from "../../../config/api.config";
import type { RegisterDishDto } from "../../../application/dtos/restaurant/RegisterDish.dto";
import type { UpdateDishDto } from "../../../application/dtos/restaurant/UpdateDish.dto";
import type { CreateComponentDto } from "../../../application/dtos/restaurant/CreateComponent.dto";
import type { DesactivateComponentDto } from "../../../application/dtos/restaurant/DesactivateComponent.dto";
import type { ActivateComponentDto } from "../../../application/dtos/restaurant/ActivateComponent.dto";
import type { CreateGroupDto } from "../../../application/dtos/restaurant/CreateGroup.dto";
import type { CreateCategoryDto } from "../../../application/dtos/restaurant/CreateCategory.dto";

export class MenuAdapter implements IMenuGateway {
  async getInitialData(restaurantId: number): Promise<Response<MenuViewModel>> {
    return await apiClient.get<Response<MenuViewModel>>(
      `${API_SERVICES.RESTAURANTS}/Menu/GetInitialData?RestaurantId=${restaurantId}`
    );
  }

  async registerDish(dish: RegisterDishDto): Promise<Response<boolean>> {
    const formData = new FormData();
    Object.keys(dish).forEach((key) => {
      const value = (dish as any)[key];
      if (value !== null && value !== undefined) {
        if (key === "image" && value instanceof File) {
          formData.append(`dto.${key}`, value);
        } else if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`dto.${key}`, item.toString());
          });
        } else {
          formData.append(`dto.${key}`, value.toString());
        }
      }
    });
    return await apiClient.post<Response<boolean>>(`${API_SERVICES.RESTAURANTS}/Menu/RegisterDish`, formData);
  }

  async updateDish(dish: UpdateDishDto): Promise<Response<boolean>> {
    const formData = new FormData();
    Object.keys(dish).forEach((key) => {
      const value = (dish as any)[key];
      if (value !== null && value !== undefined) {
        if (key === "image") {
            if (value instanceof File) {
                 formData.append(`dto.${key}`, value);
            }
        } else if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`dto.${key}`, item.toString());
          });
        } else {
          formData.append(`dto.${key}`, value.toString());
        }
      }
    });
    return await apiClient.patch<Response<boolean>>(`${API_SERVICES.RESTAURANTS}/Menu/UpdateDish`, formData);
  }

  async createComponent(data: CreateComponentDto): Promise<Response<boolean>> {
    return await apiClient.post<Response<boolean>>(`${API_SERVICES.RESTAURANTS}/Menu/CreateComponent`, data);
  }

  async desactivateComponent(data: DesactivateComponentDto): Promise<Response<boolean>> {
    return await apiClient.patch<Response<boolean>>(`${API_SERVICES.RESTAURANTS}/Menu/DesactivateComponent`, data);
  }

  async activateComponent(data: ActivateComponentDto): Promise<Response<boolean>> {
    return await apiClient.patch<Response<boolean>>(`${API_SERVICES.RESTAURANTS}/Menu/ActivateComponent`, data);
  }

  async createGroup(data: CreateGroupDto): Promise<Response<boolean>> {
    return await apiClient.post<Response<boolean>>(`${API_SERVICES.RESTAURANTS}/Menu/CreateGroup`, {dto:data});
  }

  async createCategory(data: CreateCategoryDto): Promise<Response<number>> {
    return await apiClient.post<Response<number>>(`${API_SERVICES.RESTAURANTS}/Menu/CreateCategory`, data);
  }
}
