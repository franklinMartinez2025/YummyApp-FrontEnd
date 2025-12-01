import React, { useState, useEffect, type ReactNode } from 'react';
import { AuthContext, type AuthUser } from './auth-context';

/** Proveedor de contexto de autenticación que maneja el estado global del usuario */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeRole, setActiveRoleState] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('auth_token');
    const storedActiveRole = localStorage.getItem('active_role');

    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
        if (storedActiveRole) {
          setActiveRoleState(storedActiveRole);
        }
      } catch (error) {
        console.error("No se pudo analizar el usuario desde localStorage", error);
        localStorage.removeItem('user');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('active_role');
      }
    }
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
