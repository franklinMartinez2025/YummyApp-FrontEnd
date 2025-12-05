import { useState } from 'react';
import '../../settings/styles/RestaurantSettingsPage.css';

type SettingsTab = 'general' | 'schedule' | 'notifications' | 'security';

const RestaurantSettingsPage = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');

  // Mock State for interactivity
  const [isOpen, setIsOpen] = useState(true);
  const [notifOrders, setNotifOrders] = useState(true);
  const [restaurantName, setRestaurantName] = useState("Yummy Burger - Central");

  return (
    <div className="restaurant-settings-page p-4">
      <div className="container-fluid">
        <h2 className="fw-bold mb-4 text-dark">Configuración del Restaurante</h2>
        
        <div className="settings-container">
            {/* Sidebar Navigation */}
            <div className="settings-nav">
                <div 
                    className={`settings-nav-item ${activeTab === 'general' ? 'active' : ''}`}
                    onClick={() => setActiveTab('general')}
                >
                    <i className="bi bi-shop"></i> General
                </div>
                <div 
                    className={`settings-nav-item ${activeTab === 'schedule' ? 'active' : ''}`}
                    onClick={() => setActiveTab('schedule')}
                >
                    <i className="bi bi-clock"></i> Horarios
                </div>
                <div 
                    className={`settings-nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
                    onClick={() => setActiveTab('notifications')}
                >
                    <i className="bi bi-bell"></i> Notificaciones
                </div>
                <div 
                    className={`settings-nav-item ${activeTab === 'security' ? 'active' : ''}`}
                    onClick={() => setActiveTab('security')}
                >
                    <i className="bi bi-shield-lock"></i> Seguridad
                </div>
            </div>

            {/* Content Area */}
            <div className="settings-content animate-fade-in">
                
                {activeTab === 'general' && (
                    <div>
                        <h4 className="section-title">Perfil del Restaurante</h4>
                        
                        <div className="profile-uploader">
                            <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=200&auto=format&fit=crop" alt="Logo" className="profile-preview" />
                            <div className="wrapper-btn-upload">
                                <span className="fw-bold text-dark">Logo del Restaurante</span>
                                <small className="text-muted mb-2">Recomendado: 500x500px, PNG o JPG</small>
                                <div>
                                    <button className="btn-upload me-2">Cambiar Logo</button>
                                    <br className="d-md-none" />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Nombre del Negocio</label>
                            <input 
                                type="text" 
                                className="form-control-custom" 
                                value={restaurantName}
                                onChange={(e) => setRestaurantName(e.target.value)}
                            />
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Categoría Principal</label>
                                    <select className="form-control-custom">
                                        <option>Hamburguesas</option>
                                        <option>Pizzas</option>
                                        <option>Comida Peruana</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Teléfono de Contacto</label>
                                    <input type="tel" className="form-control-custom" defaultValue="+51 999 888 777" />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Descripción Corta</label>
                            <textarea className="form-control-custom" rows={3} defaultValue="Las mejores hamburguesas artesanales de la ciudad, hechas con carne 100% Angus."></textarea>
                        </div>
                    </div>
                )}

                {activeTab === 'schedule' && (
                    <div>
                        <h4 className="section-title">Horarios de Atención</h4>
                        
                        <div className="toggle-switch">
                            <div>
                                <span className="toggle-label">Restaurante Abierto Ahora</span>
                                <span className="toggle-desc">Control manual de disponibilidad</span>
                            </div>
                            <label className="switch">
                                <input type="checkbox" checked={isOpen} onChange={() => setIsOpen(!isOpen)} />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="mt-4">
                            {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(day => (
                                <div className="schedule-row" key={day}>
                                    <span className="day-label">{day}</span>
                                    <div className="time-inputs">
                                        <input type="time" className="form-control-custom" defaultValue="09:00" />
                                        <span>a</span>
                                        <input type="time" className="form-control-custom" defaultValue="22:00" />
                                    </div>
                                    <div className="form-check form-switch ms-3">
                                        <input className="form-check-input" type="checkbox" defaultChecked={day !== 'Domingo'} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'notifications' && (
                    <div>
                        <h4 className="section-title">Preferencias de Notificación</h4>
                        
                        <div className="toggle-switch">
                            <div>
                                <span className="toggle-label">Nuevos Pedidos</span>
                                <span className="toggle-desc">Recibir alerta sonora cuando llegue un pedido</span>
                            </div>
                            <label className="switch">
                                <input type="checkbox" checked={notifOrders} onChange={() => setNotifOrders(!notifOrders)} />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="toggle-switch">
                            <div>
                                <span className="toggle-label">Alertas de Stock Bajo</span>
                                <span className="toggle-desc">Notificar cuando un producto tenga menos de 5 unidades</span>
                            </div>
                            <label className="switch">
                                <input type="checkbox" defaultChecked />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="toggle-switch">
                            <div>
                                <span className="toggle-label">Resumen Diario por Email</span>
                                <span className="toggle-desc">Recibir reporte de ventas al cierre de caja</span>
                            </div>
                            <label className="switch">
                                <input type="checkbox" />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                )}

                {activeTab === 'security' && (
                    <div>
                        <h4 className="section-title">Seguridad de la Cuenta</h4>
                        <div className="alert alert-info">
                            <i className="bi bi-info-circle me-2"></i>
                            Para realizar cambios sensibles, te pediremos tu contraseña actual.
                        </div>

                        <div className="form-group">
                            <label className="form-label">Correo Electrónico</label>
                            <input type="email" className="form-control-custom" value="admin@yummyburger.com" disabled />
                        </div>

                        <button className="btn btn-outline-danger mt-3">
                            <i className="bi bi-key me-2"></i> Cambiar Contraseña
                        </button>
                    </div>
                )}

                <div className="border-top pt-3 mt-4">
                    <button className="btn-save">
                        Guardar Cambios
                    </button>
                </div>

            </div>
        </div>

      </div>
    </div>
  );
};

export default RestaurantSettingsPage;

