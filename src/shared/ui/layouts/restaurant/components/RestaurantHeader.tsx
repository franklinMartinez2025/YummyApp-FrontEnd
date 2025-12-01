import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../../context/useAuthContext';
import { RoleSelectionModal } from '../../../../../modules/shared/auth/components/RoleSelectionModal';
import '../styles/RestaurantHeader.css';

export const RestaurantHeader = () => {
  const { user, logout, setActiveRole } = useAuthContext();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const navigate = useNavigate();

  // Simulación de notificaciones
  const notifications = [
    { id: 1, message: 'Nuevo pedido recibido #1235', time: 'Hace 2 min', read: false },
    { id: 2, message: 'Repartidor asignado a orden #1234', time: 'Hace 10 min', read: false },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleRoleSelect = (role: string) => {
    if (setActiveRole) {
      setActiveRole(role);
    }
    setIsRoleModalOpen(false);
    setShowUserMenu(false);

    const normalizedRole = role.toLowerCase();
    if (normalizedRole.includes('administrador general') || normalizedRole.includes('admin')) {
      navigate('/admin/dashboard');
    } else if (normalizedRole.includes('restaurante') || normalizedRole.includes('restaurant')) {
      navigate('/restaurant/dashboard');
    } else if (normalizedRole.includes('repartidor') || normalizedRole.includes('delivery')) {
      navigate('/delivery/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <header className="restaurant-header">
        <div className="restaurant-header-content">
          {/* Búsqueda Global */}
          <div className="restaurant-search">
            <i className="bi bi-search restaurant-search-icon"></i>
            <input
              type="text"
              className="restaurant-search-input"
              placeholder="Buscar pedidos, platos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Acciones del Header */}
          <div className="restaurant-header-actions">
            {/* Notificaciones */}
            <div className="restaurant-notifications">
              <button
                className="restaurant-header-btn"
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="Notificaciones"
              >
                <i className="bi bi-bell"></i>
                {unreadCount > 0 && (
                  <span className="restaurant-badge">{unreadCount}</span>
                )}
              </button>
              {showNotifications && (
                <>
                  <div
                    className="restaurant-dropdown-overlay"
                    onClick={() => setShowNotifications(false)}
                  />
                  <div className="restaurant-dropdown restaurant-notifications-dropdown">
                    <div className="restaurant-dropdown-header">
                      <h6>Notificaciones</h6>
                      <span className="restaurant-badge-small">{unreadCount} nuevas</span>
                    </div>
                    <div className="restaurant-dropdown-content">
                      {notifications.length === 0 ? (
                        <div className="restaurant-dropdown-empty">
                          <i className="bi bi-bell-slash"></i>
                          <p>No hay notificaciones</p>
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`restaurant-notification-item ${!notification.read ? 'unread' : ''}`}
                          >
                            <div className="restaurant-notification-icon">
                              <i className="bi bi-info-circle"></i>
                            </div>
                            <div className="restaurant-notification-content">
                              <p className="restaurant-notification-message">{notification.message}</p>
                              <span className="restaurant-notification-time">{notification.time}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="restaurant-dropdown-footer">
                      <button className="restaurant-dropdown-link">Ver todas las notificaciones</button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Menú de Usuario */}
            <div className="restaurant-user-menu">
              <button
                className="restaurant-user-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
                aria-label="Menú de usuario"
              >
                <div className="restaurant-user-avatar">
                  {user?.fullName?.charAt(0).toUpperCase() || 'R'}
                </div>
                <div className="restaurant-user-info">
                  <span className="restaurant-user-name">{user?.fullName || 'Restaurante'}</span>
                  <span className="restaurant-user-role">Administrador</span>
                </div>
                <i className="bi bi-chevron-down restaurant-user-chevron"></i>
              </button>
              {showUserMenu && (
                <>
                  <div
                    className="restaurant-dropdown-overlay"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="restaurant-dropdown restaurant-user-dropdown">
                    <div className="restaurant-dropdown-content">
                      <div className="restaurant-user-dropdown-header">
                        <div className="restaurant-user-avatar-large">
                          {user?.fullName?.charAt(0).toUpperCase() || 'R'}
                        </div>
                        <div>
                          <p className="restaurant-user-name-large">{user?.fullName || 'Restaurante'}</p>
                          <p className="restaurant-user-email">{user?.email || ''}</p>
                        </div>
                      </div>
                      <div className="restaurant-dropdown-divider"></div>
                      <a href="/restaurant/profile" className="restaurant-dropdown-item">
                        <i className="bi bi-person"></i>
                        <span>Perfil del Restaurante</span>
                      </a>
                      <a href="/restaurant/settings" className="restaurant-dropdown-item">
                        <i className="bi bi-gear"></i>
                        <span>Configuración</span>
                      </a>
                      {user?.roles && user.roles.length > 1 && (
                        <button
                          className="restaurant-dropdown-item"
                          onClick={() => {
                            setIsRoleModalOpen(true);
                            setShowUserMenu(false);
                          }}
                        >
                          <i className="bi bi-arrow-repeat"></i>
                          <span>Cambiar Rol</span>
                        </button>
                      )}
                      <div className="restaurant-dropdown-divider"></div>
                      <button
                        className="restaurant-dropdown-item restaurant-dropdown-item-danger"
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

      {user && (
        <RoleSelectionModal
          isOpen={isRoleModalOpen}
          onClose={() => setIsRoleModalOpen(false)}
          roles={user.roles}
          onSelect={handleRoleSelect}
        />
      )}
    </>
  );
};
