import { useState } from 'react';
import '../../drinks/styles/RestaurantDrinksPage.css';

// Mock Data
const DRINK_ITEMS = [
  {
    id: 1,
    name: "Mojito Clásico",
    category: "Cócteles",
    price: 8.50,
    volume: "350 ml",
    type: "cold", // cold, hot
    isAlcoholic: true,
    alcoholContent: "12%",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f388?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Cappuccino Italiano",
    category: "Cafés",
    price: 4.00,
    volume: "250 ml",
    type: "hot",
    isAlcoholic: false,
    alcoholContent: "0%",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Cerveza Artesanal IPA",
    category: "Cervezas",
    price: 6.50,
    volume: "500 ml",
    type: "cold",
    isAlcoholic: true,
    alcoholContent: "6.5%",
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Limonada Frozen de Mango",
    category: "Jugos",
    price: 5.00,
    volume: "400 ml",
    type: "cold",
    isAlcoholic: false,
    alcoholContent: "0%",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Vino Tinto Malbec",
    category: "Vinos",
    price: 24.00,
    volume: "750 ml",
    type: "cold", // Served room temp usually but classified here for Icon purposes
    isAlcoholic: true,
    alcoholContent: "13.5%",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Té Matcha Latte",
    category: "Infusiones",
    price: 4.50,
    volume: "300 ml",
    type: "hot",
    isAlcoholic: false,
    alcoholContent: "0%",
    image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3114?q=80&w=600&auto=format&fit=crop"
  }
];

type FilterType = 'all' | 'alcoholic' | 'non-alcoholic' | 'cold' | 'hot';

const RestaurantDrinksPage = () => {
  const [filter, setFilter] = useState<FilterType>('all');

  const getFilteredItems = () => {
    switch(filter) {
        case 'alcoholic': return DRINK_ITEMS.filter(item => item.isAlcoholic);
        case 'non-alcoholic': return DRINK_ITEMS.filter(item => !item.isAlcoholic);
        case 'cold': return DRINK_ITEMS.filter(item => item.type === 'cold');
        case 'hot': return DRINK_ITEMS.filter(item => item.type === 'hot');
        default: return DRINK_ITEMS;
    }
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="restaurant-drinks-page p-4">
      <div className="container-fluid">
        
        {/* Header */}
        <div className="d-flex flex-column align-items-center mb-5 animate-fade-in-up">
            <h1 className="fw-bold mb-2 text-dark">Bar & Cafetería</h1>
            <p className="text-secondary">Gestión de Carta de Bebidas</p>
        </div>

        {/* Filters */}
        <div className="drink-filters animate-fade-in-up delay-1">
            {[
                { id: 'all', label: 'Todo', icon: 'bi-grid' },
                { id: 'alcoholic', label: 'Con Alcohol', icon: 'bi-cup-straw' },
                { id: 'non-alcoholic', label: 'Sin Alcohol', icon: 'bi-cup' },
                { id: 'cold', label: 'Frías', icon: 'bi-snow' },
                { id: 'hot', label: 'Calientes', icon: 'bi-fire' }
            ].map(f => (
                <div 
                    key={f.id}
                    className={`drink-filter-chip ${filter === f.id ? 'active' : ''}`}
                    onClick={() => setFilter(f.id as FilterType)}
                >
                    <i className={`bi ${f.icon}`}></i>
                    {f.label}
                </div>
            ))}
        </div>

        {/* Grid */}
        <div className="row g-4 animate-fade-in-up delay-2">
            {filteredItems.map(item => (
                <div key={item.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
                    <div className="drink-card">
                        <div className="drink-img-wrapper">
                            <img src={item.image} alt={item.name} className="drink-img" />
                            
                            <div className="drink-badges">
                                <span className="badge-pill">
                                    <i className={`bi ${item.type === 'cold' ? 'bi-snow icon-cold' : 'bi-fire icon-hot'}`}></i>
                                    {item.type === 'cold' ? 'Frío' : 'Caliente'}
                                </span>
                                <span className="badge-pill">
                                    <i className="bi bi-droplet-fill text-primary"></i>
                                    {item.volume}
                                </span>
                            </div>

                            <div className="price-float">
                                ${item.price.toFixed(2)}
                            </div>
                        </div>

                        <div className="drink-content">
                            <span className={`alcohol-indicator ${item.isAlcoholic ? 'text-danger' : 'text-success'}`}>
                                {item.isAlcoholic ? `CON ALCOHOL ${item.alcoholContent}` : 'LIBRE DE ALCOHOL'}
                            </span>
                            
                            <h5 className="drink-title">{item.name}</h5>
                            <span className="text-muted small">{item.category}</span>

                            <div className="drink-meta">
                                <button className="btn btn-sm btn-outline-primary w-100 rounded-pill">
                                    Editar
                                </button>
                                <button className="btn btn-sm btn-light rounded-circle border">
                                    <i className="bi bi-three-dots-vertical"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* FAB */}
        <button className="fab-drink shadow-lg" title="Agregar Nueva Bebida">
            <i className="bi bi-plus-lg"></i>
        </button>

      </div>
    </div>
  );
};

export default RestaurantDrinksPage;

