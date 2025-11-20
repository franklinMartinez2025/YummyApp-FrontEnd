import { createContext } from 'react';
import { UserRole } from '../../core/domain/enums/user-role';

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  roles: UserRole;
  refreshToken?: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (userData: AuthUser, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

