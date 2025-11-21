import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from '../../../../context/useAuthContext';

export const PublicHeader = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthContext();

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  const closeNav = () => setIsNavOpen(false);

  return (
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
              <li className="nav-item">
                <Link to="/restaurantes" className="nav-link nav-link-custom" onClick={closeNav}>
                  <i className="bi bi-fork-knife me-2" /> Restaurantes
                </Link>
              </li>
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
                        <Link className="dropdown-item" to="/pedidos" onClick={closeNav}>
                          <i className="bi bi-box-seam me-2" /> Mis Pedidos
                        </Link>
                      </li>
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
  );
};

