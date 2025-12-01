import { useContext } from 'react';
import { AuthContext } from './auth-context';

/** Hook personalizado para acceder al contexto de autenticación */
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext debe utilizarse dentro de un AuthProvider.');
  }

  return context;
};

