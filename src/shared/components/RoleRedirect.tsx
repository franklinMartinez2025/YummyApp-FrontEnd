import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/useAuthContext';

export const RoleRedirect = () => {
  const { user, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/');
      return;
    }

    const hasAdminRole = user.roles?.some(role =>
      role.toLowerCase().includes('administrador') || role.toLowerCase().includes('admin')
    );
    const hasRestaurantRole = user.roles?.some(role =>
      role.toLowerCase().includes('restaurante') || role.toLowerCase().includes('restaurant')
    );

    if (hasAdminRole) {
      navigate('/admin/dashboard', { replace: true });
    } else if (hasRestaurantRole) {
      navigate('/restaurant/dashboard', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }, [user, isAuthenticated, navigate]);

  return null;
};

