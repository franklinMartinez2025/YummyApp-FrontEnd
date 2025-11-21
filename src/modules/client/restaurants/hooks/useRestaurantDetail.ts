import { useState, useEffect, useCallback } from "react";
import type { RestaurantDto } from "../../../../core/application/dtos/restaurant/RestaurantDto";
import type { MenuCategoryDto } from "../../../../core/application/dtos/restaurant/MenuCategoryDto";
import type { LoadingState } from "../../../../shared/types/api";

// Mock data for menu
const MOCK_MENU: MenuCategoryDto[] = [
  {
    id: "cat1",
    name: "Hamburguesas",
    products: [
      {
        id: "p1",
        name: "Hamburguesa Clásica",
        description:
          "Carne de res 150g, lechuga, tomate, cebolla y salsa especial.",
        price: 8.5,
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop",
        customization: [
          {
            name: "Tamaño",
            options: [
              { name: "Regular", price: 0 },
              { name: "Doble", price: 3.0 },
            ],
          },
        ],
      },
      {
        id: "p2",
        name: "Cheeseburger Royal",
        description: "Doble carne, doble queso cheddar, tocino y huevo.",
        price: 12.0,
        image:
          "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "cat2",
    name: "Bebidas",
    products: [
      {
        id: "p3",
        name: "Coca Cola",
        description: "Botella de 500ml",
        price: 2.5,
        image:
          "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: "p4",
        name: "Limonada Frozen",
        description: "Refrescante limonada con hielo granizado",
        price: 4.0,
        image:
          "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1000&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "cat3",
    name: "Postres",
    products: [
      {
        id: "p5",
        name: "Cheesecake de Fresa",
        description: "Delicioso cheesecake con salsa de fresas naturales",
        price: 6.0,
        image:
          "https://images.unsplash.com/photo-1524351199678-941a58a3df26?q=80&w=1000&auto=format&fit=crop",
      },
    ],
  },
];

// Mock data for restaurant details (reusing some from useRestaurants)
const MOCK_RESTAURANT_DETAILS: Record<string, RestaurantDto> = {
  "1": {
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
  // Fallback for other IDs
  default: {
    id: "0",
    name: "Restaurante Demo",
    description: "Descripción del restaurante demo",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop",
    rating: 4.0,
    deliveryTime: "30-45",
    deliveryFee: 2.0,
    minimumOrder: 15,
    cuisine: ["Variada"],
    isOpen: true,
    location: {
      address: "Calle Demo 123",
      coordinates: { lat: 0, lng: 0 },
    },
  },
};

export const useRestaurantDetail = (restaurantId: string | undefined) => {
  const [restaurant, setRestaurant] = useState<RestaurantDto | null>(null);
  const [menu, setMenu] = useState<MenuCategoryDto[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [error, setError] = useState<string | null>(null);

  const fetchRestaurantDetail = useCallback(async () => {
    if (!restaurantId) return;

    setLoadingState("loading");
    setError(null);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Get mock restaurant details
      const restaurantData =
        MOCK_RESTAURANT_DETAILS[restaurantId] ||
        MOCK_RESTAURANT_DETAILS["default"];

      // In a real app, we would fetch the specific menu for this restaurant
      // For now, we return the same mock menu for all
      setRestaurant(restaurantData);
      setMenu(MOCK_MENU);
      setLoadingState("success");
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Error al cargar detalles del restaurante";
      setError(errorMessage);
      setLoadingState("error");
    }
  }, [restaurantId]);

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
