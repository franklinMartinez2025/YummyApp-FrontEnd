import type { ReactNode } from 'react';
import { AuthProvider } from '../../shared/context/AuthProvider';
import { CartProvider } from '../../modules/cart/context/CartContext';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => (
  <AuthProvider>
    <CartProvider>
      {children}
    </CartProvider>
  </AuthProvider>
);

