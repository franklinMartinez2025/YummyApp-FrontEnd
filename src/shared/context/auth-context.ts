import { createContext } from 'react';
import { UserRole } from '../../core/domain/enums/user-role';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  roles: UserRole;
}

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (userData: AuthUser, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

