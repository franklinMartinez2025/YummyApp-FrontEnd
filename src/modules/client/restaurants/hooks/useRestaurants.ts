import { useState, useEffect, useMemo, useCallback } from "react";
import type { RestaurantDto } from "../../../../core/application/dtos/restaurant/RestaurantDto";
import { RestaurantAdapter } from "../../../../core/infrastructure/adapters/RestaurantAdapter";
import { RestaurantService } from "../../../../core/application/services/RestaurantService";
import type { LoadingState } from "../../../../shared/types/api";

/**
 * Hook personalizado para manejar restaurantes
 * Usa el adapter que consume los endpoints del controlador de restaurantes
 */
export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<RestaurantDto[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [error, setError] = useState<string | null>(null);

  // El adapter implementa el gateway
  // Adaptador + servicio se memorizan para mantener dependencias estables
  const restaurantService = useMemo(() => {
    const restaurantAdapter = new RestaurantAdapter();
    return new RestaurantService(restaurantAdapter);
  }, []);

  // Mock data for development
  const MOCK_RESTAURANTS: RestaurantDto[] = [
    {
      id: "1",
      name: "Burger King",
      description: "Las mejores hamburguesas a la parrilla",
      image:
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1000&auto=format&fit=crop",
      rating: 4.5,
      deliveryTime: "25-35",
      deliveryFee: 2.5,
      minimumOrder: 10,
      cuisine: ["Hamburguesas", "Americana", "Fast Food"],
      isOpen: true,
      location: {
        address: "Av. Principal 123",
        coordinates: { lat: 0, lng: 0 },
      },
    },
    {
      id: "2",
      name: "Pizza Hut",
      description: "El sabor de la verdadera pizza",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop",
      rating: 4.2,
      deliveryTime: "30-45",
      deliveryFee: 1.99,
      minimumOrder: 15,
      cuisine: ["Pizza", "Italiana"],
      isOpen: true,
      location: {
        address: "Calle 2 456",
        coordinates: { lat: 0, lng: 0 },
      },
    },
    {
      id: "3",
      name: "KFC",
      description: "Para chuparse los dedos",
      image:
        "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=1000&auto=format&fit=crop",
      rating: 4.0,
      deliveryTime: "20-30",
      deliveryFee: 1.5,
      minimumOrder: 8,
      cuisine: ["Pollo", "Fast Food"],
      isOpen: true,
      location: {
        address: "Av. Central 789",
        coordinates: { lat: 0, lng: 0 },
      },
    },
    {
      id: "4",
      name: "Sushi House",
      description: "El mejor sushi de la ciudad",
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000&auto=format&fit=crop",
      rating: 4.8,
      deliveryTime: "40-55",
      deliveryFee: 3.0,
      minimumOrder: 20,
      cuisine: ["Sushi", "Japonesa", "Asiática"],
      isOpen: true,
      location: {
        address: "Plaza Mayor 101",
        coordinates: { lat: 0, lng: 0 },
      },
    },
    {
      id: "5",
      name: "Tacos El Pastor",
      description: "Auténticos tacos mexicanos",
      image:
        "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=1000&auto=format&fit=crop",
      rating: 4.6,
      deliveryTime: "15-25",
      deliveryFee: 0,
      minimumOrder: 12,
      cuisine: ["Mexicana", "Tacos"],
      isOpen: true,
      location: {
        address: "Calle Mexico 202",
        coordinates: { lat: 0, lng: 0 },
      },
    },
    {
      id: "6",
      name: "Green Salad",
      description: "Comida saludable y fresca",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop",
      rating: 4.7,
      deliveryTime: "20-30",
      deliveryFee: 1.0,
      minimumOrder: 10,
      cuisine: ["Saludable", "Ensaladas", "Vegetariana"],
      isOpen: true,
      location: {
        address: "Av. Verde 303",
        coordinates: { lat: 0, lng: 0 },
      },
    },
  ];

  const fetchRestaurants = useCallback(async () => {
    setLoadingState("loading");
    setError(null);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Use mock data instead of API call for now
      // const data = await restaurantService.getAllRestaurants();
      setRestaurants(MOCK_RESTAURANTS);
      setLoadingState("success");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al cargar restaurantes";
      setError(errorMessage);
      setLoadingState("error");
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
