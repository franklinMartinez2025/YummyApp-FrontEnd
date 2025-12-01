import '../../../../modules/admin/dashboard/styles/AdminPages.css';

const RestaurantDriversPage = () => {
  const drivers = [
    { id: 1, name: 'Juan Pérez', status: 'Activo', deliveries: 15, rating: 4.8 },
    { id: 2, name: 'Carlos Ruiz', status: 'En entrega', deliveries: 8, rating: 4.5 },
    { id: 3, name: 'Ana López', status: 'Inactivo', deliveries: 0, rating: 5.0 },
  ];

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gestión de Repartidores</h1>
        <button className="btn btn-primary">
          <i className="bi bi-plus-lg me-2"></i>
          Nuevo Repartidor
        </button>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Estado</th>
                      <th>Entregas Hoy</th>
                      <th>Calificación</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drivers.map(driver => (
                      <tr key={driver.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="bg-light rounded-circle p-2 me-3">
                              <i className="bi bi-person"></i>
                            </div>
                            {driver.name}
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${
                            driver.status === 'Activo' ? 'bg-success' :
                            driver.status === 'En entrega' ? 'bg-warning' : 'bg-secondary'
                          }`}>
                            {driver.status}
                          </span>
                        </td>
                        <td>{driver.deliveries}</td>
                        <td>
                          <div className="d-flex align-items-center text-warning">
                            <span className="me-1">{driver.rating}</span>
                            <i className="bi bi-star-fill"></i>
                          </div>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-2">
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-danger">
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDriversPage;
