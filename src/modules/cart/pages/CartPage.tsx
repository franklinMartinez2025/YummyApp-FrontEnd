import { useCart } from '../hooks/useCart';
import { CartItem } from '../components/CartItem/CartItem';
import { Button } from '../../../shared/ui/Button';
import { LoadingSpinner } from '../../../shared/ui/LoadingSpinner';
import { formatCurrency } from '../../../shared/utils/formatCurrency';
import './CartPage.css';

export const CartPage = () => {
  const { cart, loadingState, updateQuantity, removeItem } = useCart();

  const handleIncrease = (productId: string, currentQuantity: number) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  const handleDecrease = (productId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    }
  };

  const handleRemove = (productId: string) => {
    removeItem(productId);
  };

  if (loadingState === 'loading') {
    return <LoadingSpinner />;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="cart-page">
        <h1 className="page-title">Mi Carrito</h1>
        <div className="cart-empty">
          <p>Tu carrito está vacío</p>
          <Button variant="primary" onClick={() => window.location.href = '/restaurants'}>
            Ver Restaurantes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="page-title">Mi Carrito</h1>
      <div className="cart-content">
        <div className="cart-items">
          {cart.items.map((item) => (
            <CartItem
              key={item.productId}
              item={item}
              onIncrease={() => handleIncrease(item.productId, item.quantity)}
              onDecrease={() => handleDecrease(item.productId, item.quantity)}
              onRemove={() => handleRemove(item.productId)}
            />
          ))}
        </div>
        <div className="cart-summary">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatCurrency(cart.subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Envío</span>
            <span>{formatCurrency(cart.deliveryFee)}</span>
          </div>
          <div className="summary-row">
            <span>Impuestos</span>
            <span>{formatCurrency(cart.tax)}</span>
          </div>
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>{formatCurrency(cart.total)}</span>
          </div>
          <Button variant="primary" size="large" className="checkout-button">
            Proceder al Pago
          </Button>
        </div>
      </div>
    </div>
  );
};

