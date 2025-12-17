import { useState } from "react";
import { AuthService } from "../../../../core/application/services/AuthService";
import { AuthAdapter } from "../../../../core/infrastructure/adapters/AuthAdapter";

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

      if (result.success && result.data) {
        const { jwToken, refreshToken, ...user } = result.data;
        return { success: true, user, token: jwToken, refreshToken };
      } else {
        throw new Error(result.message || "Error al iniciar sesión");
      }
    } catch (err) {
      let errorMessage =
        err instanceof Error ? err.message : "Error al iniciar sesión";

      if (errorMessage === 'Failed to fetch') {
        errorMessage = 'No se puede conectar con el servidor';
      }
      
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    fullName: string,
    phoneNumber: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authService.register(
        email,
        password,
        fullName,
        phoneNumber
      );

      if (result.success) {
        return { success: true };
      } else {
        throw new Error(result.message || "Error al registrarse");
      }
    } catch (err) {
      let errorMessage =
        err instanceof Error ? err.message : "Error al registrarse";

      if (errorMessage === 'Failed to fetch') {
        errorMessage = 'No se puede conectar con el servidor';
      }

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
      console.error("Error al cerrar sesión:", err);
    }
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authService.forgotPassword(email);

      if (result.success) {
        return { success: true, message: result.message };
      } else {
        throw new Error(result.message || "Error al solicitar recuperación");
      }
    } catch (err) {
      let errorMessage =
        err instanceof Error ? err.message : "Error al solicitar recuperación";

      if (errorMessage === "Failed to fetch") {
        errorMessage = "No se puede conectar con el servidor";
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (
    email: string,
    token: string,
    newPassword: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authService.resetPassword(email, token, newPassword);

      if (result.success) {
        return { success: true, message: result.message };
      } else {
        throw new Error(result.message || "Error al restablecer contraseña");
      }
    } catch (err) {
      let errorMessage =
        err instanceof Error ? err.message : "Error al restablecer contraseña";

      if (errorMessage === "Failed to fetch") {
        errorMessage = "No se puede conectar con el servidor";
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const validateToken = async (token: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authService.validateToken(token);

      if (result.success) {
        return { success: true, isValid: true };
      } else {
        throw new Error(result.message || "Token inválido o expirado");
      }
    } catch (err) {
      let errorMessage =
        err instanceof Error ? err.message : "Token inválido o expirado";

      if (errorMessage === "Failed to fetch") {
        errorMessage = "No se puede conectar con el servidor";
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    validateToken,
    isLoading,
    error,
  };
};
