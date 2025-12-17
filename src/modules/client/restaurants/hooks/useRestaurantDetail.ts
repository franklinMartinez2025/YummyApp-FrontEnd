import { useState, useEffect, useCallback, useMemo } from "react";
import type { GetAvailableRestaurantDto } from "../../../../core/application/dtos/restaurant/GetAvailableRestaurant.dto";
import type { MenuCategoryDto } from "../../../../core/application/dtos/restaurant/MenuCategoryDto";
import type { LoadingState } from "./useRestaurants";
import { RestaurantAdapter } from "../../../../core/infrastructure/adapters/restaurant/RestaurantAdapter";
import { RestaurantService } from "../../../../core/application/services/Restaurant/RestaurantService";
import type { FoodItemDto } from "../../../../core/application/dtos/restaurant/FoodItem.dto";

export const useRestaurantDetail = (restaurantId: string | undefined) => {
  const [restaurant, setRestaurant] = useState<GetAvailableRestaurantDto | null>(null);
  const [menu, setMenu] = useState<MenuCategoryDto[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [error, setError] = useState<string | null>(null);

  const restaurantService = useMemo(() => {
    const restaurantAdapter = new RestaurantAdapter();
    return new RestaurantService(restaurantAdapter);
  }, []);

  const fetchRestaurantDetail = useCallback(async () => {
    if (!restaurantId) return;

    setLoadingState("loading");
    setError(null);

    try {
      const response = await restaurantService.getRestaurantDetailsById(Number(restaurantId));

      if (response.success && response.data) {
        const detail = response.data;
        
        // Map to GetAvailableRestaurantDto
        const restaurantData: GetAvailableRestaurantDto = {
          id: String(detail.restaurantId),
          name: detail.name,
          description: detail.description,
          image: detail.image,
          banner: detail.banner,
          rating: detail.rating,
          deliveryTime: detail.deliveryTime,
          deliveryFee: detail.deliveryFee
        };

        setRestaurant(restaurantData);

        // Group food items by category to create menu
        const groupedMenu: Record<number, MenuCategoryDto> = {};
        
        detail.foodItems.forEach((foodItem: FoodItemDto) => {
          if (!groupedMenu[foodItem.categoryId]) {
            groupedMenu[foodItem.categoryId] = {
              id: String(foodItem.categoryId),
              name: foodItem.categoryName,
              products: []
            };
          }
          
          groupedMenu[foodItem.categoryId].products.push({
            id: String(foodItem.dishId),
            name: foodItem.dishName,
            description: foodItem.description,
            price: foodItem.price,
            image: foodItem.imageUrl || '',
            customization: foodItem.extras?.map(group => ({
              id: group.id,
              name: group.name,
              options: group.options.map(opt => ({
                id: opt.id,
                name: opt.itemName,
                price: opt.price
              }))
            })) || [],
            restaurantId: detail.restaurantId, // Injecting restaurantId
            restaurantName: detail.name // Injecting restaurantName
          });
        });

        setMenu(Object.values(groupedMenu));
        setLoadingState("success");
      } else {
        throw new Error(response.message || "Error al cargar detalles del restaurante");
      }

    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Error al cargar detalles del restaurante";
      setError(errorMessage);
      setLoadingState("error");
    }
  }, [restaurantId, restaurantService]);

  useEffect(() => {
    fetchRestaurantDetail();
  }, [fetchRestaurantDetail]);

  return {
    restaurant,
    menu,
    loadingState,
    error,
    refetch: fetchRestaurantDetail,
  };
};
