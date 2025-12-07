import React, { useState, useEffect, type ReactNode } from 'react';
import { jwtDecode } from "jwt-decode";
import { AuthContext, type AuthUser } from './auth-context';
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeRole, setActiveRoleState] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const handleUnauthorized = () => logout();
    window.addEventListener('auth:unauthorized', handleUnauthorized);

    const initAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('auth_token');
        if (storedUser && token) {
          try {
            const decoded: any = jwtDecode(token);
            const currentTime = Date.now() / 1000;         
            if (decoded.exp < currentTime) {
              throw new Error("Token expirado");
            }
            const tokenRole = decoded.role || 
                              decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || 
                              JSON.parse(storedUser).role;
  
            const user = JSON.parse(storedUser);        
            setUser(user);
            setIsAuthenticated(true);
            const persistedRole = localStorage.getItem('active_role');
            const finalRole = persistedRole || tokenRole;   
            setActiveRoleState(finalRole);
            if (finalRole) {
              localStorage.setItem('active_role', finalRole);
            }
  
          } catch (error) {
            logout();
          }
        }
      } catch (err) {
        logout();
      } finally {
        setIsInitializing(false);
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

  if (isInitializing) {
    return null; // O un spinner de carga global
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, activeRole, login, logout, setActiveRole }}>
      {children}
    </AuthContext.Provider>
  );
};
