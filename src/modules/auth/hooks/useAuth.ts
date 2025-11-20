import { useState } from 'react';
import { AuthService } from '../../../core/application/services/AuthService';
import { AuthAdapter } from '../../../core/infrastructure/adapters/AuthAdapter';
import { UserRole } from '../../../core/domain/enums/user-role';

export const useAuth = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authAdapter = new AuthAdapter();
  const authService = new AuthService(authAdapter);

  const login = async (email: string, password: string) => {
  setIsLoading(true);
  setError(null);

  try {
    const result = await authService.login(email, password);

    if (result.succeeded && result.data) {
      console.log("result", result);

        console.log("result", result);
        const { jwToken, refreshToken, ...user } = result.data;
        console.log("jwToken", jwToken);
        return { success: true, user, token: jwToken, refreshToken };
    } else {
      throw new Error(result.message || 'Error al iniciar sesión');
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión';
    setError(errorMessage);
    return { success: false, error: errorMessage };
  } finally {
    setIsLoading(false);
  }
};

  const register = async (email: string, password: string, fullName: string, phoneNumber: string, role=Number(UserRole.Client)) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authService.register(email, password, fullName, phoneNumber, role);
      
      if (result.succeeded) {
        return { success: true };
      } else {
        throw new Error(result.message || 'Error al registrarse');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al registrarse';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    } finally {
      // localStorage cleanup is handled by AuthProvider
    }
  };

  return {
    login,
    register,
    logout,
    isLoading,
    error,
  };
};
