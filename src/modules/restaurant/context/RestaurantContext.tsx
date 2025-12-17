import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react';
import { RestaurantService } from '../../../core/application/services/Restaurant/RestaurantService';
import { RestaurantAdapter } from '../../../core/infrastructure/adapters/restaurant/RestaurantAdapter';
import { useAuthContext } from '../../../shared/context/useAuthContext';

interface RestaurantContextType {
  restaurantId: number | null;
  restaurantName: string | null;
  isLoading: boolean;
  error: string | null;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated, activeRole } = useAuthContext();
  const [restaurantId, setRestaurantId] = useState<number | null>(null);
  const [restaurantName, setRestaurantName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoize the service to avoid unnecessary re-instantiations
  const restaurantService = useMemo(() => new RestaurantService(new RestaurantAdapter()), []);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      // Check if user is authenticated and has the restaurant role active
      if (!isAuthenticated || !user?.id) {
          setRestaurantId(null);
          setRestaurantName(null);
          return;
      }

      const currentRole = (activeRole || '').toLowerCase();
      if (!currentRole.includes('restaurante') && !currentRole.includes('restaurant')) {
          return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const userId = parseInt(user.id);
        if (isNaN(userId)) {
             console.warn("Invalid user ID:", user.id);
             setIsLoading(false);
             return;
        }

        const response = await restaurantService.getRestaurantNameByUserId(userId);
        
        if (!response.success) {
             console.warn("Restaurant data fetch failed:", response.message);
             setError(response.message || 'Restaurant not found for this user');
             setRestaurantId(null);
             setRestaurantName(null);
        } else if (response.data) {
             setRestaurantId(response.data.id);
             setRestaurantName(response.data.name);
        } else {
             setError(response.message || 'Failed to fetch restaurant data');
        }

      } catch (err: any) {
        console.error("Error fetching restaurant data:", err);
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurantData();
  }, [isAuthenticated, user, activeRole, restaurantService]);

  const value = useMemo(() => ({
    restaurantId,
    restaurantName,
    isLoading,
    error
  }), [restaurantId, restaurantName, isLoading, error]);

  return <RestaurantContext.Provider value={value}>{children}</RestaurantContext.Provider>;
};

export const useRestaurantContext = () => {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error('useRestaurantContext must be used within a RestaurantProvider');
  }
  return context;
};
