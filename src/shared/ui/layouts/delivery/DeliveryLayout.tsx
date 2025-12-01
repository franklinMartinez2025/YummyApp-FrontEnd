import { Outlet } from 'react-router-dom';
import { DeliveryNavbar } from './components/DeliveryNavbar';
import { DeliveryHeader } from './components/DeliveryHeader';
import './styles/DeliveryLayout.css';

/** Layout optimizado para repartidores (vista móvil) */
const DeliveryLayout = () => {
  return (
    <div className="delivery-layout">
      <DeliveryHeader />
      <main className="delivery-main-content">
        <Outlet />
      </main>
      <DeliveryNavbar />
    </div>
  );
};

export default DeliveryLayout;
