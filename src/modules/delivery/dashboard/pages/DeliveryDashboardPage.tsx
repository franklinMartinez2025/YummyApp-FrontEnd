import { useState } from 'react';
import { useAuthContext } from '../../../../shared/context/useAuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/DeliveryDashboardPage.css';

const DeliveryDashboardPage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(false);

  return (
    <div className="delivery-dashboard-page">
      
      {/* Hero Header */}
      <div className="delivery-hero animate-enter">
        <div className="text-center">
            <h1 className="delivery-greeting">Hola, {user?.fullName?.split(' ')[0] || 'Partner'}!</h1>
            <p className="delivery-subtitle">Listo para rodar hoy?</p>
        </div>
        
        <div className="status-toggle-container">
            <button 
                className={`status-btn ${isOnline ? 'active online' : ''}`}
                onClick={() => setIsOnline(true)}
            >
                Conectado
            </button>
            <button 
                className={`status-btn ${!isOnline ? 'active offline' : ''}`}
                onClick={() => setIsOnline(false)}
            >
                Offline
            </button>
        </div>
      </div>

      <div className="container-fluid px-4 pt-4">
        
        {/* Earnings Overview */}
        <div className="row g-3 mb-4 animate-enter delay-1">
            <div className="col-6">
                <div className="earnings-card">
                    <div className="earnings-icon">
                        <i className="bi bi-cash-stack"></i>
                    </div>
                    <div className="earnings-value">S/ 45</div>
                    <div className="earnings-label">Ganados Hoy</div>
                </div>
            </div>
            <div className="col-6">
                <div className="earnings-card">
                    <div className="earnings-icon" style={{background: '#fff7ed', color: '#f97316'}}>
                        <i className="bi bi-bicycle"></i>
                    </div>
                    <div className="earnings-value">6</div>
                    <div className="earnings-label">Entregas</div>
                </div>
            </div>
        </div>

        {/* Quick Actions */}
        <div className="d-flex flex-column gap-3 animate-enter delay-2">
            <div className="action-card" onClick={() => navigate('/delivery/available')}>
                <div className="action-icon pulse-ring" style={{background: isOnline ? '#ecfdf5' : '#f1f5f9', color: isOnline ? '#10b981' : '#cbd5e1'}}>
                    <i className="bi bi-box-seam"></i>
                </div>
                <div className="action-text">
                    <h4>Ver Pedidos Disponibles</h4>
                    <p>{isOnline ? 'Hay 3 pedidos cerca de ti' : 'Conéctate para ver pedidos'}</p>
                </div>
                <i className="bi bi-chevron-right ms-auto text-muted"></i>
            </div>

            <div className="action-card" onClick={() => navigate('/delivery/my-deliveries')}>
                <div className="action-icon">
                    <i className="bi bi-map"></i>
                </div>
                <div className="action-text">
                    <h4>Entrega Actual</h4>
                    <p>No tienes entregas en curso</p>
                </div>
                <i className="bi bi-chevron-right ms-auto text-muted"></i>
            </div>

            <div className="action-card">
                <div className="action-icon" style={{background: '#fefce8', color: '#eab308'}}>
                    <i className="bi bi-trophy"></i>
                </div>
                <div className="action-text">
                    <h4>Mis Logros</h4>
                    <p>Nivel Plata • 4.9 Estrellas</p>
                </div>
                <i className="bi bi-chevron-right ms-auto text-muted"></i>
            </div>
        </div>

      </div>
    </div>
  );
};

export default DeliveryDashboardPage;
