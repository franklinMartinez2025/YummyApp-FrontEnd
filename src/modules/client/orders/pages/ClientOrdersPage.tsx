import { useState } from 'react';
import '../styles/ClientOrdersPage.css';

// Types
type OrderStatus = 'pending' | 'preparing' | 'shipping' | 'delivered' | 'cancelled';

interface Order {
  id: string;
  restaurantName: string;
  restaurantImage: string;
  date: string;
  items: string[];
  total: number;
  status: OrderStatus;
  statusStep: number; // 1-4 for progress line
}

// Mock Data
const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-99283",
    restaurantName: "Burger King - Centro",
    restaurantImage: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200&h=200&fit=crop",
    date: "Hoy, 14:30",
    items: ["Whopper Jr. Combo", "Onion Rings"],
    total: 18.50,
    status: 'preparing',
    statusStep: 2
  },
  {
    id: "ORD-99231",
    restaurantName: "Pizza Hut",
    restaurantImage: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=200&h=200&fit=crop",
    date: "Ayer, 20:15",
    items: ["Pepperoni Grande", "Coca Cola 2L"],
    total: 32.00,
    status: 'delivered',
    statusStep: 4
  }
];

export const ClientOrdersPage = () => {
    const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

    // Filter logic
    const activeOrders = MOCK_ORDERS.filter(o => ['pending', 'preparing', 'shipping'].includes(o.status));
    const historyOrders = MOCK_ORDERS.filter(o => ['delivered', 'cancelled'].includes(o.status));

    const displayedOrders = activeTab === 'active' ? activeOrders : historyOrders;

    const getStatusLabel = (status: OrderStatus) => {
        const labels = {
            pending: 'Pendiente',
            preparing: 'Preparando',
            shipping: 'En Camino',
            delivered: 'Entregado',
            cancelled: 'Cancelado'
        };
        return labels[status];
    };

    return (
        <div className="client-orders-page py-5">
            <div className="container">
                <div className="text-center mb-5 animate-slide-in">
                    <h1 className="fw-bold mb-2">Mis Pedidos</h1>
                    <p className="text-secondary">Sigue el estado de tu comida en tiempo real</p>
                    
                    <div className="orders-tabs mt-4">
                        <button 
                            className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
                            onClick={() => setActiveTab('active')}
                        >
                            En Curso <span className="badge bg-white text-dark ms-2 rounded-pill">{activeOrders.length}</span>
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                            onClick={() => setActiveTab('history')}
                        >
                            Historial
                        </button>
                    </div>
                </div>

                <div className="row g-4 d-flex justify-content-center">
                    {displayedOrders.length === 0 ? (
                        <div className="col-12 text-center py-5 animate-slide-in delay-1">
                            <i className="bi bi-cart-x empty-state-icon"></i>
                            <h3>No tienes pedidos {activeTab === 'active' ? 'en curso' : 'en el historial'}</h3>
                            <button className="btn btn-primary btn-lg mt-3 rounded-pill px-4">
                                Explorar Restaurantes
                            </button>
                        </div>
                    ) : (
                        displayedOrders.map((order, index) => (
                            <div key={order.id} className={`col-12 col-lg-8 animate-slide-in`} style={{ animationDelay: `${(index + 1) * 0.1}s` }}>
                                <div className="order-card">
                                    <div className="order-header">
                                        <div>
                                            <span className="order-id">#{order.id}</span>
                                            <div className="order-date mt-1">
                                                <i className="bi bi-calendar3 me-2"></i>{order.date}
                                            </div>
                                        </div>
                                        {activeTab === 'active' && (
                                            <button className="btn-track">
                                                <i className="bi bi-geo-alt-fill me-2"></i>Rastrear
                                            </button>
                                        )}
                                    </div>
                                    
                                    <div className="order-body">
                                        <div className="restaurant-info">
                                            <img src={order.restaurantImage} alt={order.restaurantName} className="restaurant-logo" />
                                            <div>
                                                <h5 className="mb-1 fw-bold">{order.restaurantName}</h5>
                                                <small className="text-muted">{order.items.join(", ")}</small>
                                            </div>
                                            <div className="ms-auto text-end">
                                                <div className="total-price text-primary">${order.total.toFixed(2)}</div>
                                            </div>
                                        </div>

                                        {/* Timeline Visualization */}
                                            <div className="status-timeline">
                                            {/* Dynamic Width for progress bar based on statusStep (1=0%, 2=33%, 3=66%, 4=100%) */}
                                            <div className="status-line-fill" style={{ width: `${((order.statusStep - 1) / 3) * 100}%` }}></div>
                                            
                                            <div className={`status-step ${order.statusStep >= 1 ? 'active' : ''}`}>
                                                <div className="step-dot"><i className="bi bi-receipt"></i></div>
                                                <span className="step-label">Recibido</span>
                                            </div>
                                            <div className={`status-step ${order.statusStep >= 2 ? 'active' : ''}`}>
                                                <div className="step-dot"><i className="bi bi-fire"></i></div>
                                                <span className="step-label">Cocina</span>
                                            </div>
                                            <div className={`status-step ${order.statusStep >= 3 ? 'active' : ''}`}>
                                                <div className="step-dot"><i className="bi bi-bicycle"></i></div>
                                                <span className="step-label">Camino</span>
                                            </div>
                                            <div className={`status-step ${order.statusStep >= 4 ? 'active' : ''}`}>
                                                <div className="step-dot"><i className="bi bi-house-door-fill"></i></div>
                                                <span className="step-label">Llegó</span>
                                            </div>
                                        </div>
                                        <div className="text-center mt-3">
                                            <span className={`badge rounded-pill ${order.status === 'cancelled' ? 'bg-danger' : 'bg-info'} text-white`}>
                                                Estado: {getStatusLabel(order.status)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientOrdersPage;
