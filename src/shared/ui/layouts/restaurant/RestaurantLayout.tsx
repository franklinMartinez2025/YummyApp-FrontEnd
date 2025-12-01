import { Outlet } from 'react-router-dom';
import { RestaurantSidebar } from './components/RestaurantSidebar';
import { RestaurantHeader } from './components/RestaurantHeader';
import './styles/RestaurantLayout.css';

/** Layout principal para el panel de restaurante */
const RestaurantLayout = () => {
  return (
    <div className="restaurant-layout">
      <RestaurantSidebar />
      <div className="restaurant-content-wrapper">
        <RestaurantHeader />
        <main className="restaurant-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RestaurantLayout;

