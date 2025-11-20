import { useState, useEffect, useMemo, useCallback } from 'react';
import type { RestaurantDto } from '../../../core/application/dtos/restaurant/RestaurantDto';
import { RestaurantAdapter } from '../../../core/infrastructure/adapters/RestaurantAdapter';
import { RestaurantService } from '../../../core/application/services/RestaurantService';
import type { LoadingState } from '../../../shared/types';

/**
 * Hook personalizado para manejar restaurantes
 * Usa el adapter que consume los endpoints del controlador de restaurantes
 */
export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<RestaurantDto[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  // El adapter implementa el gateway
  // Adaptador + servicio se memorizan para mantener dependencias estables
  const restaurantService = useMemo(() => {
    const restaurantAdapter = new RestaurantAdapter();
    return new RestaurantService(restaurantAdapter);
  }, []);

  const fetchRestaurants = useCallback(async () => {
    setLoadingState('loading');
    setError(null);

    try {
      const data = await restaurantService.getAllRestaurants();
      setRestaurants(data);
      setLoadingState('success');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar restaurantes';
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

