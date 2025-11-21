import './AdminPages.css';

const AdminRestaurantsPage = () => {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Gestionar Restaurantes</h1>
          <p className="admin-page-subtitle">Administra todos los restaurantes registrados en la plataforma</p>
        </div>
        <div className="admin-page-actions">
          <button className="admin-btn admin-btn-secondary">
            <i className="bi bi-funnel me-2"></i>
            Filtros
          </button>
          <button className="admin-btn admin-btn-primary">
            <i className="bi bi-plus-lg me-2"></i>
            Agregar Restaurante
          </button>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Lista de Restaurantes</h3>
          <div className="admin-search-small">
            <i className="bi bi-search"></i>
            <input type="text" placeholder="Buscar restaurante..." />
          </div>
        </div>
        <div className="admin-card-body">
          <div className="admin-empty-state">
            <i className="bi bi-shop"></i>
            <h4>No hay restaurantes registrados</h4>
            <p>Comienza agregando tu primer restaurante a la plataforma</p>
            <button className="admin-btn admin-btn-primary">
              <i className="bi bi-plus-lg me-2"></i>
              Agregar Restaurante
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRestaurantsPage;

