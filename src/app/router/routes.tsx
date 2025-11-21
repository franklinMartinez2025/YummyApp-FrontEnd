import { Route, Routes } from 'react-router-dom';
import PublicLayout from '../../shared/ui/Layout/public/PublicLayout';
import { AuthLayout } from '../../shared/ui/Layout/auth/AuthLayout';
import LandingPage from '../../modules/landing/pages/LandingPage';
import NotFoundPage from '../../modules/shared/pages/NotFoundPage';
import { RestaurantsPage } from '../../modules/restaurants/pages/RestaurantsPage';
import { RestaurantDetailPage } from '../../modules/restaurants/pages/RestaurantDetailPage';
import LoginPage from '../../modules/auth/pages/LoginPage';
import RegisterPage from '../../modules/auth/pages/RegisterPage';
import { CheckoutPage } from '../../modules/orders/pages/CheckoutPage';

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
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

