import { useState, useEffect } from 'react';
import '../../drivers/styles/RestaurantDriversPage.css';

// Mock Data
const DRIVERS = [
  {
    id: 1,
    name: "Juan Pérez",
    status: 'active', // active, busy, offline
    deliveriesToday: 12,
    rating: 4.8,
    vehicle: "Honda 150cc - Placa: A1-456",
    avatar: "https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=200&auto=format&fit=crop",
    coords: { top: '30%', left: '20%' }
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    status: 'busy',
    deliveriesToday: 8,
    rating: 4.5,
    vehicle: "Yamaha YBR - Placa: B2-789",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop",
    coords: { top: '60%', left: '70%' }
  },
  {
    id: 3,
    name: "Ana López",
    status: 'active',
    deliveriesToday: 15,
    rating: 5.0,
    vehicle: "Suzuki Gixxer - Placa: C3-101",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    coords: { top: '40%', left: '50%' }
  },
  {
    id: 4,
    name: "Sofia Medina",
    status: 'offline',
    deliveriesToday: 0,
    rating: 4.9,
    vehicle: "Bicicleta Eléctrica",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    coords: { top: '80%', left: '10%' }
  }
];

const RestaurantDriversPage = () => {
    // Simple mock animation for map dots
    const [positions, setPositions] = useState(DRIVERS.map(d => d.coords));

    useEffect(() => {
        const interval = setInterval(() => {
            // Jiggle effect to simulate movement
            setPositions(prev => prev.map(pos => ({
                top: `${Math.max(10, Math.min(90, parseInt(pos.top) + (Math.random() * 4 - 2)))}%`,
                left: `${Math.max(10, Math.min(90, parseInt(pos.left) + (Math.random() * 4 - 2)))}%`
            })));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

  return (
    <div className="restaurant-drivers-page p-4">
      <div className="container-fluid">
        
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h2 className="fw-bold mb-1 text-dark">Flota de Repartidores</h2>
                <p className="text-secondary mb-0">Monitoreo en tiempo real y gestión de cuentas</p>
            </div>
        </div>

        {/* Live Map Section */}
        <div className="live-map-container animate-fade-in">
            <div className="map-stats-overlay">
                <div className="map-stat-item">
                    <span className="map-stat-val text-primary">{DRIVERS.filter(d => d.status === 'active').length}</span>
                    <span className="map-stat-label">Libres</span>
                </div>
                <div className="map-stat-item">
                    <span className="map-stat-val text-warning">{DRIVERS.filter(d => d.status === 'busy').length}</span>
                    <span className="map-stat-label">En Ruta</span>
                </div>
            </div>

            {DRIVERS.filter(d => d.status !== 'offline').map((driver, idx) => (
                <div 
                    key={driver.id} 
                    className="map-driver-dot" 
                    style={{ top: positions[idx].top, left: positions[idx].left }}
                >
                    <i className="bi bi-bicycle"></i>
                    <div className="map-tooltip">{driver.name}</div>
                </div>
            ))}
        </div>

        {/* Drivers Grid */}
        <div className="row g-4 mb-5">
            {DRIVERS.map(driver => (
                <div key={driver.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
                    <div className={`driver-card status-${driver.status}`}>
                        <div className="driver-status-line"></div>
                        
                        <div className="driver-header">
                            <img src={driver.avatar} alt={driver.name} className="driver-avatar" />
                            <div className="driver-info">
                                <h5>{driver.name}</h5>
                                <div className="driver-rating">
                                    <i className="bi bi-star-fill me-1"></i>
                                    {driver.rating}
                                </div>
                            </div>
                        </div>

                        <div className="driver-vehicle">
                            <i className="bi bi-speedometer2"></i>
                            <span className="text-truncate">{driver.vehicle}</span>
                        </div>

                        <div className="driver-stats-row">
                            <div className="mini-stat">
                                <h6>{driver.deliveriesToday}</h6>
                                <small>Hoy</small>
                            </div>
                            <div className="mini-stat">
                                <h6>98%</h6>
                                <small>Aceptación</small>
                            </div>
                            <div className="mini-stat">
                                <h6>15m</h6>
                                <small>Promedio</small>
                            </div>
                        </div>

                        <div className="driver-footer">
                            <button className="btn-assign">
                                {driver.status === 'busy' ? 'Ver Pedido' : 'Asignar'}
                            </button>
                            <button className="btn-icon-sq" title="Llamar">
                                <i className="bi bi-telephone-fill"></i>
                            </button>
                            <button className="btn-icon-sq" title="Ajustes">
                                <i className="bi bi-gear-fill"></i>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* FAB */}
        <button className="fab-driver shadow-lg" title="Agregar Nuevo Repartidor">
            <i className="bi bi-plus-lg"></i>
        </button>

      </div>
    </div>
  );
};

export default RestaurantDriversPage;
