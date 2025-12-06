import { useNavigate } from 'react-router-dom';
import '../styles/AvailableOrdersPage.css';

const AvailableOrdersPage = () => {
  const navigate = useNavigate();

  return (
    <div className="available-orders-page">
        <div className="orders-header">
            <h2 className="fw-bold mb-0 text-dark" style={{fontSize: '1.25rem'}}>Pedidos Cercanos</h2>
            <button className="refresh-btn">
                <i className="bi bi-arrow-clockwise"></i>
            </button>
        </div>

        <div className="container-fluid px-3 pt-3">
            {[1, 2].map(id => (
                <div key={id} className="order-ticket animate-enter">
                    <div className="ticket-header">
                        <span className="ticket-price">S/ 12.50</span>
                        <span className="ticket-distance">
                            <i className="bi bi-geo-alt-fill"></i> 2.4 km
                        </span>
                    </div>
                    <div className="ticket-body">
                        <div className="route-step">
                            <div className="step-icon">
                                <div className="dot dot-pickup"></div>
                                <div className="connector"></div>
                            </div>
                            <div className="step-info">
                                <h5>Bembos - Larcomar</h5>
                                <p>Av. Larco 1234, Miraflores</p>
                            </div>
                        </div>
                        <div className="route-step">
                            <div className="step-icon">
                                <div className="dot dot-dropoff"></div>
                            </div>
                            <div className="step-info">
                                <h5>Juan Pérez</h5>
                                <p>Calle Los Pinos 456, Dpto 201</p>
                            </div>
                        </div>
                    </div>
                    <div className="ticket-footer">
                        <button className="btn-accept" onClick={() => navigate('/delivery/my-deliveries')}>
                            Aceptar Pedido
                        </button>
                    </div>
                </div>
            ))}

            <div className="empty-state animate-enter delay-3">
                <div className="radar-spinner"></div>
                <p>Buscando más pedidos cerca de ti...</p>
            </div>
        </div>
    </div>
  );
};

export default AvailableOrdersPage;
