import type { CartItemDto } from '../../../../core/application/dtos/cart/CartDto';
import { formatCurrency } from '../../../../shared/utils/formatCurrency';
import { Button } from '../../../../shared/ui/Button';
import './CartItem.css';

interface CartItemProps {
  item: CartItemDto;
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
}

export const CartItem = ({ item, onIncrease, onDecrease, onRemove }: CartItemProps) => {
  return (
    <div className="cart-item">
      <img src={item.product.image} alt={item.product.name} className="cart-item-image" />
      <div className="cart-item-info">
        <h4 className="cart-item-name">{item.product.name}</h4>
        <p className="cart-item-price">{formatCurrency(item.subtotal)}</p>
        {item.specialInstructions && (
          <p className="cart-item-instructions">{item.specialInstructions}</p>
        )}
      </div>
      <div className="cart-item-controls">
        <div className="quantity-controls">
          <Button
            variant="outline"
            size="small"
            onClick={() => onDecrease(item.productId)}
          >
            -
          </Button>
          <span className="quantity">{item.quantity}</span>
          <Button
            variant="outline"
            size="small"
            onClick={() => onIncrease(item.productId)}
          >
            +
          </Button>
        </div>
        <Button
          variant="danger"
          size="small"
          onClick={() => onRemove(item.productId)}
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
};

