import { useMemo, useState } from 'react';
import { MenuService } from '../../../../core/application/services/Restaurant/MenuService';
import { MenuAdapter } from '../../../../core/infrastructure/adapters/restaurant/MenuAdapter';
import type { RegisterDishDto } from '../../../../core/application/dtos/restaurant/RegisterDish.dto';
import type { Response } from '../../../../shared/types/api';
import type { MenuViewModel } from '../../../../core/application/viewmodels/menu.view-model';
import type { UpdateDishDto } from '../../../../core/application/dtos/restaurant/UpdateDish.dto';

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

    return {
        getInitialData,
        registerDish,
        updateDish,
        loading,
        error
    };
};
