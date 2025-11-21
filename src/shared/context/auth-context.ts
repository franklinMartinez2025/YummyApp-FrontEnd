import { createContext } from 'react';

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
  refreshToken?: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (userData: AuthUser, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

