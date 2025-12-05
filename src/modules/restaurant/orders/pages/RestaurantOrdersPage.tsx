import { useState } from 'react';
import '../../orders/styles/RestaurantOrdersPage.css';

// Types
type OrderStatus = 'new' | 'prep' | 'ready' | 'done';

interface OrderItem {
    name: string;
    qty: number;
}

interface Order {
    id: string;
    customer: string;
    status: OrderStatus;
    time: string;
    items: OrderItem[];
    total: number;
    paymentMethod: string;
}

// Mock Data
const MOCK_ORDERS: Order[] = [
    {
        id: "#ORD-9021",
        customer: "Juan Pérez",
        status: 'new',
        time: "12:45 PM",
        items: [{name: "Lomo Saltado", qty: 2}, {name: "Inca Kola 1L", qty: 1}],
        total: 42.00,
        paymentMethod: "Tarjeta"
    },
    {
        id: "#ORD-9022",
        customer: "Maria Garcia",
        status: 'new',
        time: "12:48 PM",
        items: [{name: "Ceviche Mixto", qty: 1}],
        total: 25.00,
        paymentMethod: "Efectivo"
    },
    {
        id: "#ORD-9019",
        customer: "Carlos Diaz",
        status: 'prep',
        time: "12:30 PM",
        items: [{name: "Ají de Gallina", qty: 1}, {name: "Papa a la Huancaína", qty: 1}],
        total: 28.50,
        paymentMethod: "Yape"
    },
    {
        id: "#ORD-9018",
        customer: "Ana Lopez",
        status: 'ready',
        time: "12:15 PM",
        items: [{name: "Pizza Familiar", qty: 1}],
        total: 35.00,
        paymentMethod: "Tarjeta"
    },
    {
        id: "#ORD-9010",
        customer: "Cliente Mostrador",
        status: 'done',
        time: "11:50 AM",
        items: [{name: "Café Americano", qty: 1}, {name: "Sandwich de Pollo", qty: 1}],
        total: 12.00,
        paymentMethod: "Efectivo"
    }
];

const RestaurantOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  // Helper to move order to next status
  const advanceOrder = (orderId: string, currentStatus: OrderStatus) => {
    let nextStatus: OrderStatus = currentStatus;
    if (currentStatus === 'new') nextStatus = 'prep';
    else if (currentStatus === 'prep') nextStatus = 'ready';
    else if (currentStatus === 'ready') nextStatus = 'done';

    if (nextStatus !== currentStatus) {
        setOrders(prev => prev.map(o => o.id === orderId ? {...o, status: nextStatus} : o));
    }
  };

  const getOrdersByStatus = (status: OrderStatus) => orders.filter(o => o.status === status);

  const renderOrderCard = (order: Order) => (
    <div key={order.id} className={`order-card status-${order.status}`}>
        <div className="order-header">
            <span className="order-id">{order.id}</span>
            <span className="order-time">
                <i className="bi bi-clock"></i> {order.time}
            </span>
        </div>
        <div className="mb-2">
            <small className="text-muted fw-bold">{order.customer}</small> <br/>
            <span className="badge bg-light text-dark border">{order.paymentMethod}</span>
        </div>
        
        <ul className="order-items">
            {order.items.map((item, idx) => (
                <li key={idx} className="order-item">
                    <span><span className="item-qty">{item.qty}x</span> {item.name}</span>
                </li>
            ))}
        </ul>

        <div className="order-footer">
            <span className="order-total">S/ {order.total.toFixed(2)}</span>
            
            {order.status === 'new' && (
                <button className="btn-action btn-accept" onClick={() => advanceOrder(order.id, 'new')}>
                    Aceptar <i className="bi bi-check-lg"></i>
                </button>
            )}
            {order.status === 'prep' && (
                <button className="btn-action btn-ready" onClick={() => advanceOrder(order.id, 'prep')}>
                    Listo <i className="bi bi-bell"></i>
                </button>
            )}
            {order.status === 'ready' && (
                <button className="btn-action btn-deliver" onClick={() => advanceOrder(order.id, 'ready')}>
                    Entregar <i className="bi bi-box-seam"></i>
                </button>
            )}
            {order.status === 'done' && (
                <span className="text-success small fw-bold"><i className="bi bi-check-circle-fill"></i> Completado</span>
            )}
        </div>
    </div>
  );

  return (
    <div className="restaurant-orders-page">
      {/* Header */}
      <div className="orders-header d-flex justify-content-between align-items-center">
        <div>
            <h2 className="mb-1 fw-bold">Monitor de Pedidos KDS</h2>
            <p className="text-muted mb-0 small">Kitchen Display System</p>
        </div>
        <div className="d-flex gap-3">
            <div className="text-end">
                <span className="d-block h4 mb-0 fw-bold text-success">S/ {orders.filter(o=>o.status==='done').reduce((acc, curr)=>acc+curr.total, 0).toFixed(2)}</span>
                <small className="text-muted">Ventas del Día</small>
            </div>
            <button className="btn btn-dark rounded-circle" style={{width: 50, height: 50}}>
                <i className="bi bi-arrow-clockwise"></i>
            </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="kanban-board">
        
        {/* Column: New */}
        <div className="kanban-column">
            <div className="kanban-column-header">
                <span className="column-title text-warning-emphasis">
                    <i className="bi bi-exclamation-circle-fill"></i> Nuevos
                </span>
                <span className="column-count">{getOrdersByStatus('new').length}</span>
            </div>
            <div className="kanban-column-body">
                {getOrdersByStatus('new').map(renderOrderCard)}
                {getOrdersByStatus('new').length === 0 && <div className="empty-col">Sin pedidos nuevos</div>}
            </div>
        </div>

        {/* Column: Prep */}
        <div className="kanban-column">
            <div className="kanban-column-header">
                <span className="column-title text-primary">
                    <i className="bi bi-fire"></i> En Cocina
                </span>
                <span className="column-count">{getOrdersByStatus('prep').length}</span>
            </div>
            <div className="kanban-column-body">
                {getOrdersByStatus('prep').map(renderOrderCard)}
                {getOrdersByStatus('prep').length === 0 && <div className="empty-col">Cocina libre</div>}
            </div>
        </div>

        {/* Column: Ready */}
        <div className="kanban-column">
            <div className="kanban-column-header">
                <span className="column-title text-success">
                    <i className="bi bi-check-circle-fill"></i> Listos
                </span>
                <span className="column-count">{getOrdersByStatus('ready').length}</span>
            </div>
            <div className="kanban-column-body">
                {getOrdersByStatus('ready').map(renderOrderCard)}
                {getOrdersByStatus('ready').length === 0 && <div className="empty-col">Nada para recoger</div>}
            </div>
        </div>

        {/* Column: Done */}
        <div className="kanban-column" style={{opacity: 0.8, backgroundColor: '#eaebed'}}>
            <div className="kanban-column-header">
                <span className="column-title text-secondary">
                    <i className="bi bi-clock-history"></i> Entregados
                </span>
                <span className="column-count">{getOrdersByStatus('done').length}</span>
            </div>
            <div className="kanban-column-body">
                {getOrdersByStatus('done').map(renderOrderCard)}
            </div>
        </div>

      </div>
    </div>
  );
};

export default RestaurantOrdersPage;

