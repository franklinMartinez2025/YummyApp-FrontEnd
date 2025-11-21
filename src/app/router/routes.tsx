import { Route, Routes } from 'react-router-dom';
// Layouts organizados por rol
import PublicLayout from '../../shared/ui/layouts/public/PublicLayout';
import { RoleBasedLayout } from '../../shared/ui/layouts/RoleBasedLayout';
import { AuthLayout } from '../../shared/ui/layouts/auth/AuthLayout';
import { ProtectedRoute } from '../../shared/components/ProtectedRoute';
// Páginas compartidas
import LandingPage from '../../modules/shared/landing/pages/LandingPage';
import NotFoundPage from '../../modules/shared/pages/NotFoundPage';
// Páginas de clientes
import { RestaurantsPage } from '../../modules/client/restaurants/pages/RestaurantsPage';
import { RestaurantDetailPage } from '../../modules/client/restaurants/pages/RestaurantDetailPage';
// Páginas de autenticación (compartidas)
import LoginPage from '../../modules/shared/auth/pages/LoginPage';
import RegisterPage from '../../modules/shared/auth/pages/RegisterPage';
// Páginas de órdenes (compartidas)
import { CheckoutPage } from '../../modules/shared/orders/pages/CheckoutPage';
// Páginas de administrador
import AdminDashboardPage from '../../modules/admin/pages/AdminDashboardPage';
import AdminRestaurantsPage from '../../modules/admin/pages/AdminRestaurantsPage';
import AdminUsersPage from '../../modules/admin/pages/AdminUsersPage';
import AdminOrdersPage from '../../modules/admin/pages/AdminOrdersPage';
import AdminReportsPage from '../../modules/admin/pages/AdminReportsPage';
import AdminSettingsPage from '../../modules/admin/pages/AdminSettingsPage';
// Páginas de restaurante
import RestaurantDashboardPage from '../../modules/restaurant/pages/RestaurantDashboardPage';
import RestaurantMenuPage from '../../modules/restaurant/pages/RestaurantMenuPage';
import RestaurantFoodsPage from '../../modules/restaurant/pages/RestaurantFoodsPage';
import RestaurantDrinksPage from '../../modules/restaurant/pages/RestaurantDrinksPage';
import RestaurantDessertsPage from '../../modules/restaurant/pages/RestaurantDessertsPage';
import RestaurantOrdersPage from '../../modules/restaurant/pages/RestaurantOrdersPage';
import RestaurantSettingsPage from '../../modules/restaurant/pages/RestaurantSettingsPage';

export const AppRouter = () => (
  <Routes>
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
        <Route path="/restaurant/settings" element={<RestaurantSettingsPage />} />
      </Route>
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

