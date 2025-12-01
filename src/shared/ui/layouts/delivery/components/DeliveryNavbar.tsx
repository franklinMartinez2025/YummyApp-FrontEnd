import { NavLink } from 'react-router-dom';
import '../styles/DeliveryLayout.css';

export const DeliveryNavbar = () => {
  return (
    <nav className="delivery-navbar">
      <NavLink 
        to="/delivery/dashboard" 
        className={({ isActive }) => `delivery-nav-item ${isActive ? 'active' : ''}`}
      >
        <i className="bi bi-speedometer2"></i>
        <span>Inicio</span>
      </NavLink>
      
      <NavLink 
        to="/delivery/available" 
        className={({ isActive }) => `delivery-nav-item ${isActive ? 'active' : ''}`}
      >
        <i className="bi bi-box-seam"></i>
        <span>Pedidos</span>
      </NavLink>
      
      <NavLink 
        to="/delivery/my-deliveries" 
        className={({ isActive }) => `delivery-nav-item ${isActive ? 'active' : ''}`}
      >
        <i className="bi bi-bicycle"></i>
        <span>Mis Entregas</span>
      </NavLink>
      
      <NavLink 
        to="/delivery/profile" 
        className={({ isActive }) => `delivery-nav-item ${isActive ? 'active' : ''}`}
      >
        <i className="bi bi-person"></i>
        <span>Perfil</span>
      </NavLink>
    </nav>
  );
};
