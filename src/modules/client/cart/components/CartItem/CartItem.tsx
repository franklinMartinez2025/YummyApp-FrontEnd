import { useCart } from '../../context/CartContext';
import type { CartItemDto, CartItemModifierDto } from '../../../../core/application/dtos/cart/CartDto';
import './CartItem.css';

interface CartItemProps {
  item: CartItemDto;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity, productId } = item;

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
          <div className="d-flex flex-column">
              <h6 className="mb-0 text-truncate-2 small fw-bold">{product.name}</h6>
              {item.selectedModifiers && item.selectedModifiers.length > 0 && (
                  <small className="text-muted" style={{fontSize: '0.75rem'}}>
                      {item.selectedModifiers.map((mod: CartItemModifierDto) => mod.options.map((o: {name: string}) => o.name).join(', ')).join(', ')}
                  </small>
              )}
              {item.specialInstructions && (
                  <small className="text-muted fst-italic" style={{fontSize: '0.75rem'}}>
                      "{item.specialInstructions}"
                  </small>
              )}
          </div>
          <button
            className="btn btn-link text-danger p-0 ms-2"
            onClick={() => removeItem(productId)}
            aria-label="Eliminar producto"
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>

        <div className="d-flex justify-content-between align-items-end mt-2">
          <div className="quantity-controls d-flex align-items-center border rounded-pill px-2 py-1">
            <button
              className="btn btn-sm p-0"
              onClick={() => updateQuantity(productId, quantity - 1)}
              disabled={quantity <= 1}
            >
              <i className="bi bi-dash"></i>
            </button>
            <span className="mx-2 small fw-bold">{quantity}</span>
            <button
              className="btn btn-sm p-0"
              onClick={() => updateQuantity(productId, quantity + 1)}
            >
              <i className="bi bi-plus"></i>
            </button>
          </div>

          <span className="fw-bold text-primary">
            ${item.subtotal.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
