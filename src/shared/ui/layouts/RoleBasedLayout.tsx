import { useAuthContext } from '../../context/useAuthContext';
import AdminLayout from './admin/AdminLayout';
import RestaurantLayout from './restaurant/RestaurantLayout';
import ClientLayout from './client/ClientLayout';

/** Renderiza el layout correspondiente según el rol del usuario */
export const RoleBasedLayout = () => {
  const { user, isAuthenticated } = useAuthContext();

  /** Si no hay sesión o roles, usar layout de cliente */
  if (!isAuthenticated || !user || !user.roles || user.roles.length === 0) {
    return <ClientLayout />;
  }

  /** Verifica si posee rol administrativo */
  const hasAdminRole = user.roles.some(role =>
    role.toLowerCase().includes('administrador') ||
    role.toLowerCase().includes('admin')
  );

  /** Verifica si posee rol de restaurante */
  const hasRestaurantRole = user.roles.some(role =>
    role.toLowerCase().includes('restaurante') ||
    role.toLowerCase().includes('restaurant')
  );

  /** Layout para administrador */
  if (hasAdminRole) {
    return <AdminLayout />;
  }

  /** Layout para administrador de restaurante */
  if (hasRestaurantRole) {
    return <RestaurantLayout />;
  }

  /** Layout por defecto (cliente) */
  return <ClientLayout />;
};
