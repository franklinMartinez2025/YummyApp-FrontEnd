import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/useAuthContext';

interface ProtectedRouteProps {
  allowedRoles?: string[];
  redirectTo?: string;
}

export const ProtectedRoute = ({ allowedRoles, redirectTo = '/auth/login' }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuthContext();

  if (!isAuthenticated || !user) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const hasAllowedRole = user.roles?.some(role =>
      allowedRoles.some(allowedRole =>
        role.toLowerCase().includes(allowedRole.toLowerCase())
      )
    );

    if (!hasAllowedRole) {
      // Redirigir según el rol del usuario
      const hasAdminRole = user.roles?.some(role =>
        role.toLowerCase().includes('administrador') || role.toLowerCase().includes('admin')
      );
      const hasRestaurantRole = user.roles?.some(role =>
        role.toLowerCase().includes('restaurante') || role.toLowerCase().includes('restaurant')
      );

      if (hasAdminRole) {
        return <Navigate to="/admin/dashboard" replace />;
      }
      if (hasRestaurantRole) {
        return <Navigate to="/restaurant/dashboard" replace />;
      }
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

