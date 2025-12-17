import { useState, useEffect } from 'react';
import { useAuthContext } from '../../../../shared/context/useAuthContext';
import { useOrder } from '../../../shared/orders/hooks/useOrder';
import type { CustomerOrderStatus } from '../../../../core/domain/enums/customer-order-status';
import '../styles/ClientOrdersPage.css';

interface DisplayOrder {
  id: string; // Display ID (e.g. #123)
  orderId: number; // Real ID
  restaurantName: string;
  restaurantImage: string;
  date: string;
  items: string[];
  total: number;
  status: string; // Raw status from backend
  statusLabel: string; // Friendly label
  statusStep: number; // 1-4
}

export const ClientOrdersPage = () => {
    const { user } = useAuthContext();
    const { fetchMyOrders, myOrders, loadingState } = useOrder();
    const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

    useEffect(() => {
        if (user?.id) {
            fetchMyOrders(parseInt(user.id));
        }
    }, [user]);

    const getStatusInfo = (status: string): { label: string, step: number } => {
        // Map backend status strings to frontend UI
        switch (status as CustomerOrderStatus) {
            case 'RECEIVED': return { label: 'Recibido', step: 1 };
            case 'IN_KITCHEN': return { label: 'En Cocina', step: 2 };
            case 'ON_THE_WAY': return { label: 'En Camino', step: 3 };
            case 'DELIVERED': return { label: 'Entregado', step: 4 };
            default: return { label: status, step: 0 };
        }
    };

    const mapOrders = (): DisplayOrder[] => {
        return myOrders.map(order => {
            const { label, step } = getStatusInfo(order.status);
            // Derive restaurant info from first item (assuming order is from one restaurant)
            const firstItem = order.items[0]; 
            const restaurantName = firstItem ? firstItem.restaurantName : 'Restaurante';

            
            return {
                id: `#${order.orderId}`,
                orderId: order.orderId,
                restaurantName: restaurantName, // Fixed: Use the variable
                restaurantImage: firstItem?.imageUrl || "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200&h=200&fit=crop",
                date: new Date(order.createdAt).toLocaleString(),
                items: order.items.map(i => `${i.quantity}x ${i.productName}`),
                total: order.totalAmount,
                status: order.status,
                statusLabel: label,
                statusStep: step
            };
        });
    };

    const allOrders = mapOrders();
    const activeOrders = allOrders.filter(o => o.statusStep < 4);
    const historyOrders = allOrders.filter(o => o.statusStep >= 4);

    const displayedOrders = activeTab === 'active' ? activeOrders : historyOrders;

    if (loadingState === 'loading') {
        return <div className="text-center py-5"><div className="spinner-border text-primary"></div><p className="mt-2">Cargando tus pedidos...</p></div>;
    }

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
                            <div key={order.orderId} className={`col-12 col-lg-8 animate-slide-in`} style={{ animationDelay: `${(index + 1) * 0.1}s` }}>
                                <div className="order-card">
                                    <div className="order-header">
                                        <div>
                                            <span className="order-id">{order.id}</span>
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
                                                <h5 className="mb-1 text-muted">Restaurante: <span className="fw-bolder text-primary fs-5">{order.restaurantName}</span></h5>
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
                                            <span className={`badge rounded-pill ${order.status === 'CANCELLED' ? 'bg-danger' : 'bg-info'} text-white`}>
                                                Estado: {order.statusLabel}
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
