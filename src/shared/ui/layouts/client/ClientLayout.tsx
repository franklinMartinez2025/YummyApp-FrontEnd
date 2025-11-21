import { Outlet } from 'react-router-dom';
import { PublicHeader } from '../public/components/PublicHeader';
import { PublicFooter } from '../public/components/PublicFooter';
import { CartFloatingButton } from '../../../../modules/client/cart/components/CartFloatingButton/CartFloatingButton';
import { CartDrawer } from '../../../../modules/client/cart/components/CartDrawer/CartDrawer';
import '../public/PublicLayout.css';

export const ClientLayout = () => {
  return (
    <div className="layout-wrapper">
      <PublicHeader />
      <main className="page-content">
        <Outlet />
      </main>
      <CartFloatingButton />
      <CartDrawer />
      <PublicFooter />
    </div>
  );
};

export default ClientLayout;

