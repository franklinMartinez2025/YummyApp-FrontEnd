import { useRestaurants } from '../hooks/useRestaurants';

import './RestaurantsPage.css';

export const RestaurantsPage = () => {
  const { loadingState, error } = useRestaurants();

  if (loadingState === 'loading') {
    return (
      <div className="restaurants-loading">
        {/* TODO: Implementar loading */}
      </div>
    );
  }

  if (loadingState === 'error') {
    return (
      <div className="restaurants-error">
        <p>Error: {error}</p>
      </div>
    );
  }

 
};

