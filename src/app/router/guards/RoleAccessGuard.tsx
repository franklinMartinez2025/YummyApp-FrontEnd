import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../../shared/context/useAuthContext';
import { RoleSelectionModal } from '../../../modules/shared/auth/components/RoleSelectionModal';

/** Restringe el acceso según el rol activo del usuario */
export const RoleAccessGuard = () => {
    const { isAuthenticated, activeRole, user, setActiveRole } = useAuthContext();
    const location = useLocation();

    /** Si no hay sesión, se permite el acceso a rutas públicas */
    if (!isAuthenticated) {
        return <Outlet />;
    }

    /** Si está autenticado pero NO tiene rol activo */
    if (isAuthenticated && !activeRole) {
        // Si tiene múltiples roles, OBLIGAR a seleccionar uno
        if (user?.roles && user.roles.length > 1) {
            return (
                <>
                    <Outlet />
                    <RoleSelectionModal
                        isOpen={true}
                        onClose={() => {}}
                        roles={user.roles}
                        onSelect={(role) => setActiveRole && setActiveRole(role)}
                        forceSelection={true}
                    />
                </>
            );
        }
        
        return <Outlet />;
    }

    const normalizedRole = activeRole.toLowerCase();
    const path = location.pathname.toLowerCase();

    /** Acceso exclusivo para Administrador General */
    if (normalizedRole.includes('administrador general') || normalizedRole.includes('admin')) {
        if (!path.startsWith('/admin')) {
            return <Navigate to="/admin/dashboard" replace />;
        }
    }

    /** Acceso exclusivo para Restaurante */
    else if (normalizedRole.includes('restaurante') || normalizedRole.includes('restaurant')) {
        if (!path.startsWith('/restaurant/')) {
            return <Navigate to="/restaurant/dashboard" replace />;
        }
    }

    /** Acceso exclusivo para Repartidor */
    else if (normalizedRole.includes('repartidor') || normalizedRole.includes('delivery')) {
        if (!path.startsWith('/delivery/')) {
            return <Navigate to="/delivery/dashboard" replace />;
        }
    }

    /** Los clientes no pueden acceder a zonas restringidas */
    else {
        if (path.startsWith('/admin') || path.startsWith('/restaurant/') || path.startsWith('/delivery/')) {
            return <Navigate to="/" replace />;
        }
    }

    return <Outlet />;
};
