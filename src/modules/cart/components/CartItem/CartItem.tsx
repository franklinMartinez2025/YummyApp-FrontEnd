import { useCart } from '../../context/CartContext';
import type { CartItemDto } from '../../../../core/application/dtos/cart/CartItemDto';
import './CartItem.css';

interface CartItemProps {
  item: CartItemDto;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  return (
    <div className="cart-item d-flex align-items-center mb-3 pb-3 border-bottom">
      <img
        src={product.image}
        alt={product.name}
        className="cart-item-img rounded me-3"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = 'https://placehold.co/100x100?text=Plato';
        }}
      />

      <div className="flex-grow-1">
        <div className="d-flex justify-content-between align-items-start mb-1">
          <h6 className="mb-0 text-truncate-2 small fw-bold">{product.name}</h6>
          <button
            className="btn btn-link text-danger p-0 ms-2"
            onClick={() => removeItem(product.id)}
            aria-label="Eliminar producto"
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>

        <div className="d-flex justify-content-between align-items-end">
          <div className="quantity-controls d-flex align-items-center border rounded-pill px-2 py-1">
            <button
              className="btn btn-sm p-0"
              onClick={() => updateQuantity(product.id, quantity - 1)}
              disabled={quantity <= 1}
            >
              <i className="bi bi-dash"></i>
            </button>
            <span className="mx-2 small fw-bold">{quantity}</span>
            <button
              className="btn btn-sm p-0"
              onClick={() => updateQuantity(product.id, quantity + 1)}
            >
              <i className="bi bi-plus"></i>
            </button>
          </div>

          <span className="fw-bold text-primary">
            ${(product.price * quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
