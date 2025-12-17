import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuthContext } from '../../../../context/useAuthContext';
import { RoleSelectionModal } from '../../../../../modules/shared/auth/components/RoleSelectionModal';
import { NotificationDropdown } from './NotificationDropdown';
import { OrderAccessModal } from './OrderAccessModal';

export const PublicHeader = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const { isAuthenticated, user, logout, setActiveRole } = useAuthContext();
  const navigate = useNavigate();

  // Cerrar notificaciones al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.nav-item.dropdown')) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  const closeNav = () => setIsNavOpen(false);

  const handleRoleSelect = (role: string) => {
    if (setActiveRole) {
      setActiveRole(role);
    }
    setIsRoleModalOpen(false);
    closeNav();

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
      <header className="foodhub-header sticky-top">
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
          <div className="container-fluid px-4">
            <Link to="/" className="navbar-brand d-flex align-items-center foodhub-logo">
              <img src="/img/png/logo.png" alt="Logo" className="me-2 logo-img" />
              <span className="brand-name d-none d-sm-block">YummyApp</span>
            </Link>

            <div className="d-flex align-items-center gap-3 order-lg-3">
              <button
                className="navbar-toggler border-0 d-lg-none"
                type="button"
                onClick={toggleNav}
                aria-controls="navbarNav"
                aria-expanded={isNavOpen}
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
            </div>

            <div className={`collapse navbar-collapse justify-content-end ${isNavOpen ? 'show' : ''}`} id="navbarNav">
              <ul className="navbar-nav align-items-center gap-lg-4 gap-3 py-3 py-lg-0">
                <li className="nav-item">
                  <Link to="/" className="nav-link nav-link-custom" onClick={closeNav}>
                    <i className="bi bi-house-door me-2" /> Inicio
                  </Link>
                </li>
                {isAuthenticated && user?.roles?.some(r => r.toLowerCase() === 'cliente') && (
                  <li className="nav-item">
                    <Link to="/create-restaurant" className="nav-link nav-link-custom fw-semibold text-primary" onClick={closeNav}>
                      <i className="bi bi-shop me-2" /> ¡Publica tu Restaurante!
                    </Link>
                  </li>
                )}
                {isAuthenticated && user?.roles?.some(r => r.toLowerCase() === 'cliente') && (
                  <li className="nav-item me-lg-2 dropdown">
                    <button 
                        className={`btn btn-link nav-link position-relative text-dark d-flex align-items-center ${isNotificationsOpen ? 'show' : ''}`} 
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsNotificationsOpen(!isNotificationsOpen);
                            // Cerrar otros menús si es necesario
                            setIsRoleModalOpen(false);
                        }}
                        aria-expanded={isNotificationsOpen}
                        aria-label="Notificaciones"
                    >
                       <i className={`bi ${isNotificationsOpen ? 'bi-bell-fill' : 'bi-bell'} fs-5`}></i>
                       <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.6rem',  marginTop: '5px', marginLeft: '-5px'}}>
                         3
                         <span className="visually-hidden">mensajes no leídos</span>
                       </span>
                    </button>
                    {isNotificationsOpen && (
                        <NotificationDropdown onClose={() => setIsNotificationsOpen(false)} />
                    )}
                  </li>
                )}
                <li className="nav-item ms-lg-3">
                  {isAuthenticated && user ? (
                    <div className="dropdown">
                      <button
                        className="btn btn-link text-decoration-none dropdown-toggle d-flex align-items-center gap-2 user-menu-btn"
                        type="button"
                        id="userMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <div className="user-avatar">{user.fullName?.charAt(0).toUpperCase() || 'U'}</div>
                        <span className="d-none d-lg-block fw-bold text-dark">{user.fullName || 'Usuario'}</span>
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 animate slideIn" aria-labelledby="userMenuButton">
                        <li>
                          <Link className="dropdown-item" to="/perfil" onClick={closeNav}>
                            <i className="bi bi-person me-2" /> Mi Perfil
                          </Link>
                        </li>
                        <li>
                          <button 
                            className="dropdown-item" 
                            onClick={() => {
                                setIsOrderModalOpen(true);
                                closeNav();
                            }}
                          >
                            <i className="bi bi-box-seam me-2" /> Mis Pedidos
                          </button>
                        </li>
                        {user.roles && user.roles.length > 1 && (
                          <li>
                            <button 
                              className="dropdown-item" 
                              onClick={() => {
                                setIsRoleModalOpen(true);
                                closeNav();
                              }}
                            >
                              <i className="bi bi-arrow-repeat me-2" /> Cambiar Rol
                            </button>
                          </li>
                        )}
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <button
                            className="dropdown-item text-danger"
                            onClick={() => {
                              logout();
                              closeNav();
                            }}
                          >
                            <i className="bi bi-box-arrow-right me-2" /> Cerrar Sesión
                          </button>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div className="d-flex gap-2 auth-buttons">
                      <Link to="/auth/login" className="btn btn-outline-primary rounded-pill px-4" onClick={closeNav}>
                        Iniciar Sesión
                      </Link>
                      <Link to="/auth/register" className="btn btn-primary rounded-pill px-4 text-white" onClick={closeNav}>
                        Crear Cuenta
                      </Link>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {user && (
        <RoleSelectionModal
          isOpen={isRoleModalOpen}
          onClose={() => setIsRoleModalOpen(false)}
          roles={user.roles}
          onSelect={handleRoleSelect}
        />
      )}
      
      <OrderAccessModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
      />
    </>
  );
};

