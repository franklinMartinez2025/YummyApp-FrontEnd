import { useMemo, useState } from 'react';
import { MenuService } from '../../../../core/application/services/Restaurant/MenuService';
import { MenuAdapter } from '../../../../core/infrastructure/adapters/restaurant/MenuAdapter';
import type { RegisterDishDto } from '../../../../core/application/dtos/restaurant/RegisterDish.dto';
import type { Response } from '../../../../shared/types/api';
import type { MenuViewModel } from '../../../../core/application/viewmodels/menu.view-model';
import type { UpdateDishDto } from '../../../../core/application/dtos/restaurant/UpdateDish.dto';
import type { CreateComponentDto } from '../../../../core/application/dtos/restaurant/CreateComponent.dto';
import type { DesactivateComponentDto } from '../../../../core/application/dtos/restaurant/DesactivateComponent.dto';
import type { ActivateComponentDto } from '../../../../core/application/dtos/restaurant/ActivateComponent.dto';
import type { CreateGroupDto } from '../../../../core/application/dtos/restaurant/CreateGroup.dto';
import type { CreateCategoryDto } from '../../../../core/application/dtos/restaurant/CreateCategory.dto';

export const useMenu = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Initialize service with adapter
    const menuService = useMemo(() => new MenuService(new MenuAdapter()), []);

    const getInitialData = async (restaurantId: number): Promise<Response<MenuViewModel>> => {
        setLoading(true);
        setError(null);
        try {
            const response = await menuService.getInitialData(restaurantId);
            return response;
        } catch (err) {
            console.error(err);
            setError("Error al cargar los datos del menú.");
            return { success: false, message: "Error al cargar los datos", data: undefined } as Response<MenuViewModel>;
        } finally {
            setLoading(false);
        }
    };

    const registerDish = async (dish: RegisterDishDto): Promise<Response<boolean>> => {
        setLoading(true);
        setError(null);
        try {
            const response = await menuService.registerDish(dish);
            return response;
        } catch (err) {
            console.error(err);
            setError("Error al registrar el plato.");
            return { success: false, message: "Error al registrar el plato" } as Response<boolean>;
        } finally {
            setLoading(false);
        }
    };

    const updateDish = async (dish: UpdateDishDto): Promise<Response<boolean>> => {
        setLoading(true);
        setError(null);
        try {
            const response = await menuService.updateDish(dish);
            return response;
        } catch (err) {
            console.error(err);
            setError("Error al actualizar el plato.");
            return { success: false, message: "Error al actualizar el plato" } as Response<boolean>;
        } finally {
            setLoading(false);
        }
    };

    const createComponent = async (component: CreateComponentDto): Promise<Response<boolean>> => {
        setLoading(true);
        setError(null);
        try {
            const response = await menuService.createComponent(component);
            return response;
        } catch (err) {
            console.error(err);
            setError("Error al crear el componente.");
            return { success: false, message: "Error al crear el componente" } as Response<boolean>;
        } finally {
            setLoading(false);
        }
    };

    const desactivateComponent = async (componentId: DesactivateComponentDto): Promise<Response<boolean>> => {
        setLoading(true);
        setError(null);
        try {
            const response = await menuService.desactivateComponent(componentId);
            return response;
        } catch (err) {
            console.error(err);
            setError("Error al desactivar el componente.");
            return { success: false, message: "Error al desactivar el componente" } as Response<boolean>;
        } finally {
            setLoading(false);
        }
    };

    const activateComponent = async (componentId: ActivateComponentDto): Promise<Response<boolean>> => {
        setLoading(true);
        setError(null);
        try {
            const response = await menuService.activateComponent(componentId);
            return response;
        } catch (err) {
            console.error(err);
            setError("Error al activar el componente.");
            return { success: false, message: "Error al activar el componente" } as Response<boolean>;
        } finally {
            setLoading(false);
        }
    };

    const createGroup = async (group: CreateGroupDto): Promise<Response<boolean>> => {
        setLoading(true);
        setError(null);
        try {
            const response = await menuService.createGroup(group);
            return response;
        } catch (err) {
            console.error(err);
            setError("Error al crear el grupo.");
            return { success: false, message: "Error al crear el grupo" } as Response<boolean>;
        } finally {
            setLoading(false);
        }
    };

    const createCategory = async (category: CreateCategoryDto): Promise<Response<number>> => {
        setLoading(true);
        setError(null);
        try {
            const response = await menuService.createCategory(category);
            return response;
        } catch (err) {
            console.error(err);
            setError("Error al crear la categoría.");
            return { success: false, message: "Error al crear la categoría", data: 0 } as Response<number>;
        } finally {
            setLoading(false);
        }
    };

    return {
        getInitialData,
        registerDish,
        updateDish,
        createComponent,
        desactivateComponent,
        activateComponent,
        createGroup,
        createCategory,
        loading,
        error
    };
};
