import { useRestaurantContext } from '../../context/RestaurantContext';
import '../../dashboard/styles/RestaurantDashboardPage.css';

const RestaurantDashboardPage = () => {
    const { restaurantName } = useRestaurantContext();
    
    // Get current date formatted in Spanish
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    const dateString = currentDate.toLocaleDateString('es-ES', options);
    // Capitalize first letter (e.g., "jueves, 5 de diciembre" -> "Jueves, 5 de diciembre")
    const formattedDate = dateString.charAt(0).toUpperCase() + dateString.slice(1);

    // Mock Data for Charts
    const WEEKLY_SALES = [
        { day: 'Lun', height: '40%' },
        { day: 'Mar', height: '60%' },
        { day: 'Mié', height: '45%' },
        { day: 'Jue', height: '80%' },
        { day: 'Vie', height: '90%' },
        { day: 'Sáb', height: '100%' },
        { day: 'Dom', height: '85%' },
    ];

    return (
        <div className="restaurant-dashboard-page p-4">
            <div className="container-fluid">
                
                {/* Hero Section */}
                <div className="row mb-4 animate-slide-up">
                    <div className="col-12 welcome-hero">
                        <h1 className="welcome-title">Hola, bienvenido a tu restaurante "{restaurantName || 'YummyApp'}" 👋</h1>
                        <p className="welcome-subtitle">Aquí tienes el resumen de tu operación hoy, {formattedDate}.</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="row g-4 mb-5">
                    
                    {/* Stat 1: Sales */}
                    <div className="col-md-6 col-xl-3 animate-slide-up delay-1">
                        <div className="glass-card">
                            <div className="stat-card-inner">
                                <div className="stat-icon icon-blue">
                                    <i className="bi bi-currency-dollar"></i>
                                </div>
                                <div>
                                    <h3 className="stat-value">S/ 3,450</h3>
                                    <div className="stat-label">Ventas Hoy</div>
                                    <div className="stat-trend trend-up">
                                        <i className="bi bi-arrow-up-right"></i> 12% vs ayer
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stat 2: Orders */}
                    <div className="col-md-6 col-xl-3 animate-slide-up delay-2">
                        <div className="glass-card">
                            <div className="stat-card-inner">
                                <div className="stat-icon icon-orange">
                                    <i className="bi bi-receipt"></i>
                                </div>
                                <div>
                                    <h3 className="stat-value">84</h3>
                                    <div className="stat-label">Pedidos Totales</div>
                                    <div className="stat-trend trend-up">
                                        <i className="bi bi-arrow-up-right"></i> 5% vs ayer
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stat 3: Prep Time */}
                    <div className="col-md-6 col-xl-3 animate-slide-up delay-3">
                        <div className="glass-card">
                            <div className="stat-card-inner">
                                <div className="stat-icon icon-red">
                                    <i className="bi bi-stopwatch"></i>
                                </div>
                                <div>
                                    <h3 className="stat-value">18m</h3>
                                    <div className="stat-label">Tiempo Promedio</div>
                                    <div className="stat-trend trend-down">
                                        <i className="bi bi-arrow-down-right"></i> 2m más rápido
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stat 4: Rating */}
                    <div className="col-md-6 col-xl-3 animate-slide-up delay-4">
                        <div className="glass-card">
                            <div className="stat-card-inner">
                                <div className="stat-icon icon-green">
                                    <i className="bi bi-star-fill"></i>
                                </div>
                                <div>
                                    <h3 className="stat-value">4.8</h3>
                                    <div className="stat-label">Calificación</div>
                                    <div className="stat-trend text-muted">
                                        <i className="bi bi-dash"></i> Estable
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Split: Chart & Activity */}
                <div className="row g-4 mb-5">
                    
                    {/* Sales Chart */}
                    <div className="col-lg-8 animate-slide-up delay-3">
                        <div className="glass-card">
                            <h4 className="fw-bold mb-4 text-dark">Rendimiento Semanal</h4>
                            <div className="chart-container">
                                {WEEKLY_SALES.map((item, idx) => (
                                    <div key={idx} className="chart-bar-wrapper">
                                        <div className="chart-bar" style={{height: item.height}}></div>
                                        <span className="chart-label">{item.day}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="col-lg-4 animate-slide-up delay-4">
                        <div className="glass-card">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h4 className="fw-bold mb-0 text-dark">Actividad Reciente</h4>
                                <button className="btn btn-sm btn-light rounded-pill">Ver todo</button>
                            </div>
                            
                            <div className="activity-list">
                                <div className="activity-item">
                                    <div className="activity-icon bg-light-success text-success">
                                        <i className="bi bi-check-lg"></i>
                                    </div>
                                    <div>
                                        <h6 className="mb-0 fw-bold text-dark">Pedido #9021 Entregado</h6>
                                        <small className="text-muted">Hace 5 minutos • Juan Pérez</small>
                                    </div>
                                </div>
                                <div className="activity-item">
                                    <div className="activity-icon bg-light-primary text-primary">
                                        <i className="bi bi-bicycle"></i>
                                    </div>
                                    <div>
                                        <h6 className="mb-0 fw-bold text-dark">Repartidor Asignado</h6>
                                        <small className="text-muted">Hace 12 minutos • Carlos Ruiz</small>
                                    </div>
                                </div>
                                <div className="activity-item">
                                    <div className="activity-icon bg-light-warning text-warning">
                                        <i className="bi bi-bell-fill"></i>
                                    </div>
                                    <div>
                                        <h6 className="mb-0 fw-bold text-dark">Nuevo Pedido #9022</h6>
                                        <small className="text-muted">Hace 20 minutos • S/ 85.00</small>
                                    </div>
                                </div>
                                <div className="activity-item">
                                    <div className="activity-icon">
                                        <i className="bi bi-gear"></i>
                                    </div>
                                    <div>
                                        <h6 className="mb-0 fw-bold text-dark">Menú Actualizado</h6>
                                        <small className="text-muted">Hace 2 horas • Admin</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Quick Links Section (Navigation Hub) */}
                <div className="row g-4 animate-slide-up delay-4">
                    <div className="col-12">
                        <h4 className="fw-bold mb-3 text-dark">Accesos Rápidos</h4>
                    </div>
                    
                    <div className="col-6 col-md-4 col-lg-2">
                        <div className="btn-quick-link cursor-pointer">
                            <i className="bi bi-book quick-icon"></i>
                            <span className="fw-bold">Menú</span>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                        <div className="btn-quick-link cursor-pointer">
                            <i className="bi bi-grid quick-icon"></i>
                            <span className="fw-bold">Pedidos</span>
                            <span className="badge bg-danger rounded-pill mt-2">3 New</span>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                        <div className="btn-quick-link cursor-pointer">
                            <i className="bi bi-bicycle quick-icon"></i>
                            <span className="fw-bold">Flota</span>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                        <div className="btn-quick-link cursor-pointer">
                            <i className="bi bi-graph-up quick-icon"></i>
                            <span className="fw-bold">Reportes</span>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                        <div className="btn-quick-link cursor-pointer">
                            <i className="bi bi-person-badge quick-icon"></i>
                            <span className="fw-bold">Personal</span>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                        <div className="btn-quick-link cursor-pointer">
                            <i className="bi bi-sliders quick-icon"></i>
                            <span className="fw-bold">Ajustes</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RestaurantDashboardPage;

