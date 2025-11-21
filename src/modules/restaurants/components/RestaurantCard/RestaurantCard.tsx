import { useNavigate } from 'react-router-dom';
import type { RestaurantDto } from '../../../../core/application/dtos/restaurant/RestaurantDto';
import './RestaurantCard.css';

interface RestaurantCardProps {
    restaurant: RestaurantDto;
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
    const { id, name, image, rating, deliveryTime, deliveryFee, cuisine } = restaurant;
    const navigate = useNavigate();

    return (
        <div
            className="card h-100 restaurant-card shadow-sm border-0"
            onClick={() => navigate(`/restaurants/${id}`)}
        >
            <div className="position-relative">
                <img
                    src={image}
                    className="card-img-top restaurant-img"
                    alt={name}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://placehold.co/600x400?text=Restaurante';
                    }}
                />
                <span className="badge bg-white text-dark position-absolute top-0 end-0 m-3 px-2 py-1 rounded-pill shadow-sm">
                    <i className="bi bi-clock me-1"></i>
                    {deliveryTime} min
                </span>
            </div>

            <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title fw-bold mb-0 text-truncate">{name}</h5>
                    <div className="d-flex align-items-center bg-light px-2 py-1 rounded">
                        <i className="bi bi-star-fill text-warning me-1" style={{ fontSize: '0.8rem' }}></i>
                        <span className="fw-bold small">{rating}</span>
                    </div>
                </div>

                <p className="card-text text-muted small mb-3 text-truncate">
                    {cuisine.join(' • ')}
                </p>

                <div className="d-flex align-items-center text-muted small border-top pt-3">
                    <i className="bi bi-bicycle me-2"></i>
                    <span>Envío: </span>
                    <span className="fw-bold ms-1 text-success">
                        {deliveryFee === 0 ? 'Gratis' : `$${deliveryFee.toFixed(2)}`}
                    </span>
                </div>
            </div>
        </div>
    );
};
