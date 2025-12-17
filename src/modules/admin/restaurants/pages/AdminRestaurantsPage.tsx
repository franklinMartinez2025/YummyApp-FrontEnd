import { useState } from 'react';
import '../../restaurants/styles/AdminRestaurantsPage.css';

// Mock Data
const MOCK_RESTAURANTS = [
    { id: 1, name: "Yummy Burger", email: "contact@yummyburger.com", category: "Hamburguesas", status: "active", sales: "S/ 15,400", joinDate: "12 Oct 2024", logo: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=100&q=80" },
    { id: 2, name: "Pizza Hut", email: "gerencia@pizzahut.pe", category: "Pizzas", status: "active", sales: "S/ 23,100", joinDate: "05 Nov 2024", logo: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&q=80" },
    { id: 3, name: "Sushi Bar", email: "admin@sushibar.com", category: "Japonesa", status: "pending", sales: "S/ 0.00", joinDate: "Hoy", logo: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=100&q=80" },
    { id: 4, name: "Tacos Mexicanos", email: "hola@tacos.mx", category: "Mexicana", status: "blocked", sales: "S/ 1,200", joinDate: "01 Sep 2024", logo: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=100&q=80" },
];

const AdminRestaurantsPage = () => {
  const [restaurants /*, setRestaurants */] = useState(MOCK_RESTAURANTS);
  const [filter, setFilter] = useState('');

  const filteredRestos = restaurants.filter(r => r.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="admin-restaurants-page p-4">
      <div className="container-fluid">
        
        {/* Header */}
        <div className="page-header animate-enter">
            <div>
                <h2 className="fw-bold mb-1 text-dark">Gestión de Restaurantes</h2>
                <p className="text-muted mb-0">Administra a los socios comerciales de la plataforma.</p>
            </div>
            <button className="btn-add-resto shadow-sm">
                <i className="bi bi-plus-lg"></i> Agregar Socio
            </button>
        </div>

        {/* Filters & Table */}
        <div className="admin-table-card animate-enter delay-1">
            <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
                <div className="search-bar">
                    <i className="bi bi-search search-icon"></i>
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder="Buscar por nombre..." 
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
                <div className="d-flex gap-2">
                    <button className="btn btn-outline-light text-dark border">
                        <i className="bi bi-filter"></i> Filtros
                    </button>
                    <button className="btn btn-outline-light text-dark border">
                        <i className="bi bi-download"></i> Exportar
                    </button>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table-custom">
                    <thead>
                        <tr>
                            <th>Restaurante</th>
                            <th>Categoría</th>
                            <th>Fecha Ingreso</th>
                            <th>Ventas Totales</th>
                            <th>Estado</th>
                            <th className="text-end">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRestos.map(resto => (
                            <tr key={resto.id}>
                                <td>
                                    <div className="cell-resto-info">
                                        <img src={resto.logo} alt="logo" className="cell-avatar" />
                                        <div>
                                            <span className="cell-name">{resto.name}</span>
                                            <span className="cell-email">{resto.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="badge bg-light text-dark border">{resto.category}</span>
                                </td>
                                <td className="text-muted text-sm">{resto.joinDate}</td>
                                <td className="fw-bold text-dark">{resto.sales}</td>
                                <td>
                                    {resto.status === 'active' && (
                                        <span className="status-badge status-active"><span className="status-dot"></span> Activo</span>
                                    )}
                                    {resto.status === 'pending' && (
                                        <span className="status-badge status-pending"><span className="status-dot"></span> Pendiente</span>
                                    )}
                                    {resto.status === 'blocked' && (
                                        <span className="status-badge status-blocked"><span className="status-dot"></span> Bloqueado</span>
                                    )}
                                </td>
                                <td>
                                    <div className="action-btn-group justify-content-end">
                                        {resto.status === 'pending' && (
                                            <button className="btn-icon-action btn-approve" title="Aprobar">
                                                <i className="bi bi-check-lg"></i>
                                            </button>
                                        )}
                                        <button className="btn-icon-action" title="Ver Detalles">
                                            <i className="bi bi-eye"></i>
                                        </button>
                                        <button className="btn-icon-action" title="Editar">
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                        {resto.status !== 'blocked' && (
                                            <button className="btn-icon-action btn-block" title="Bloquear">
                                                <i className="bi bi-slash-circle"></i>
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {filteredRestos.length === 0 && (
                <div className="text-center p-5 text-muted">
                    <i className="bi bi-search h1 mb-3 d-block"></i>
                    No se encontraron restaurantes con ese nombre.
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default AdminRestaurantsPage;
