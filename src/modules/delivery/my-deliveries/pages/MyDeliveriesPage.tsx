import { useNavigate } from 'react-router-dom';
import '../styles/MyDeliveriesPage.css';

const MyDeliveriesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="my-deliveries-page">
        {/* Map Area */}
        <div className="map-container">
            <div className="map-overlay">
                <button className="btn-map-control" onClick={() => navigate('/delivery/dashboard')}>
                    <i className="bi bi-arrow-left"></i>
                </button>
                <button className="btn-map-control">
                    <i className="bi bi-crosshair"></i>
                </button>
            </div>
            {/* Mock Route Line could go here */}
        </div>

        {/* Bottom Sheet */}
        <div className="delivery-sheet animate-enter">
            <div className="sheet-handle"></div>
            
            <div className="customer-info">
                <div className="customer-avatar">JP</div>
                <div className="customer-details">
                    <h3>Juan Pérez</h3>
                    <p>Calle Los Pinos 456, Miraflores</p>
                </div>
            </div>

            <div className="delivery-actions">
                <button className="btn-action">
                    <i className="bi bi-telephone"></i> Llamar
                </button>
                <button className="btn-action">
                    <i className="bi bi-chat"></i> Chat
                </button>
                <button className="btn-action">
                    <i className="bi bi-shield-exclamation"></i> Ayuda
                </button>
            </div>

            <div className="order-details mb-4">
                <h6 className="fw-bold mb-2 text-dark">Detalles del Pedido #9021</h6>
                <ul className="list-unstyled text-muted small">
                    <li>1x Hamburguesa Royal</li>
                    <li>1x Papas Fritas Grandes</li>
                    <li>1x Coca Cola Zero</li>
                </ul>
            </div>

            <button className="btn-main-action" onClick={() => navigate('/delivery/dashboard')}>
                <span>Desliza para completar</span>
                <div className="swipe-indicator">
                    <i className="bi bi-chevron-right"></i>
                </div>
            </button>
        </div>
    </div>
  );
};

export default MyDeliveriesPage;
