import { useState } from 'react';
import '../../foods/styles/RestaurantFoodsPage.css';

// Mock Data specialized for Foods/Kitchen management
const FOOD_ITEMS = [
  {
    id: 1,
    name: "Lomo Saltado",
    category: "Platos Fuertes",
    price: 18.00,
    prepTime: "15-20 min",
    calories: "850 kcal",
    stockStatus: "high", // high, low, out
    stockCount: 45,
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Ceviche Clásico",
    category: "Entradas",
    price: 14.50,
    prepTime: "10-12 min",
    calories: "350 kcal",
    stockStatus: "low",
    stockCount: 5,
    image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Ají de Gallina",
    category: "Platos Fuertes",
    price: 12.00,
    prepTime: "25 min",
    calories: "720 kcal",
    stockStatus: "high",
    stockCount: 22,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Suspiro a la Limeña",
    category: "Postres",
    price: 8.50,
    prepTime: "5 min",
    calories: "450 kcal",
    stockStatus: "out",
    stockCount: 0,
    image: "https://images.unsplash.com/photo-1517093750588-0661ca3959b1?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Pisco Sour",
    category: "Bebidas",
    price: 10.00,
    prepTime: "5 min",
    calories: "210 kcal",
    stockStatus: "high",
    stockCount: 100,
    image: "https://images.unsplash.com/photo-1510626176961-4b57d4fbad58?q=80&w=600&auto=format&fit=crop"
  }
];

type FilterType = 'all' | 'high' | 'low' | 'out';

const RestaurantFoodsPage = () => {
  const [filter, setFilter] = useState<FilterType>('all');

  const getFilteredItems = () => {
    if (filter === 'all') return FOOD_ITEMS;
    return FOOD_ITEMS.filter(item => item.stockStatus === filter);
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="restaurant-foods-page p-4">
      <div className="container-fluid">
        
        {/* Header */}
        <div className="text-center mb-5 animate-fade-in-up">
            <h1 className="fw-bold mb-2 text-dark">Inventario de Comidas</h1>
            <p className="text-secondary max-w-md mx-auto">
                Gestiona la disponibilidad, precios y tiempos de preparación de tus platillos en tiempo real.
            </p>
        </div>

        {/* Filters */}
        <div className="food-filters animate-fade-in-up delay-1">
            <button 
                className={`food-filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
            >
                Todos
            </button>
            <button 
                className={`food-filter-btn ${filter === 'high' ? 'active' : ''}`}
                onClick={() => setFilter('high')}
            >
                Stock Alto
            </button>
            <button 
                className={`food-filter-btn ${filter === 'low' ? 'active' : ''}`}
                onClick={() => setFilter('low')}
            >
                Stock Bajo
            </button>
            <button 
                className={`food-filter-btn ${filter === 'out' ? 'active' : ''}`}
                onClick={() => setFilter('out')}
            >
                Agotados
            </button>
        </div>

        {/* Grid */}
        <div className="row g-4 animate-fade-in-up delay-2">
            {filteredItems.map(item => (
                <div key={item.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
                    <div className="food-card">
                        <div className="food-img-container">
                            <img src={item.image} alt={item.name} className="food-img" />
                            <div className="prep-time-badge">
                                <i className="bi bi-clock-fill"></i>
                                {item.prepTime}
                            </div>
                        </div>
                        <div className="food-details">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <span className="badge bg-light text-dark border">{item.category}</span>
                                <div className="d-flex align-items-center" title={`Stock: ${item.stockCount}`}>
                                    <span className={`stock-indicator stock-${item.stockStatus}`}></span>
                                    <small className="text-muted fw-bold">
                                        {item.stockStatus === 'out' ? 'Agotado' : `${item.stockCount} und.`}
                                    </small>
                                </div>
                            </div>
                            
                            <h5 className="fw-bold mb-1">{item.name}</h5>
                            <span className="calories-text mb-3 d-block">Aprox. {item.calories}</span>

                            <div className="d-flex align-items-end mt-auto">
                                <h4 className="mb-0 text-primary fw-bold">${item.price.toFixed(2)}</h4>
                            </div>

                            <div className="food-actions">
                                <button className="btn btn-sm btn-light border rounded-circle" title="Editar">
                                    <i className="bi bi-pencil-fill text-secondary"></i>
                                </button>
                                <button className="btn btn-sm btn-light border rounded-circle" title="Duplicar">
                                    <i className="bi bi-files text-secondary"></i>
                                </button>
                                <button className="btn btn-sm btn-light border rounded-circle" title="Ocultar">
                                    <i className="bi bi-eye-slash-fill text-secondary"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* FAB */}
        <button className="fab-add shadow-lg" title="Agregar Nueva Comida">
            <i className="bi bi-plus-lg"></i>
        </button>

      </div>
    </div>
  );
};

export default RestaurantFoodsPage;

