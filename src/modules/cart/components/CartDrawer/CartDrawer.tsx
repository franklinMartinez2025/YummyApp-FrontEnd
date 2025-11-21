import { useCart } from '../../context/CartContext';
import { CartItem } from '../CartItem/CartItem';
import './CartDrawer.css';

export const CartDrawer = () => {
    const { items, isOpen, closeCart, totalAmount, totalItems } = useCart();

    return (
        <>
            {/* Backdrop */}
            <div
                className={`cart-backdrop ${isOpen ? 'show' : ''}`}
                onClick={closeCart}
            ></div>

            {/* Drawer */}
            <div className={`cart-drawer ${isOpen ? 'open' : ''} d-flex flex-column bg-white shadow-lg`}>
                <div className="cart-header p-3 border-bottom d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold">
                        Tu Pedido <span className="badge bg-primary rounded-pill ms-2">{totalItems}</span>
                    </h5>
                    <button className="btn-close" onClick={closeCart} aria-label="Cerrar carrito"></button>
                </div>

                <div className="cart-body flex-grow-1 p-3 overflow-auto">
                    {items.length === 0 ? (
                        <div className="h-100 d-flex flex-column align-items-center justify-content-center text-muted">
                            <i className="bi bi-cart-x display-1 mb-3 opacity-50"></i>
                            <p className="mb-0">Tu carrito está vacío</p>
                            <button className="btn btn-outline-primary mt-3" onClick={closeCart}>
                                Explorar Menú
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <CartItem key={item.product.id} item={item} />
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="cart-footer p-3 border-top bg-light">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted">Total</span>
                            <span className="h4 mb-0 fw-bold text-primary">${totalAmount.toFixed(2)}</span>
                        </div>
                        <button className="btn btn-primary w-100 py-2 fw-bold rounded-pill">
                            Ir a Pagar
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};
