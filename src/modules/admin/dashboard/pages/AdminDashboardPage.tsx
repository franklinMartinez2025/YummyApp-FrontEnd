import '../../dashboard/styles/AdminDashboardPage.css';
import { Link } from 'react-router-dom';

const AdminDashboardPage = () => {
  // Mock Data
  const REVENUE_DATA = [
      { month: 'Jun', h: '40%' },
      { month: 'Jul', h: '55%' },
      { month: 'Ago', h: '45%' },
      { month: 'Sep', h: '70%' },
      { month: 'Oct', h: '85%' },
      { month: 'Nov', h: '95%' },
  ];

  return (
    <div className="admin-dashboard-page p-4">
      <div className="container-fluid">
        
        {/* Header */}
        <div className="admin-hero animate-enter">
            <h1 className="admin-title">Panel de Control</h1>
            <p className="admin-subtitle">Visión general del rendimiento de la plataforma YummyApp.</p>
        </div>

        {/* Stats Row */}
        <div className="row g-4 mb-5">
            {/* Stat 1 */}
            <div className="col-md-6 col-xl-3 animate-enter delay-1">
                <div className="admin-card">
                    <div className="stat-header">
                        <div className="stat-icon-wrapper bg-gradient-purple">
                            <i className="bi bi-wallet2"></i>
                        </div>
                        <span className="stat-change change-up">
                            <i className="bi bi-arrow-up-short"></i> 14%
                        </span>
                    </div>
                    <div className="stat-value">S/ 128k</div>
                    <div className="stat-label">Ingresos Totales (Mes)</div>
                </div>
            </div>

            {/* Stat 2 */}
            <div className="col-md-6 col-xl-3 animate-enter delay-2">
                <div className="admin-card">
                    <div className="stat-header">
                        <div className="stat-icon-wrapper bg-gradient-blue">
                            <i className="bi bi-shop"></i>
                        </div>
                        <span className="stat-change change-up">
                            <i className="bi bi-arrow-up-short"></i> +5
                        </span>
                    </div>
                    <div className="stat-value">142</div>
                    <div className="stat-label">Restaurantes Activos</div>
                </div>
            </div>

            {/* Stat 3 */}
            <div className="col-md-6 col-xl-3 animate-enter delay-3">
                <div className="admin-card">
                    <div className="stat-header">
                        <div className="stat-icon-wrapper bg-gradient-green">
                            <i className="bi bi-people"></i>
                        </div>
                        <span className="stat-change change-up">
                            <i className="bi bi-arrow-up-short"></i> 8%
                        </span>
                    </div>
                    <div className="stat-value">5.2k</div>
                    <div className="stat-label">Usuarios Registrados</div>
                </div>
            </div>

            {/* Stat 4 */}
            <div className="col-md-6 col-xl-3 animate-enter delay-4">
                <div className="admin-card">
                    <div className="stat-header">
                        <div className="stat-icon-wrapper bg-gradient-orange">
                            <i className="bi bi-activity"></i>
                        </div>
                        <span className="stat-change change-down">
                            <i className="bi bi-arrow-down-short"></i> 2%
                        </span>
                    </div>
                    <div className="stat-value">345</div>
                    <div className="stat-label">Pedidos en Vivo</div>
                </div>
            </div>
        </div>

        <div className="row g-4">
            {/* Revenue Chart */}
            <div className="col-lg-8 animate-enter delay-3">
                <div className="admin-card">
                    <div className="dash-section-title">
                        <span>Crecimiento de Ingresos (Semestral)</span>
                        <button className="btn btn-sm btn-outline-secondary rounded-pill">Descargar Reporte</button>
                    </div>
                    <div className="revenue-bars">
                        {REVENUE_DATA.map((d, i) => (
                            <div key={i} className="bar-column">
                                <div className="bar-visual" style={{height: d.h}}></div>
                                <span className="bar-label">{d.month}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Top Restaurants */}
            <div className="col-lg-4 animate-enter delay-4">
                <div className="admin-card">
                    <div className="dash-section-title">
                        <span>Top Restaurantes</span>
                        <small className="text-muted text-decoration-underline cursor-pointer">Ver todos</small>
                    </div>
                    <table className="table-preview">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th className="text-end">Ventas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                {name: 'Burger King', img: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=100&q=80', sales: 'S/ 15k'},
                                {name: 'Bembos', img: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=100&q=80', sales: 'S/ 12k'},
                                {name: 'Pizza Hut', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&q=80', sales: 'S/ 10k'},
                                {name: 'KFC', img: 'https://images.unsplash.com/photo-1626082927389-d52b83b40740?w=100&q=80', sales: 'S/ 9.5k'},
                            ].map((r, i) => (
                                <tr key={i} className="table-row-card">
                                    <td>
                                        <div className="d-flex align-items-center gap-3">
                                            <img src={r.img} className="resto-avatar" alt="logo"/>
                                            <span className="fw-bold text-dark">{r.name}</span>
                                        </div>
                                    </td>
                                    <td className="text-end fw-bold text-success">{r.sales}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {/* Live Activity Map Mockup */}
        <div className="row mt-4 animate-enter delay-4">
            <div className="col-12">
                <div className="admin-card">
                    <div className="dash-section-title">
                        <span>Actividad Global en Tiempo Real</span>
                        <span className="badge bg-danger animate-pulse">LIVE</span>
                    </div>
                    <div className="live-activity-map d-flex align-items-center justify-content-center text-muted">
                        <div className="activity-blip" style={{top: '30%', left: '40%'}}></div>
                        <div className="activity-blip" style={{top: '60%', left: '70%'}}></div>
                        <div className="activity-blip" style={{top: '45%', left: '20%'}}></div>
                        <span className="fst-italic">Mapa Interactivo Global (Simulación)</span>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboardPage;
