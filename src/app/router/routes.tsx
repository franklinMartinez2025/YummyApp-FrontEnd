import { Route, Routes } from 'react-router-dom';
import PublicLayout from '../../shared/ui/layouts/public/PublicLayout';
import { RoleBasedLayout } from '../../shared/ui/layouts/RoleBasedLayout';
import { AuthLayout } from '../../shared/ui/layouts/auth/components/AuthLayout';
import { ProtectedRoute } from '../../shared/components/ProtectedRoute';
import LandingPage from '../../modules/shared/landing/pages/LandingPage';
import NotFoundPage from '../../modules/shared/pages/NotFoundPage';
import { RestaurantsPage } from '../../modules/client/restaurants/pages/RestaurantsPage';
import { RestaurantDetailPage } from '../../modules/client/restaurants/pages/RestaurantDetailPage';
import LoginPage from '../../modules/shared/auth/pages/LoginPage';
import RegisterPage from '../../modules/shared/auth/pages/RegisterPage';
import { CheckoutPage } from '../../modules/shared/orders/pages/CheckoutPage';
// Páginas de administrador
import AdminDashboardPage from '../../modules/admin/dashboard/pages/AdminDashboardPage';
import AdminRestaurantsPage from '../../modules/admin/restaurants/pages/AdminRestaurantsPage';
import AdminUsersPage from '../../modules/admin/users/pages/AdminUsersPage';
import AdminOrdersPage from '../../modules/admin/orders/pages/AdminOrdersPage';
import AdminReportsPage from '../../modules/admin/reports/pages/AdminReportsPage';
import AdminSettingsPage from '../../modules/admin/settings/pages/AdminSettingsPage';
import RestaurantDashboardPage from '../../modules/restaurant/dashboard/pages/RestaurantDashboardPage';
import RestaurantMenuPage from '../../modules/restaurant/menus/pages/RestaurantMenuPage';
import RestaurantFoodsPage from '../../modules/restaurant/foods/pages/RestaurantFoodsPage';
import RestaurantDrinksPage from '../../modules/restaurant/drinks/pages/RestaurantDrinksPage';
import RestaurantDessertsPage from '../../modules/restaurant/desserts/pages/RestaurantDessertsPage';
import RestaurantOrdersPage from '../../modules/restaurant/orders/pages/RestaurantOrdersPage';
import RestaurantDriversPage from '../../modules/restaurant/drivers/pages/RestaurantDriversPage';
import RestaurantSettingsPage from '../../modules/restaurant/settings/pages/RestaurantSettingsPage';
import DeliveryDashboardPage from '../../modules/delivery/dashboard/pages/DeliveryDashboardPage';
import AvailableOrdersPage from '../../modules/delivery/available-orders/pages/AvailableOrdersPage';
import MyDeliveriesPage from '../../modules/delivery/my-deliveries/pages/MyDeliveriesPage';

import { RoleAccessGuard } from './guards/RoleAccessGuard';

/** Componente principal de enrutamiento que define todas las rutas de la aplicación */
export const AppRouter = () => (
  <Routes>
    <Route element={<RoleAccessGuard />}>
      <Route element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="home" element={<LandingPage />} />
        <Route path="restaurants" element={<RestaurantsPage />} />
        <Route path="restaurants/:id" element={<RestaurantDetailPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleBasedLayout />}>
          {/* Admin Routes - Solo para administradores */}
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/restaurants" element={<AdminRestaurantsPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/reports" element={<AdminReportsPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
          
          {/* Restaurant Routes - Solo para restaurantes */}
          <Route path="/restaurant/dashboard" element={<RestaurantDashboardPage />} />
          <Route path="/restaurant/menu" element={<RestaurantMenuPage />} />
          <Route path="/restaurant/foods" element={<RestaurantFoodsPage />} />
          <Route path="/restaurant/drinks" element={<RestaurantDrinksPage />} />
          <Route path="/restaurant/desserts" element={<RestaurantDessertsPage />} />
          <Route path="/restaurant/orders" element={<RestaurantOrdersPage />} />
          <Route path="/restaurant/drivers" element={<RestaurantDriversPage />} />
          <Route path="/restaurant/settings" element={<RestaurantSettingsPage />} />
          
          {/* Delivery Routes - Solo para repartidores */}
          <Route path="/delivery/dashboard" element={<DeliveryDashboardPage />} />
          <Route path="/delivery/available" element={<AvailableOrdersPage />} />
          <Route path="/delivery/my-deliveries" element={<MyDeliveriesPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

