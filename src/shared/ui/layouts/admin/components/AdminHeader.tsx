import { useState } from 'react';
import { useAuthContext } from '../../../../context/useAuthContext';
import '../AdminHeader.css';

export const AdminHeader = () => {
  const { user, logout } = useAuthContext();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Simulación de notificaciones (luego se puede conectar a un servicio real)
  const notifications = [
    { id: 1, message: 'Nuevo restaurante registrado', time: 'Hace 5 min', read: false },
    { id: 2, message: 'Orden #1234 requiere atención', time: 'Hace 15 min', read: false },
    { id: 3, message: 'Reporte mensual disponible', time: 'Hace 1 hora', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="admin-header">
      <div className="admin-header-content">
        {/* Búsqueda Global */}
        <div className="admin-search">
          <i className="bi bi-search admin-search-icon"></i>
          <input
            type="text"
            className="admin-search-input"
            placeholder="Buscar restaurantes, usuarios, órdenes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Acciones del Header */}
        <div className="admin-header-actions">
          {/* Notificaciones */}
          <div className="admin-notifications">
            <button
              className="admin-header-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notificaciones"
            >
              <i className="bi bi-bell"></i>
              {unreadCount > 0 && (
                <span className="admin-badge">{unreadCount}</span>
              )}
            </button>
            {showNotifications && (
              <>
                <div
                  className="admin-dropdown-overlay"
                  onClick={() => setShowNotifications(false)}
                />
                <div className="admin-dropdown admin-notifications-dropdown">
                  <div className="admin-dropdown-header">
                    <h6>Notificaciones</h6>
                    <span className="admin-badge-small">{unreadCount} nuevas</span>
                  </div>
                  <div className="admin-dropdown-content">
                    {notifications.length === 0 ? (
                      <div className="admin-dropdown-empty">
                        <i className="bi bi-bell-slash"></i>
                        <p>No hay notificaciones</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`admin-notification-item ${!notification.read ? 'unread' : ''}`}
                        >
                          <div className="admin-notification-icon">
                            <i className="bi bi-info-circle"></i>
                          </div>
                          <div className="admin-notification-content">
                            <p className="admin-notification-message">{notification.message}</p>
                            <span className="admin-notification-time">{notification.time}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="admin-dropdown-footer">
                    <button className="admin-dropdown-link">Ver todas las notificaciones</button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Menú de Usuario */}
          <div className="admin-user-menu">
            <button
              className="admin-user-btn"
              onClick={() => setShowUserMenu(!showUserMenu)}
              aria-label="Menú de usuario"
            >
              <div className="admin-user-avatar">
                {user?.fullName?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="admin-user-info">
                <span className="admin-user-name">{user?.fullName || 'Administrador'}</span>
                <span className="admin-user-role">Administrador General</span>
              </div>
              <i className="bi bi-chevron-down admin-user-chevron"></i>
            </button>
            {showUserMenu && (
              <>
                <div
                  className="admin-dropdown-overlay"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="admin-dropdown admin-user-dropdown">
                  <div className="admin-dropdown-content">
                    <div className="admin-user-dropdown-header">
                      <div className="admin-user-avatar-large">
                        {user?.fullName?.charAt(0).toUpperCase() || 'A'}
                      </div>
                      <div>
                        <p className="admin-user-name-large">{user?.fullName || 'Administrador'}</p>
                        <p className="admin-user-email">{user?.email || ''}</p>
                      </div>
                    </div>
                    <div className="admin-dropdown-divider"></div>
                    <a href="/admin/profile" className="admin-dropdown-item">
                      <i className="bi bi-person"></i>
                      <span>Mi Perfil</span>
                    </a>
                    <a href="/admin/settings" className="admin-dropdown-item">
                      <i className="bi bi-gear"></i>
                      <span>Configuración</span>
                    </a>
                    <a href="/" className="admin-dropdown-item" target="_blank" rel="noopener noreferrer">
                      <i className="bi bi-house"></i>
                      <span>Ver Sitio Web</span>
                    </a>
                    <div className="admin-dropdown-divider"></div>
                    <button
                      className="admin-dropdown-item admin-dropdown-item-danger"
                      onClick={() => {
                        logout();
                        window.location.href = '/';
                      }}
                    >
                      <i className="bi bi-box-arrow-right"></i>
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

