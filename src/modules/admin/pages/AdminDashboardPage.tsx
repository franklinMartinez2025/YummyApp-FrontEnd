import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../shared/context/useAuthContext';
import './AdminPages.css';

const AdminDashboardPage = () => {
  const { user } = useAuthContext();

  // Datos de ejemplo para el dashboard
  const stats = [
    { label: 'Total Restaurantes', value: '24', icon: 'bi-shop', color: '#3b82f6', change: '+12%' },
    { label: 'Usuarios Activos', value: '1,234', icon: 'bi-people', color: '#10b981', change: '+8%' },
    { label: 'Órdenes Hoy', value: '156', icon: 'bi-cart-check', color: '#f59e0b', change: '+23%' },
    { label: 'Ingresos del Mes', value: '$45,678', icon: 'bi-currency-dollar', color: '#8b5cf6', change: '+15%' },
  ];

  const recentOrders = [
    { id: '#1234', restaurant: 'Pizza Express', customer: 'Juan Pérez', amount: '$45.99', status: 'Completada', time: 'Hace 5 min' },
    { id: '#1235', restaurant: 'Burger King', customer: 'María García', amount: '$32.50', status: 'En proceso', time: 'Hace 12 min' },
    { id: '#1236', restaurant: 'Sushi House', customer: 'Carlos López', amount: '$78.00', status: 'Pendiente', time: 'Hace 20 min' },
  ];

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Dashboard</h1>
          <p className="admin-page-subtitle">
            Bienvenido de vuelta{user?.fullName ? `, ${user.fullName.split(' ')[0]}` : ''}, aquí está el resumen de tu plataforma
          </p>
        </div>
        <div className="admin-page-actions">
          <button className="admin-btn admin-btn-secondary">
            <i className="bi bi-download me-2"></i>
            Exportar Reporte
          </button>
          <Link to="/admin/restaurants" className="admin-btn admin-btn-primary" style={{ textDecoration: 'none' }}>
            <i className="bi bi-plus-lg me-2"></i>
            Nuevo Restaurante
          </Link>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="admin-stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="admin-stat-card">
            <div className="admin-stat-icon" style={{ background: `${stat.color}15`, color: stat.color }}>
              <i className={`bi ${stat.icon}`}></i>
            </div>
            <div className="admin-stat-content">
              <p className="admin-stat-label">{stat.label}</p>
              <h3 className="admin-stat-value">{stat.value}</h3>
              <span className="admin-stat-change positive">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Contenido Principal */}
      <div className="admin-content-grid">
        {/* Órdenes Recientes */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Órdenes Recientes</h3>
            <Link to="/admin/orders" className="admin-card-link">
              Ver todas <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
          <div className="admin-card-body">
            <div className="admin-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Restaurante</th>
                    <th>Cliente</th>
                    <th>Monto</th>
                    <th>Estado</th>
                    <th>Tiempo</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td><span className="admin-order-id">{order.id}</span></td>
                      <td>{order.restaurant}</td>
                      <td>{order.customer}</td>
                      <td className="admin-amount">{order.amount}</td>
                      <td>
                        <span className={`admin-status admin-status-${order.status.toLowerCase().replace(' ', '-')}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="admin-time">{order.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Actividad Reciente */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Actividad Reciente</h3>
          </div>
          <div className="admin-card-body">
            <div className="admin-activity-list">
              <div className="admin-activity-item">
                <div className="admin-activity-icon" style={{ background: '#3b82f615', color: '#3b82f6' }}>
                  <i className="bi bi-shop"></i>
                </div>
                <div className="admin-activity-content">
                  <p className="admin-activity-text">Nuevo restaurante <strong>"La Pizzería"</strong> registrado</p>
                  <span className="admin-activity-time">Hace 2 horas</span>
                </div>
              </div>
              <div className="admin-activity-item">
                <div className="admin-activity-icon" style={{ background: '#10b98115', color: '#10b981' }}>
                  <i className="bi bi-person-plus"></i>
                </div>
                <div className="admin-activity-content">
                  <p className="admin-activity-text">Nuevo usuario <strong>"María García"</strong> se registró</p>
                  <span className="admin-activity-time">Hace 3 horas</span>
                </div>
              </div>
              <div className="admin-activity-item">
                <div className="admin-activity-icon" style={{ background: '#f59e0b15', color: '#f59e0b' }}>
                  <i className="bi bi-cart-check"></i>
                </div>
                <div className="admin-activity-content">
                  <p className="admin-activity-text">Orden <strong>#1234</strong> completada exitosamente</p>
                  <span className="admin-activity-time">Hace 5 horas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
