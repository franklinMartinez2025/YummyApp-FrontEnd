import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../../context/useAuthContext';
import { RoleSelectionModal } from '../../../../../modules/shared/auth/components/RoleSelectionModal';
import '../styles/DeliveryHeader.css';

export const DeliveryHeader = () => {
  const { user, logout, setActiveRole } = useAuthContext();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const navigate = useNavigate();

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
      <header className="delivery-top-header">
        <div className="delivery-brand">
          <i className="bi bi-bicycle"></i>
          <span>YummyDelivery</span>
        </div>

        <div className="delivery-user-actions">
          <button
            className="delivery-user-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
            aria-label="Menú de usuario"
          >
            <div className="delivery-user-avatar">
              {user?.fullName?.charAt(0).toUpperCase() || 'D'}
            </div>
          </button>

          {showUserMenu && (
            <>
              <div
                className="delivery-dropdown-overlay"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="delivery-dropdown">
                <div className="delivery-dropdown-header">
                  <div className="delivery-dropdown-avatar">
                    {user?.fullName?.charAt(0).toUpperCase() || 'D'}
                  </div>
                  <div>
                    <p className="delivery-user-name">{user?.fullName || 'Repartidor'}</p>
                    <p className="delivery-user-role">Repartidor</p>
                  </div>
                </div>
                
                <div className="delivery-dropdown-content">
                  <button className="delivery-dropdown-item">
                    <i className="bi bi-person"></i>
                    <span>Mi Perfil</span>
                  </button>
                  
                  {user?.roles && user.roles.length > 1 && (
                    <button
                      className="delivery-dropdown-item"
                      onClick={() => {
                        setIsRoleModalOpen(true);
                        setShowUserMenu(false);
                      }}
                    >
                      <i className="bi bi-arrow-repeat"></i>
                      <span>Cambiar Rol</span>
                    </button>
                  )}
                  
                  <div className="delivery-dropdown-divider"></div>
                  
                  <button
                    className="delivery-dropdown-item delivery-dropdown-item-danger"
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
