import { useParams, Link } from 'react-router-dom';
import { useRestaurantDetail } from '../hooks/useRestaurantDetail';
import { MenuCategory } from '../components/MenuCategory/MenuCategory';
import './RestaurantDetailPage.css';

export const RestaurantDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { restaurant, menu, loadingState, error } = useRestaurantDetail(id);

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

    if (loadingState === 'error' || !restaurant) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger" role="alert">
                    {error || 'Restaurante no encontrado'}
                </div>
                <Link to="/restaurants" className="btn btn-primary mt-3">
                    Volver a Restaurantes
                </Link>
            </div>
        );
    }

    return (
        <div className="restaurant-detail-page fade-in">
            {/* Hero Banner */}
            <div className="restaurant-banner" style={{ backgroundImage: `url(${restaurant.image})` }}>
                <div className="banner-overlay">
                    <div className="container h-100 d-flex flex-column justify-content-end pb-5">
                        <h1 className="text-white fw-bold display-4 mb-2">{restaurant.name}</h1>
                        <p className="text-white-50 lead mb-3">{restaurant.description}</p>
                        <div className="d-flex gap-3 text-white">
                            <div className="d-flex align-items-center bg-white text-dark px-3 py-1 rounded-pill">
                                <i className="bi bi-star-fill text-warning me-2"></i>
                                <span className="fw-bold">{restaurant.rating}</span>
                            </div>
                            <div className="d-flex align-items-center bg-white text-dark px-3 py-1 rounded-pill">
                                <i className="bi bi-clock me-2"></i>
                                <span>{restaurant.deliveryTime} min</span>
                            </div>
                            <div className="d-flex align-items-center bg-white text-dark px-3 py-1 rounded-pill">
                                <i className="bi bi-bicycle me-2"></i>
                                <span>{restaurant.deliveryFee === 0 ? 'Gratis' : `$${restaurant.deliveryFee.toFixed(2)}`}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu Content */}
            <div className="container py-5">
                <div className="row">
                    {/* Categories Sidebar (Desktop) */}
                    <div className="col-lg-3 d-none d-lg-block">
                        <div className="sticky-top pt-4" style={{ top: '20px' }}>
                            <h5 className="fw-bold mb-3">Menú</h5>
                            <div className="list-group list-group-flush">
                                {menu.map((category) => (
                                    <a
                                        key={category.id}
                                        href={`#category-${category.id}`}
                                        className="list-group-item list-group-item-action bg-transparent border-0 ps-0"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.getElementById(`category-${category.id}`)?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                    >
                                        {category.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="col-lg-9">
                        {menu.map((category) => (
                            <div key={category.id} id={`category-${category.id}`} className="pt-4">
                                <MenuCategory category={category} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
