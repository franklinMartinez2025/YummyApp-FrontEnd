import { useRestaurants } from '../hooks/useRestaurants';
import { RestaurantCard } from '../components/RestaurantCard/RestaurantCard';
import './RestaurantsPage.css';

export const RestaurantsPage = () => {
  const { restaurants, loadingState, error } = useRestaurants();

  if (loadingState === 'loading') {
    return (
      <div className="container py-5">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  if (loadingState === 'error') {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5 fade-in">
      <h2 className="mb-4 fw-bold">Restaurantes Disponibles</h2>

      {restaurants.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-shop display-1 text-muted mb-3"></i>
          <p className="lead text-muted">No hay restaurantes disponibles en este momento.</p>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="col">
              <RestaurantCard restaurant={restaurant} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

