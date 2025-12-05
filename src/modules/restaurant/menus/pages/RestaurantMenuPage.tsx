import { useState } from 'react';
import '../../menus/styles/RestaurantMenuPage.css';

// Mock Data
const MENU_ITEMS = [
  {
    id: 1,
    name: "Hamburguesa Yummy Supreme",
    description: "Carne angus 200g, queso cheddar derretido, cebolla caramelizada y nuestra salsa especial.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop",
    category: "Platos Fuertes",
    status: "Activo"
  },
  {
    id: 2,
    name: "Pizza Napolitana Clásica",
    description: "Masa madre fermentada 48h, tomate San Marzano, mozzarella di bufala y albahaca fresca.",
    price: 15.50,
    image: "https://images.unsplash.com/photo-1574071318500-d0d580426632?q=80&w=600&auto=format&fit=crop",
    category: "Platos Fuertes",
    status: "Activo"
  },
  {
    id: 3,
    name: "Ensalada César con Pollo",
    description: "Lechuga romana crujiente, pechuga de pollo grillada, parmesano reggiano y croutones caseros.",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=600&auto=format&fit=crop",
    category: "Entradas",
    status: "Activo"
  },
  {
    id: 4,
    name: "Limonada de Frutos Rojos",
    description: "Refrescante mezcla de limón sutil, fresas, frambuesas y un toque de menta.",
    price: 4.50,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop",
    category: "Bebidas",
    status: "Activo"
  },
  {
    id: 5,
    name: "Tacos al Pastor",
    description: "3 piezas de tortillas de maíz hechas a mano, cerdo marinado estilo pastor y piña.",
    price: 8.00,
    image: "https://images.unsplash.com/photo-1599321955726-9080d944c20c?q=80&w=600&auto=format&fit=crop",
    category: "Platos Fuertes",
    status: "Agotado"
  },
  {
    id: 6,
    name: "Cheesecake de New York",
    description: "Cremoso pastel de queso estilo NY con una base de galleta y coulis de frutos del bosque.",
    price: 6.50,
    image: "https://images.unsplash.com/photo-1508737027454-e6454ef45afd?q=80&w=600&auto=format&fit=crop",
    category: "Postres",
    status: "Activo"
  }
];

const CATEGORIES = ["Todo", "Entradas", "Platos Fuertes", "Bebidas", "Postres"];

const RestaurantMenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("Todo");

  const filteredItems = activeCategory === "Todo" 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="restaurant-menu-page p-4">
      <div className="container-fluid">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-5 animate-fade-in-up">
          <div>
            <h1 className="fw-bold mb-2 text-dark">Gestionar Menú</h1>
            <p className="text-secondary mb-0">Administra tus platillos y categorías</p>
          </div>
          <button className="btn-yummy-add">
            <i className="bi bi-plus-lg"></i>
            Nuevo Platillo
          </button>
        </div>

        {/* Stats Section */}
        <div className="row mb-5 animate-fade-in-up delay-1">
          <div className="col-md-3 mb-3 mb-md-0">
            <div className="stat-card p-4 h-100 d-flex flex-column justify-content-between">
              <span className="stat-title mb-2">Total Items</span>
              <div className="d-flex align-items-end justify-content-between">
                <span className="stat-value">{MENU_ITEMS.length}</span>
                <i className="bi bi-grid-fill fs-3 text-secondary opacity-50"></i>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3 mb-md-0">
            <div className="stat-card p-4 h-100 d-flex flex-column justify-content-between">
              <span className="stat-title mb-2">Más Vendido</span>
              <div className="d-flex align-items-end justify-content-between">
                <span className="stat-value">Burgers</span>
                <i className="bi bi-graph-up-arrow fs-3 text-secondary opacity-50"></i>
              </div>
            </div>
          </div>
           {/* Placeholder for more stats */}
        </div>

        {/* Categories/Filters */}
        <div className="mb-4 animate-fade-in-up delay-2">
            <div className="category-pills">
                {CATEGORIES.map(cat => (
                    <button 
                        key={cat}
                        className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* Menu Grid */}
        <div className="row g-4 animate-fade-in-up delay-3">
          {filteredItems.map((item) => (
            <div key={item.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
              <div className="menu-card h-100 d-flex flex-column">
                <div className="menu-img-wrapper">
                  <img src={item.image} alt={item.name} className="menu-img" />
                  <span className="price-tag">${item.price.toFixed(2)}</span>
                </div>
                
                <div className="menu-body flex-grow-1 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <span className="badge bg-light text-secondary border">{item.category}</span>
                        <span className={`status-badge ${item.status === 'Agotado' ? 'bg-danger text-white' : ''}`}>
                            {item.status}
                        </span>
                    </div>
                  
                  <h5 className="menu-title">{item.name}</h5>
                  <p className="menu-desc small flex-grow-1">{item.description}</p>
                  
                  <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                    <button className="btn btn-sm btn-outline-secondary rounded-pill px-3">
                        <i className="bi bi-pencil me-2"></i>Editar
                    </button>
                    <div className="d-flex gap-2">
                         <button className="btn-icon-circle border-0" title="Ver Detalles">
                            <i className="bi bi-eye"></i>
                         </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default RestaurantMenuPage;

