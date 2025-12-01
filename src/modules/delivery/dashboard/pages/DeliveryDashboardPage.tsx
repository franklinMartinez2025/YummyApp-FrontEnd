import { useAuthContext } from '../../../../shared/context/useAuthContext';
import '../styles/DeliveryPages.css';

const DeliveryDashboardPage = () => {
  const { user } = useAuthContext();
  const isOnline = true; // This would come from state/context

  return (
    <div className="delivery-page">
      <header className="delivery-header">
        <h1 className="delivery-header-title">Hola, {user?.fullName?.split(' ')[0]}</h1>
        <div className={`delivery-status-badge ${isOnline ? 'delivery-status-online' : 'delivery-status-offline'}`}>
          <span className="status-dot"></span>
          {isOnline ? 'En línea' : 'Desconectado'}
        </div>
      </header>

      <div className="delivery-stats-grid">
        <div className="delivery-stat-card">
          <div className="stat-icon earnings">
            <i className="bi bi-cash-coin"></i>
          </div>
          <div className="stat-info">
            <span className="stat-label">Ganancias Hoy</span>
            <span className="stat-value">$45.50</span>
          </div>
        </div>
        <div className="delivery-stat-card">
          <div className="stat-icon orders">
            <i className="bi bi-box-seam"></i>
          </div>
          <div className="stat-info">
            <span className="stat-label">Entregas Hoy</span>
            <span className="stat-value">8</span>
          </div>
        </div>
      </div>

      <div className="active-delivery-section">
        <h2 className="section-title">Entrega en Curso</h2>
        <div className="empty-state-card">
          <i className="bi bi-bicycle"></i>
          <p>No tienes entregas activas en este momento.</p>
          <button className="btn-primary-sm">Ver pedidos disponibles</button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDashboardPage;
