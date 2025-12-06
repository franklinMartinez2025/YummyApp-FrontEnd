import { useState } from 'react';
import '../../restaurants/styles/AdminRestaurantsPage.css'; // Reusing table styles for consistency

const MOCK_USERS = [
    { id: 1, name: "Admin Principal", email: "admin@yummy.com", role: "admin", status: "active" },
    { id: 2, name: "Juan Pérez", email: "juan@gmail.com", role: "client", status: "active" },
    { id: 3, name: "Carlos Driver", email: "carlos@driver.com", role: "driver", status: "busy" },
    { id: 4, name: "María Cliente", email: "maria@outlook.com", role: "client", status: "active" },
];

const AdminUsersPage = () => {
    const [filter, setFilter] = useState('');

    const filteredUsers = MOCK_USERS.filter(u => u.name.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div className="admin-restaurants-page p-4"> {/* Reusing layout class */}
            <div className="container-fluid">
                
                <div className="page-header animate-enter">
                    <div>
                        <h2 className="fw-bold mb-1 text-dark">Usuarios</h2>
                        <p className="text-muted mb-0">Gestión de todos los usuarios de la plataforma.</p>
                    </div>
                    <button className="btn-add-resto shadow-sm">
                        <i className="bi bi-person-plus"></i> Nuevo Usuario
                    </button>
                </div>

                <div className="admin-table-card animate-enter delay-1">
                    <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
                        <div className="search-bar">
                            <i className="bi bi-search search-icon"></i>
                            <input 
                                type="text" 
                                className="search-input" 
                                placeholder="Buscar usuario..." 
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table-custom">
                            <thead>
                                <tr>
                                    <th>Usuario</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                    <th>Estado</th>
                                    <th className="text-end">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map(user => (
                                    <tr key={user.id}>
                                        <td className="fw-bold text-dark">{user.name}</td>
                                        <td className="text-muted">{user.email}</td>
                                        <td>
                                            {user.role === 'admin' && <span className="badge bg-dark">Admin</span>}
                                            {user.role === 'driver' && <span className="badge bg-warning text-dark">Driver</span>}
                                            {user.role === 'client' && <span className="badge bg-info text-dark">Cliente</span>}
                                        </td>
                                        <td>
                                            <span className="status-badge status-active"><span className="status-dot"></span> Activo</span>
                                        </td>
                                        <td>
                                            <div className="action-btn-group justify-content-end">
                                                <button className="btn-icon-action" title="Editar">
                                                    <i className="bi bi-pencil"></i>
                                                </button>
                                                <button className="btn-icon-action btn-block" title="Bloquear">
                                                    <i className="bi bi-slash-circle"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminUsersPage;
