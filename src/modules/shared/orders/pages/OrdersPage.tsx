import { useOrders } from '../hooks/useOrders';
import type { OrderStatusDto } from '../../../core/application/dtos/order/OrderDto';
import { LoadingSpinner } from '../../../shared/ui/LoadingSpinner';
import { formatCurrency } from '../../../shared/utils/formatCurrency';
import { formatDate } from '../../../shared/utils/formatDate';
import './OrdersPage.css';

const getStatusLabel = (status: OrderStatusDto): string => {
  const labels: Record<OrderStatusDto, string> = {
    pending: 'Pendiente',
    confirmed: 'Confirmado',
    preparing: 'Preparando',
    ready: 'Listo',
    on_the_way: 'En camino',
    delivered: 'Entregado',
    cancelled: 'Cancelado',
  };
  return labels[status] || status;
};

const getStatusColor = (status: OrderStatusDto): string => {
  const colors: Record<OrderStatusDto, string> = {
    pending: '#f39c12',
    confirmed: '#3498db',
    preparing: '#9b59b6',
    ready: '#2ecc71',
    on_the_way: '#1abc9c',
    delivered: '#27ae60',
    cancelled: '#e74c3c',
  };
  return colors[status] || '#95a5a6';
};

export const OrdersPage = () => {
  const { orders, loadingState } = useOrders();

  if (loadingState === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <div className="orders-page">
      <h1 className="page-title">Mis Pedidos</h1>
      {orders.length === 0 ? (
        <div className="orders-empty">
          <p>No tienes pedidos aún</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <h3>{order.restaurantName}</h3>
                  <p className="order-date">{formatDate(order.createdAt)}</p>
                </div>
                <span
                  className="order-status"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {getStatusLabel(order.status)}
                </span>
              </div>
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <span>{item.quantity}x {item.product.name}</span>
                    <span>{formatCurrency(item.subtotal)}</span>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <div className="order-total">
                  <span>Total:</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

