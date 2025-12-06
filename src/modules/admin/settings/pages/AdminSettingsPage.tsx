import '../../../../modules/admin/dashboard/styles/AdminDashboardPage.css'; // Reusing layout

const AdminSettingsPage = () => {
    return (
        <div className="admin-dashboard-page p-4">
            <div className="container-fluid">
                
                <div className="admin-hero animate-enter">
                    <h2 className="admin-title">Configuración</h2>
                    <p className="admin-subtitle">Ajustes globales de la plataforma YummyApp.</p>
                </div>

                <div className="row animate-enter delay-1">
                    <div className="col-lg-8">
                        <div className="admin-card mb-4">
                            <h5 className="fw-bold mb-4 text-dark">General</h5>
                            <form>
                                <div className="mb-3">
                                    <label className="form-label text-muted">Comisión Base (%)</label>
                                    <input type="number" className="form-control" defaultValue={10} />
                                    <small className="text-muted">Porcentaje cobrado por cada pedido a los restaurantes.</small>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-muted">Moneda Principal</label>
                                    <select className="form-select">
                                        <option>S/ (Soles)</option>
                                        <option>$ (USD)</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label text-muted">Radio de Cobertura (km)</label>
                                    <input type="number" className="form-control" defaultValue={5} />
                                </div>
                                <button className="btn btn-primary bg-gradient-blue border-0 px-4">Guardar Cambios</button>
                            </form>
                        </div>

                        <div className="admin-card border-danger">
                            <h5 className="fw-bold mb-4 text-danger">Zona de Peligro</h5>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="mb-1 fw-bold text-dark">Modo Mantenimiento</h6>
                                    <p className="text-muted small mb-0">La app no estará disponible para los usuarios.</p>
                                </div>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminSettingsPage;
