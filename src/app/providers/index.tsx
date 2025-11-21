import type { ReactNode } from 'react';
import { AuthProvider } from '../../shared/context/AuthProvider';
import { CartProvider } from '../../modules/client/cart/context/CartContext';
import { AuthModalProvider } from '../../modules/shared/auth/context/AuthModalContext';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => (
  <AuthProvider>
    <CartProvider>
      <AuthModalProvider>
        {children}
      </AuthModalProvider>
    </CartProvider>
  </AuthProvider>
);

