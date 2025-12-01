import { createContext } from 'react';

/** Interfaz que define la estructura del usuario autenticado */
export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
  refreshToken?: string;
}

/** Interfaz para el contexto de autenticación */
export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  activeRole: string | null;
  login: (userData: AuthUser, token: string) => void;
  logout: () => void;
  setActiveRole: (role: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

