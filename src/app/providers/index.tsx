import type { ReactNode } from 'react';
import { AuthProvider } from '../../shared/context/AuthProvider';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => (
  <AuthProvider>{children}</AuthProvider>
);

