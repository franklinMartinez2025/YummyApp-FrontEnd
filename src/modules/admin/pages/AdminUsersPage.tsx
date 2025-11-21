import './AdminPages.css';

const AdminUsersPage = () => {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Gestión de Usuarios</h1>
          <p className="admin-page-subtitle">Administra todos los usuarios de la plataforma</p>
        </div>
        <div className="admin-page-actions">
          <button className="admin-btn admin-btn-secondary">
            <i className="bi bi-download me-2"></i>
            Exportar
          </button>
          <button className="admin-btn admin-btn-primary">
            <i className="bi bi-person-plus me-2"></i>
            Nuevo Usuario
          </button>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Lista de Usuarios</h3>
          <div className="admin-search-small">
            <i className="bi bi-search"></i>
            <input type="text" placeholder="Buscar usuario..." />
          </div>
        </div>
        <div className="admin-card-body">
          <div className="admin-empty-state">
            <i className="bi bi-people"></i>
            <h4>Gestión de usuarios</h4>
            <p>Aquí podrás ver y gestionar todos los usuarios del sistema</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;

