import { Outlet } from 'react-router-dom';
import { RestaurantSidebar } from './components/RestaurantSidebar';
import './RestaurantLayout.css';

const RestaurantLayout = () => {
  return (
    <div className="restaurant-layout">
      <RestaurantSidebar />
      <main className="restaurant-main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default RestaurantLayout;

