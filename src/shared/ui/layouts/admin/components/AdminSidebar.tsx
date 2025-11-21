import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from '../../../../context/useAuthContext';
import '../Sidebar.css';

export const AdminSidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      path: '/admin/dashboard',
      icon: 'bi-speedometer2',
      label: 'Dashboard',
      badge: null,
    },
    {
      path: '/admin/restaurants',
      icon: 'bi-shop',
      label: 'Restaurantes',
      badge: null,
    },
    {
      path: '/admin/users',
      icon: 'bi-people',
      label: 'Usuarios',
      badge: null,
    },
    {
      path: '/admin/orders',
      icon: 'bi-cart-check',
      label: 'Órdenes',
      badge: '12',
    },
    {
      path: '/admin/reports',
      icon: 'bi-graph-up',
      label: 'Reportes',
      badge: null,
    },
    {
      path: '/admin/settings',
      icon: 'bi-gear',
      label: 'Configuración',
      badge: null,
    },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <i className={`bi ${isOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
      </button>
      <div
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={closeSidebar}
      />
      <aside className={`sidebar admin-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <Link to="/admin/dashboard" className="sidebar-logo">
          <img src="/img/png/logo.png" alt="Logo" className="sidebar-logo-img" />
          <span className="sidebar-brand">YummyApp</span>
        </Link>
        <div className="sidebar-user-info">
          <div className="sidebar-user-avatar">
            {user?.fullName?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="sidebar-user-details">
            <div className="sidebar-user-name">{user?.fullName || 'Administrador'}</div>
            <div className="sidebar-user-role">Administrador General</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.path} className="sidebar-menu-item">
              <Link
                to={item.path}
                className={`sidebar-menu-link ${isActive(item.path) ? 'active' : ''}`}
                onClick={closeSidebar}
              >
                <i className={`bi ${item.icon} sidebar-menu-icon`}></i>
                <span className="sidebar-menu-label">{item.label}</span>
                {item.badge && (
                  <span className="sidebar-menu-badge">{item.badge}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button
          onClick={() => {
            logout();
            window.location.href = '/';
          }}
          className="sidebar-logout-btn"
        >
          <i className="bi bi-box-arrow-right sidebar-menu-icon"></i>
          <span className="sidebar-menu-label">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
    </>
  );
};

