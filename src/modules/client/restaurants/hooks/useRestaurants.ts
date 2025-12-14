import { useState, useEffect, useMemo, useCallback } from "react";
import { RestaurantAdapter } from "../../../../core/infrastructure/adapters/restaurant/RestaurantAdapter";
import { RestaurantService } from "../../../../core/application/services/Restaurant/RestaurantService";
import type { GetAvailableRestaurantDto } from "../../../../core/application/dtos/restaurant/GetAvailableRestaurant.dto";

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<GetAvailableRestaurantDto[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);
  const restaurantService = useMemo(() => {
    const restaurantAdapter = new RestaurantAdapter();
    return new RestaurantService(restaurantAdapter);
  }, []);

  const fetchRestaurants = useCallback(async () => {
    setLoadingState('loading');
    setError(null);

    try {
      const response = await restaurantService.getAvailableRestaurants();
      if (response.success && response.data) {
        setRestaurants(response.data);
        setLoadingState('success');
      } else {
        throw new Error(response.message || "Error al cargar restaurantes");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al cargar restaurantes";
      setError(errorMessage);
      setLoadingState('error');
    }
  }, [restaurantService]);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  return {
    restaurants,
    loadingState,
    error,
    refetch: fetchRestaurants,
  };
};
