import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../../shared/context/useAuthContext';

/** Restringe el acceso según el rol activo del usuario */
export const RoleAccessGuard = () => {
    const { isAuthenticated, activeRole } = useAuthContext();
    const location = useLocation();

    /** Si no hay sesión o rol, se permite el acceso a rutas públicas */
    if (!isAuthenticated || !activeRole) {
        return <Outlet />;
    }

    const normalizedRole = activeRole.toLowerCase();
    const path = location.pathname.toLowerCase();

    /** Acceso exclusivo para Administrador General */
    if (normalizedRole.includes('administrador general')) {
        if (!path.startsWith('/admin')) {
            return <Navigate to="/admin/dashboard" replace />;
        }
    }

    /** Acceso exclusivo para Administrador de Restaurante */
    else if (normalizedRole.includes('administrador restaurante')) {
        if (!path.startsWith('/restaurant/')) {
            return <Navigate to="/restaurant/dashboard" replace />;
        }
    }

    /** Los clientes no pueden acceder a zonas administrativas */
    else {
        if (path.startsWith('/admin') || path.startsWith('/restaurant/')) {
            return <Navigate to="/" replace />;
        }
    }

    return <Outlet />;
};
