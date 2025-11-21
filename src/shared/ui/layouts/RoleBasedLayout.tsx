import { useAuthContext } from '../../context/useAuthContext';
import AdminLayout from './admin/AdminLayout';
import RestaurantLayout from './restaurant/RestaurantLayout';
import ClientLayout from './client/ClientLayout';

/**
 * Layout basado en roles que determina qué layout mostrar según el rol del usuario
 */
export const RoleBasedLayout = () => {
  const { user, isAuthenticated } = useAuthContext();

  // Si no está autenticado o no tiene roles, mostrar layout de cliente
  if (!isAuthenticated || !user || !user.roles || user.roles.length === 0) {
    return <ClientLayout />;
  }

  // Determinar qué layout mostrar según el rol
  const hasAdminRole = user.roles.some(role => 
    role.toLowerCase().includes('administrador') || 
    role.toLowerCase().includes('admin')
  );
  
  const hasRestaurantRole = user.roles.some(role => 
    role.toLowerCase().includes('restaurante') || 
    role.toLowerCase().includes('restaurant')
  );

  if (hasAdminRole) {
    return <AdminLayout />;
  }

  if (hasRestaurantRole) {
    return <RestaurantLayout />;
  }

  // Por defecto, mostrar layout de cliente
  return <ClientLayout />;
};

