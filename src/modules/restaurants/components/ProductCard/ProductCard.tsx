import type { ProductDto } from '../../../../core/application/dtos/restaurant/ProductDto';
import './ProductCard.css';

import { useCart } from '../../../../modules/cart/context/CartContext';

interface ProductCardProps {
    product: ProductDto;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const { name, description, price, image } = product;
    const { addItem } = useCart();

    return (
        <div className="card h-100 product-card shadow-sm border-0">
            <div className="row g-0 h-100">
                <div className="col-4 col-sm-12 product-image-container">
                    <img
                        src={image}
                        className="img-fluid rounded-start product-img"
                        alt={name}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://placehold.co/400x300?text=Plato';
                        }}
                    />
                </div>
                <div className="col-8 col-sm-12">
                    <div className="card-body d-flex flex-column h-100 p-3">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <h6 className="card-title fw-bold mb-0 text-truncate-2">{name}</h6>
                            <span className="fw-bold text-primary ms-2">${price.toFixed(2)}</span>
                        </div>

                        <p className="card-text text-muted small mb-3 flex-grow-1 text-truncate-3">
                            {description}
                        </p>

                        <button
                            className="btn btn-outline-primary btn-sm w-100 mt-auto rounded-pill"
                            onClick={() => addItem(product)}
                        >
                            <i className="bi bi-plus-lg me-1"></i>
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
