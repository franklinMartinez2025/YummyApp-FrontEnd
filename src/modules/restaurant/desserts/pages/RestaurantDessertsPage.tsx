import { useState } from 'react';
import '../../desserts/styles/RestaurantDessertsPage.css';

// Mock Data
const DESSERT_ITEMS = [
  {
    id: 1,
    name: "Macarons de Frambuesa",
    category: "Pastelería",
    price: 3.50,
    sweetness: 4, // 1-5 scale
    isGlutenFree: true,
    isVegan: false,
    isSugarFree: false,
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Brownie Vegano",
    category: "Horneados",
    price: 4.20,
    sweetness: 5,
    isGlutenFree: false,
    isVegan: true,
    isSugarFree: false,
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Helado de Vainilla Keto",
    category: "Helados",
    price: 5.50,
    sweetness: 3,
    isGlutenFree: true,
    isVegan: false,
    isSugarFree: true,
    image: "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Tarta de Limón",
    category: "Pastelería",
    price: 6.00,
    sweetness: 3,
    isGlutenFree: false,
    isVegan: false,
    isSugarFree: false,
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Donas Glaseadas",
    category: "Horneados",
    price: 2.50,
    sweetness: 5,
    isGlutenFree: false,
    isVegan: false,
    isSugarFree: false,
    image: "https://images.unsplash.com/photo-1551024601-564d6d6744f1?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Mousse de Chia y Mango",
    category: "Saludable",
    price: 5.80,
    sweetness: 2,
    isGlutenFree: true,
    isVegan: true,
    isSugarFree: true,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&auto=format&fit=crop"
  }
];

type FilterType = 'all' | 'pastry' | 'icecream' | 'healthy';

const RestaurantDessertsPage = () => {
  const [filter, setFilter] = useState<FilterType>('all');

  const getFilteredItems = () => {
    switch(filter) {
        case 'pastry': return DESSERT_ITEMS.filter(item => item.category === 'Pastelería' || item.category === 'Horneados');
        case 'icecream': return DESSERT_ITEMS.filter(item => item.category === 'Helados');
        case 'healthy': return DESSERT_ITEMS.filter(item => item.isSugarFree || item.isVegan);
        default: return DESSERT_ITEMS;
    }
  };

  const filteredItems = getFilteredItems();

  const renderSweetness = (level: number) => {
    return [...Array(5)].map((_, i) => (
        <span key={i} className={`dot ${i < level ? 'filled' : ''}`}></span>
    ));
  };

  return (
    <div className="restaurant-desserts-page p-4">
      <div className="container-fluid">
        
        {/* Header */}
        <div className="text-center mb-5 animate-pop-in">
            <h1 className="fw-bold mb-2" style={{ color: '#634236' }}>Dulces Tentaciones</h1>
            <p className="text-secondary">Galería de Postres</p>
        </div>

        {/* Filter Bubbles */}
        <div className="dessert-filters animate-pop-in delay-1">
            <div className={`dessert-filter-bubble ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
                <i className="bi bi-grid-fill"></i>
                <span>Todos</span>
            </div>
            <div className={`dessert-filter-bubble ${filter === 'pastry' ? 'active' : ''}`} onClick={() => setFilter('pastry')}>
                <i className="bi bi-cake2-fill"></i>
                <span>Pastelería</span>
            </div>
            <div className={`dessert-filter-bubble ${filter === 'icecream' ? 'active' : ''}`} onClick={() => setFilter('icecream')}>
                <i className="bi bi-snow2"></i>
                <span>Helados</span>
            </div>
            <div className={`dessert-filter-bubble ${filter === 'healthy' ? 'active' : ''}`} onClick={() => setFilter('healthy')}>
                <i className="bi bi-heart-fill"></i>
                <span>Healthy</span>
            </div>
        </div>

        {/* Grid */}
        <div className="row g-4 animate-pop-in delay-2">
            {filteredItems.map(item => (
                <div key={item.id} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-5">
                    <div className="dessert-card h-100 d-flex flex-column">
                        <img src={item.image} alt={item.name} className="dessert-img-float" />
                        
                        <div className="dessert-content flex-grow-1 d-flex flex-column">
                            <h5 className="dessert-title">{item.name}</h5>
                            <span className="text-muted small mb-2">{item.category}</span>
                            
                            <div className="sweetness-meter" title={`Dulzor: ${item.sweetness}/5`}>
                                {renderSweetness(item.sweetness)}
                            </div>

                            <div className="dietary-badges mt-2">
                                {item.isGlutenFree && <span className="badge-diet gluten-free">Sin Gluten</span>}
                                {item.isVegan && <span className="badge-diet vegan">Vegano</span>}
                                {item.isSugarFree && <span className="badge-diet sugar-free">Sugar Free</span>}
                                {!item.isGlutenFree && !item.isVegan && !item.isSugarFree && <span className="badge-diet opacity-50">Clásico</span>}
                            </div>

                            <div className="dessert-price-row mt-auto">
                                <span className="dessert-price">${item.price.toFixed(2)}</span>
                                <button className="btn-add-mini">
                                    <i className="bi bi-pencil-fill small"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* FAB */}
        <button className="fab-dessert" title="Nuevo Postre">
            <i className="bi bi-plus-lg"></i>
        </button>

      </div>
    </div>
  );
};

export default RestaurantDessertsPage;

