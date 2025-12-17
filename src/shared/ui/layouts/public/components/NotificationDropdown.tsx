import React from 'react';
import { Link } from 'react-router-dom';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'order' | 'promo' | 'system';
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Pedido Entregado',
    message: 'Tu pedido de Burger King ha sido entregado exitosamente. ¡Buen provecho!',
    time: 'Hace 5 min',
    isRead: false,
    type: 'order'
  },
  {
    id: '2',
    title: '¡Oportunidad!',
    message: '50% de descuento en tu próximo pedido usando el cupón YUMMY50.',
    time: 'Hace 2 horas',
    isRead: false,
    type: 'promo'
  },
  {
    id: '3',
    title: 'Bienvenido a YummyApp',
    message: 'Gracias por registrarte. Completa tu perfil para obtener mejores recomendaciones.',
    time: 'Hace 1 día',
    isRead: true,
    type: 'system'
  }
];

interface NotificationDropdownProps {
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose }) => {
  return (
    <div 
      className="dropdown-menu dropdown-menu-end show shadow-lg border-0 p-0 animate slideIn" 
      style={{ 
        position: 'absolute', 
        right: 0, 
        top: '100%', 
        minWidth: '320px', 
        maxWidth: '320px',
        zIndex: 1050 
      }}
    >
      <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-light rounded-top">
        <h6 className="m-0 fw-bold text-dark">Notificaciones</h6>
        <span className="badge bg-primary rounded-pill">2 nuevas</span>
      </div>
      
      <div className="list-group list-group-flush" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {MOCK_NOTIFICATIONS.length > 0 ? (
          MOCK_NOTIFICATIONS.map((notif) => (
            <div 
              key={notif.id} 
              className={`list-group-item list-group-item-action p-3 border-0 border-bottom ${!notif.isRead ? 'bg-white' : 'bg-light'}`}
            >
              <div className="d-flex align-items-start">
                <div className={`me-3 mt-1 rounded-circle p-2 d-flex align-items-center justify-content-center ${
                  notif.type === 'order' ? 'bg-success-subtle text-success' :
                  notif.type === 'promo' ? 'bg-warning-subtle text-warning' :
                  'bg-primary-subtle text-primary'
                }`} style={{ width: '40px', height: '40px' }}>
                  <i className={`bi ${
                    notif.type === 'order' ? 'bi-box-seam' :
                    notif.type === 'promo' ? 'bi-tag' :
                    'bi-info-circle'
                  } fs-5`}></i>
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className={`small fw-bold ${!notif.isRead ? 'text-dark' : 'text-muted'}`}>
                      {notif.title}
                    </span>
                    <small className="text-muted" style={{ fontSize: '0.7em' }}>{notif.time}</small>
                  </div>
                  <p className="mb-0 small text-muted lh-sm text-truncate-2">
                    {notif.message}
                  </p>
                </div>
                {!notif.isRead && (
                  <span className="position-absolute top-50 end-0 translate-middle-y me-2 p-1 bg-danger border border-light rounded-circle">
                    <span className="visually-hidden">New alerts</span>
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
            <div className="text-center p-4">
                <i className="bi bi-bell-slash text-muted fs-2 mb-2"></i>
                <p className="text-muted small mb-0">No tienes notificaciones</p>
            </div>
        )}
      </div>
      
      <div className="p-2 text-center border-top bg-light rounded-bottom">
        <Link to="/notificaciones" className="text-decoration-none small fw-bold text-primary" onClick={onClose}>
          Ver todas las notificaciones
        </Link>
      </div>
    </div>
  );
};
