import React, { useState, useEffect, type ReactNode } from 'react';
import { jwtDecode } from "jwt-decode";
import { AuthContext, type AuthUser } from './auth-context';
import { AuthService } from "../../core/application/services/AuthService";
import { AuthAdapter } from "../../core/infrastructure/adapters/AuthAdapter";

/** Proveedor de contexto de autenticación que maneja el estado global del usuario */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeRole, setActiveRoleState] = useState<string | null>(null);

  useEffect(() => {
    const handleUnauthorized = () => logout();
    window.addEventListener('auth:unauthorized', handleUnauthorized);

    const initAuth = async () => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('auth_token');
      if (storedUser && token) {
        try {
          // Decodificar token para verificar expiración y estructura
          const decoded: any = jwtDecode(token);
          const currentTime = Date.now() / 1000;         
          if (decoded.exp < currentTime) {
            throw new Error("Token expirado");
          }

          // Validar token con el servidor para asegurarse que no ha sido revocado ni manipulado
          const authAdapter = new AuthAdapter();
          const authService = new AuthService(authAdapter);
          const validation = await authService.validateToken(token);

          if (!validation.succeeded) {
             throw new Error("Token inválido o rechazado por el servidor");
          }

          // Restaurar usuario pero OBTENER EL ROL DEL TOKEN (Seguridad)
          // Buscamos el claim de rol estandar o el nombre de propiedad común 'role' con fallback seguro
          const tokenRole = decoded.role || 
                            decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || 
                            JSON.parse(storedUser).role;

          const user = JSON.parse(storedUser);        
          setUser(user);
          setIsAuthenticated(true);
          setActiveRoleState(tokenRole);
          
          // Sincronizar localStorage para consistencia visual, pero la verdad es el estado
          if (tokenRole) {
            localStorage.setItem('active_role', tokenRole);
          }

        } catch (error) {
          console.error("Error en validación de autenticación:", error);
          logout();
        }
      }
    };

    initAuth();

    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, []);

  /** Inicia sesión y persiste los datos del usuario */
  const login = (userData: AuthUser, token: string) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('auth_token', token);
  };


  /** Cierra sesión y limpia los datos del usuario */
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setActiveRoleState(null);
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('active_role');
  };

  /** Establece el rol activo del usuario */
  const setActiveRole = (role: string) => {
    setActiveRoleState(role);
    localStorage.setItem('active_role', role);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, activeRole, login, logout, setActiveRole }}>
      {children}
    </AuthContext.Provider>
  );
};
