import { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/useAuthContext';
import { RoleSelectionModal } from '../../../modules/shared/auth/components/RoleSelectionModal';
import AdminLayout from './admin/AdminLayout';
import RestaurantLayout from './restaurant/RestaurantLayout';
import ClientLayout from './client/ClientLayout';
import DeliveryLayout from './delivery/DeliveryLayout';

/** Renderiza el layout correspondiente según el rol del usuario */
export const RoleBasedLayout = () => {
  const { user, isAuthenticated, activeRole, setActiveRole } = useAuthContext();
  const [showMandatoryRoleSelection, setShowMandatoryRoleSelection] = useState(false);

  useEffect(() => {
    // Si está autenticado, tiene múltiples roles, pero NO tiene rol activo seleccionado
    if (isAuthenticated && user?.roles && user.roles.length > 1 && !activeRole) {
      setShowMandatoryRoleSelection(true);
    } else {
      setShowMandatoryRoleSelection(false);
    }
  }, [isAuthenticated, user, activeRole]);

  const handleRoleSelect = (role: string) => {
    if (setActiveRole) {
      setActiveRole(role);
    }
    setShowMandatoryRoleSelection(false);
    // La redirección ocurrirá automáticamente porque el componente se re-renderizará
    // con el nuevo activeRole y entrará en los ifs de abajo
  };

  /** Si no hay sesión o roles, usar layout de cliente */
  if (!isAuthenticated || !user || !user.roles || user.roles.length === 0) {
    return <ClientLayout />;
  }

  const currentRole = activeRole?.toLowerCase() || '';

  // Renderizar el layout correspondiente
  let LayoutComponent = ClientLayout;

  if (currentRole.includes('administrador') || currentRole.includes('admin')) {
    LayoutComponent = AdminLayout;
  } else if (currentRole.includes('restaurante') || currentRole.includes('restaurant')) {
    LayoutComponent = RestaurantLayout;
  } else if (currentRole.includes('repartidor') || currentRole.includes('delivery')) {
    LayoutComponent = DeliveryLayout;
  }

  return (
    <>
      <LayoutComponent />
      
      {/* Modal de selección obligatoria si no hay rol activo */}
      <RoleSelectionModal
        isOpen={showMandatoryRoleSelection}
        onClose={() => {}} // No hace nada porque es obligatorio
        roles={user.roles}
        onSelect={handleRoleSelect}
        forceSelection={true}
      />
    </>
  );
};
