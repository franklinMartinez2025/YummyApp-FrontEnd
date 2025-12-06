import '../../dashboard/styles/AdminDashboardPage.css'; // Reusing dashboard styles for cards

const AdminReportsPage = () => {
    return (
        <div className="admin-dashboard-page p-4">
            <div className="container-fluid">
                
                <div className="admin-hero animate-enter">
                    <h2 className="admin-title">Centro de Reportes</h2>
                    <p className="admin-subtitle">Descarga reportes detallados para análisis de negocio.</p>
                </div>

                <div className="row g-4 animate-enter delay-1">
                    {[
                        {title: "Ventas Mensuales", desc: "Desglose por día y restaurante", icon: "bi-file-earmark-spreadsheet", color: "text-success"},
                        {title: "Rendimiento de Drivers", desc: "Tiempos de entrega y calificaciones", icon: "bi-bicycle", color: "text-primary"},
                        {title: "Cancelaciones", desc: "Análisis de pedidos no completados", icon: "bi-x-circle", color: "text-danger"},
                        {title: "Nuevos Usuarios", desc: "Tasa de adquisición mensual", icon: "bi-people", color: "text-info"},
                    ].map((report, i) => (
                        <div key={i} className="col-md-6 col-xl-3">
                            <div className="admin-card text-center p-4 h-100">
                                <div className={`mb-3 display-4 ${report.color}`}>
                                    <i className={`bi ${report.icon}`}></i>
                                </div>
                                <h5 className="fw-bold text-dark">{report.title}</h5>
                                <p className="text-muted small mb-4">{report.desc}</p>
                                <button className="btn btn-outline-dark rounded-pill w-100">
                                    <i className="bi bi-download me-2"></i> Descargar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default AdminReportsPage;
