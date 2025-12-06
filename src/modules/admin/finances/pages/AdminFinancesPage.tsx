import '../../finances/styles/AdminFinancesPage.css';

const AdminFinancesPage = () => {
    return (
        <div className="admin-finances-page p-4">
            <div className="container-fluid">
                
                <div className="finances-header animate-enter">
                    <h2 className="fw-bold mb-1 text-dark">Finanzas</h2>
                    <p className="text-muted">Resumen de ingresos y comisiones de la plataforma.</p>
                </div>

                <div className="row g-4 mb-5">
                    {/* Main Wallet */}
                    <div className="col-lg-6 animate-enter delay-1">
                        <div className="wallet-card">
                            <div className="wallet-label">Balance Total</div>
                            <div className="wallet-amount">
                                <span className="wallet-currency">S/</span>
                                45,280.00
                            </div>
                            <button className="btn-withdraw">
                                <i className="bi bi-bank me-2"></i> Solicitar Retiro
                            </button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="col-lg-6">
                        <div className="row g-4 h-100">
                            <div className="col-md-6 animate-enter delay-2">
                                <div className="commission-card">
                                    <div className="commission-icon">
                                        <i className="bi bi-graph-up-arrow"></i>
                                    </div>
                                    <div>
                                        <h3 className="mb-0 fw-bold text-dark">S/ 4,500</h3>
                                        <small className="text-muted">Comisiones (Este Mes)</small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 animate-enter delay-2">
                                <div className="commission-card">
                                    <div className="commission-icon bucket-icon" style={{background: '#eff6ff', color: '#3b82f6'}}>
                                        <i className="bi bi-send"></i>
                                    </div>
                                    <div>
                                        <h3 className="mb-0 fw-bold text-dark">S/ 120k</h3>
                                        <small className="text-muted">Pagado a Restaurantes</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transactions */}
                <div className="row animate-enter delay-3">
                    <div className="col-12">
                        <div className="transactions-section">
                            <div className="section-header">
                                <h5 className="mb-0 fw-bold text-dark">Historial de Transacciones</h5>
                                <button className="btn btn-sm btn-outline-light text-dark border">
                                    <i className="bi bi-download"></i> Exportar CSV
                                </button>
                            </div>
                            <ul className="transaction-list">
                                {[
                                    {id: 1, title: "Comisión Pedido #9021", date: "Hoy, 10:42 AM", amount: "+ S/ 4.50", type: "pos"},
                                    {id: 2, title: "Pago a Bembos", date: "Ayer, 06:00 PM", amount: "- S/ 2,400.00", type: "neg"},
                                    {id: 3, title: "Comisión Pedido #9020", date: "Ayer, 05:30 PM", amount: "+ S/ 12.00", type: "pos"},
                                    {id: 4, title: "Retiro a Cuenta Bancaria", date: "02 Dic, 2024", amount: "- S/ 10,000.00", type: "neg"},
                                    {id: 5, title: "Comisión Mensual Premium", date: "01 Dic, 2024", amount: "+ S/ 150.00", type: "pos"},
                                ].map(trans => (
                                    <li key={trans.id} className="transaction-item">
                                        <div className="d-flex align-items-center">
                                            <div className="trans-icon">
                                                <i className={`bi bi-${trans.type === 'pos' ? 'arrow-down-left' : 'arrow-up-right'}`}></i>
                                            </div>
                                            <div className="trans-info">
                                                <h6>{trans.title}</h6>
                                                <span className="trans-date">{trans.date}</span>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <span className={`trans-amount ${trans.type === 'pos' ? 'amount-positive' : 'amount-negative'}`}>
                                                {trans.amount}
                                            </span>
                                            <span className="trans-status">Completado</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminFinancesPage;
