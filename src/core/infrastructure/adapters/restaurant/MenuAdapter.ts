import type { MenuViewModel } from "../../../application/viewmodels/menu.view-model";
import type { Response } from "../../../../shared/types/api";
import type { IMenuGateway } from "../../../domain/gateways/restaurant/IMenuGateway";
import { apiClient } from "../../api/apiClient";
import { API_SERVICES } from "../../../config/api.config";
import type { RegisterDishDto } from "../../../application/dtos/restaurant/RegisterDish.dto";
import type { UpdateDishDto } from "../../../application/dtos/restaurant/UpdateDish.dto";

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
    return await apiClient.put<Response<boolean>>(`${API_SERVICES.RESTAURANTS}/Menu/UpdateDish`, formData);
  }
}
