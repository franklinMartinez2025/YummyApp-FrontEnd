import { useCart } from '../../context/CartContext';
import './CartFloatingButton.css';

export const CartFloatingButton = () => {
    const { toggleCart, totalItems } = useCart();

    if (totalItems === 0) return null;

    return (
        <button
            className="cart-floating-btn btn btn-primary rounded-circle shadow-lg d-flex align-items-center justify-content-center"
            onClick={toggleCart}
            aria-label="Ver carrito"
        >
            <div className="position-relative">
                <i className="bi bi-cart-fill fs-4"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light">
                    {totalItems}
                    <span className="visually-hidden">productos en el carrito</span>
                </span>
            </div>
        </button>
    );
};
