import { Outlet } from 'react-router-dom';
import './PublicLayout.css';
import { PublicHeader } from './components/PublicHeader';
import { PublicFooter } from './components/PublicFooter';
import { CartFloatingButton } from '../../../../modules/cart/components/CartFloatingButton/CartFloatingButton';
import { CartDrawer } from '../../../../modules/cart/components/CartDrawer/CartDrawer';

const PublicLayout = () => {
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

export default PublicLayout;

