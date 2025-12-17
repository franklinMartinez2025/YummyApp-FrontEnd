import { useState } from 'react';
import { Link } from 'react-router-dom';

export const CreateRestaurantPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        description: '',
        address: '',
        phone: '',
        deliveryFee: '',
        deliveryTime: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        // Mapeo de IDs a keys del estado
        const keyMap: { [key: string]: string } = {
            'restName': 'name',
            'category': 'category',
            'description': 'description',
            'address': 'address',
            'phone': 'phone',
            'deliveryFee': 'deliveryFee',
            'deliveryTime': 'deliveryTime'
        };
        
        const stateKey = keyMap[id] || id;
        setFormData(prev => ({
            ...prev,
            [stateKey]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulación de envío
        setTimeout(() => {
            setIsLoading(false);
            alert("¡Solicitud enviada con éxito! Pronto nos contactaremos contigo.");
        }, 2000);
    };

    return (
        <div className="min-vh-100 py-5" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="text-center mb-5 animate slideIn">
                            <h1 className="display-4 fw-bold text-dark mb-3">¡Lleva tu Sabor a Todos!</h1>
                            <p className="lead text-muted">Únete a YummyApp y haz crecer tu negocio llegando a miles de clientes.</p>
                        </div>

                        <div className="card border-0 shadow-lg rounded-4 overflow-hidden animate fadeIn">
                            {/* Header con gradiente naranja */}
                            <div className="card-header text-white p-4 text-center border-0" style={{ background: 'linear-gradient(135deg, #FF6B00 0%, #FF8800 100%)' }}>
                                <h3 className="mb-0 fw-bold"><i className="bi bi-shop me-2"></i>Registra tu Restaurante</h3>
                            </div>
                            <div className="card-body p-5 bg-white">
                                <form onSubmit={handleSubmit}>
                                    <h5 className="mb-4 border-bottom pb-2 fw-bold" style={{ color: '#FF6B00' }}>Información del Negocio</h5>
                                    
                                    <div className="row g-3 mb-4">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="restName" className="form-label text-muted fw-bold small">Nombre del Restaurante</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="restName" 
                                                    placeholder="Escribe el nombre aquí" 
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required 
                                                    style={{ backgroundColor: '#fff', borderColor: '#dee2e6', color: '#000', padding: '10px' }} 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="category" className="form-label text-muted fw-bold small">Categoría Principal</label>
                                                <select 
                                                    className="form-select" 
                                                    id="category" 
                                                    value={formData.category}
                                                    onChange={handleChange}
                                                    required
                                                    style={{ backgroundColor: '#fff', borderColor: '#dee2e6', color: '#000', padding: '10px' }}
                                                >
                                                    <option value="" className="text-muted">Selecciona una categoría...</option>
                                                    <option value="6" style={{ color: '#000' }}>No específico (Variado)</option>
                                                    <option value="1" style={{ color: '#000' }}>Comida Rápida</option>
                                                    <option value="2" style={{ color: '#000' }}>Mexicana</option>
                                                    <option value="3" style={{ color: '#000' }}>Italiana</option>
                                                    <option value="4" style={{ color: '#000' }}>Asiática</option>
                                                    <option value="5" style={{ color: '#000' }}>Postres</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <label htmlFor="description" className="form-label text-muted fw-bold small">Descripción del Restaurante</label>
                                                <textarea 
                                                    className="form-control" 
                                                    placeholder="Describe brevemente tu negocio..." 
                                                    id="description" 
                                                    style={{ height: '100px', backgroundColor: '#fff', borderColor: '#dee2e6', color: '#000', padding: '10px' }} 
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    required
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <h5 className="mb-4 border-bottom pb-2 fw-bold" style={{ color: '#FF6B00' }}>Ubicación y Contacto</h5>

                                    <div className="row g-3 mb-4">
                                        <div className="col-md-8">
                                            <div className="form-floating">
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="address" 
                                                    placeholder="Dirección" 
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                    required 
                                                    style={{ backgroundColor: '#fff', borderColor: '#dee2e6', color: '#000' }}
                                                />
                                                <label htmlFor="address" className="text-muted">Dirección Completa</label>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-floating">
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="phone" 
                                                    placeholder="Teléfono" 
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    required 
                                                    style={{ backgroundColor: '#fff', borderColor: '#dee2e6', color: '#000' }}
                                                />
                                                <label htmlFor="phone" className="text-muted">Teléfono de Contacto</label>
                                            </div>
                                        </div>
                                    </div>

                                    <h5 className="mb-4 border-bottom pb-2 fw-bold" style={{ color: '#FF6B00' }}>Detalles del Servicio</h5>

                                    <div className="row g-3 mb-4">
                                        <div className="col-md-6">
                                            <label className="form-label text-muted small fw-bold">Costo de Delivery Base</label>
                                            <div className="input-group">
                                                <span className="input-group-text border-0 bg-light text-dark">$</span>
                                                <input 
                                                    type="number" 
                                                    className="form-control" 
                                                    id="deliveryFee"
                                                    placeholder="0.00" 
                                                    min="0" 
                                                    step="0.50" 
                                                    value={formData.deliveryFee}
                                                    onChange={handleChange}
                                                    required 
                                                    style={{ backgroundColor: '#fff', borderColor: '#dee2e6', color: '#000' }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-muted small fw-bold">Tiempo Estimado (min)</label>
                                            <div className="input-group">
                                                <span className="input-group-text border-0 bg-light text-dark"><i className="bi bi-clock"></i></span>
                                                <input 
                                                    type="number" 
                                                    className="form-control" 
                                                    id="deliveryTime"
                                                    placeholder="Ej: 30-45" 
                                                    value={formData.deliveryTime}
                                                    onChange={handleChange}
                                                    required 
                                                    style={{ backgroundColor: '#fff', borderColor: '#dee2e6', color: '#000' }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <h5 className="mb-4 border-bottom pb-2 fw-bold" style={{ color: '#FF6B00' }}>Imagen Corporativa</h5>

                                    <div className="row g-3 mb-5">
                                        <div className="col-md-6">
                                            <div className="border-2 border-dashed border-secondary border-opacity-25 rounded-3 p-4 text-center hover-effect transition-all cursor-pointer">
                                                <i className="bi bi-image fs-2 mb-2" style={{ color: '#FF6B00' }}></i>
                                                <p className="mb-0 small text-muted">Click para subir Logo</p>
                                                <input type="file" className="d-none" accept="image/*" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="border-2 border-dashed border-secondary border-opacity-25 rounded-3 p-4 text-center hover-effect transition-all cursor-pointer">
                                                <i className="bi bi-card-image fs-2 mb-2" style={{ color: '#FF6B00' }}></i>
                                                <p className="mb-0 small text-muted">Click para subir Banner</p>
                                                <input type="file" className="d-none" accept="image/*" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-lg rounded-pill shadow-sm fw-bold text-white btn-hover-scale" 
                                            disabled={isLoading}
                                            style={{ background: 'linear-gradient(135deg, #FF6B00 0%, #FF8800 100%)', border: 'none' }}>
                                            {isLoading ? (
                                                <span><i className="bi bi-arrow-repeat spin me-2"></i>Enviando Solicitud...</span>
                                            ) : (
                                                <span><i className="bi bi-send-check me-2"></i>Enviar Solicitud de Registro</span>
                                            )}
                                        </button>
                                        <Link to="/" className="btn btn-link text-muted text-decoration-none">
                                            Cancelar y volver al inicio
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                        
                        <div className="text-center mt-5 text-muted small">
                            <p>© 2023 YummyApp Business. Al registrarte aceptas nuestros <a href="#" className="text-decoration-none" style={{ color: '#FF6B00' }}>Términos y Condiciones</a>.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <style>
                {`
                    .hover-effect:hover { background-color: #f8f9fa; border-color: #FF6B00 !important; }
                    .transition-all { transition: all 0.3s ease; }
                    .cursor-pointer { cursor: pointer; }
                    .border-dashed { border-style: dashed !important; }
                    .spin { animation: spin 1s linear infinite; }
                    .btn-hover-scale:hover { transform: scale(1.02); box-shadow: 0 10px 20px rgba(255, 107, 0, 0.2) !important; }
                    /* Forzar colores en inputs y selects */
                    .form-control, .form-select {
                        background-color: #ffffff !important;
                        color: #000000 !important;
                        border: 1px solid #dee2e6;
                    }
                    .form-control:focus, .form-select:focus {
                        background-color: #ffffff !important;
                        color: #000000 !important;
                        border-color: #FF6B00 !important;
                        box-shadow: 0 0 0 0.25rem rgba(255, 107, 0, 0.25) !important;
                    }
                    /* Reglas específicas para el select problemático */
                    select#category {
                        color: #000000 !important;
                        opacity: 1 !important;
                        -webkit-text-fill-color: #000000 !important;
                    }
                    option {
                        color: #000000 !important;
                        background-color: #ffffff !important;
                    }
                    @keyframes spin { 100% { transform: rotate(360deg); } }
                `}
            </style>
        </div>
    );
};

export default CreateRestaurantPage;
