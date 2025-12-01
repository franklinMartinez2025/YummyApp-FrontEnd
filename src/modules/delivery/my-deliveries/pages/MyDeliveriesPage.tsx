import '../styles/DeliveryPages.css';

const MyDeliveriesPage = () => {
  return (
    <div className="delivery-page">
      <header className="delivery-header">
        <h1 className="delivery-header-title">Mis Entregas</h1>
      </header>

      <div className="tabs-container mb-3">
        {/* Simple tabs could be added here */}
      </div>

      <div className="deliveries-list">
        <div className="empty-state-card">
          <i className="bi bi-clock-history"></i>
          <p>No tienes historial de entregas hoy.</p>
        </div>
      </div>
    </div>
  );
};

export default MyDeliveriesPage;
