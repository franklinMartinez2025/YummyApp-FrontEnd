import { useState, useMemo } from 'react';
import '../../menus/styles/RestaurantMenuPage.css';
import { MenuItemModal } from '../components/MenuItemModal';
import { CategoryManagerModal } from '../components/CategoryManagerModal';
import type { MenuItem } from '../components/MenuItemModal';
import type { Category } from '../components/CategoryManagerModal';

// Mock Data
const INITIAL_MENU_ITEMS: MenuItem[] = [
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

const INITIAL_CATEGORIES: Category[] = [
    { id: '1', name: 'Entradas', isActive: true, productCount: 1 },
    { id: '2', name: 'Platos Fuertes', isActive: true, productCount: 3 },
    { id: '3', name: 'Bebidas', isActive: true, productCount: 1 },
    { id: '4', name: 'Postres', isActive: true, productCount: 1 },
];

const RestaurantMenuPage = () => {
  const [items, setItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [managedCategories, setManagedCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [activeCategory, setActiveCategory] = useState("Todo");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false); // NEW STATE
  const [itemToEdit, setItemToEdit] = useState<MenuItem | undefined>(undefined);

  // Calculate product counts dynamically for validation
  const categoriesWithCounts = useMemo(() => {
      return managedCategories.map(cat => ({
          ...cat,
          productCount: items.filter(i => i.category === cat.name).length
      }));
  }, [items, managedCategories]);

  const filteredItems = activeCategory === "Todo" 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const handleCreate = () => {
      setItemToEdit(undefined);
      setIsModalOpen(true);
  };

  const handleEdit = (item: MenuItem) => {
      setItemToEdit(item);
      setIsModalOpen(true);
  };

  const handleSave = (item: MenuItem) => {
      if (itemToEdit) {
          // Update
          setItems(prev => prev.map(i => i.id === itemToEdit.id ? { ...item, id: itemToEdit.id } : i));
      } else {
          // Create
          setItems(prev => [...prev, { ...item, id: Date.now() }]);
      }
      setIsModalOpen(false);
  };

  return (
    <div className="restaurant-menu-page p-4">
      <div className="container-fluid">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-5 animate-fade-in-up">
          <div>
            <h1 className="fw-bold mb-2 text-dark">Gestionar Menú</h1>
            <p className="text-secondary mb-0">Administra tus platillos y categorías</p>
          </div>
          <button className="btn-yummy-add" onClick={handleCreate}>
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
                <span className="stat-value">{items.length}</span>
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
        </div>

        {/* Categories/Filters */}
        <div className="mb-4 animate-fade-in-up delay-2 d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div className="category-pills">
                <button 
                    className={`category-pill ${activeCategory === "Todo" ? 'active' : ''}`}
                    onClick={() => setActiveCategory("Todo")}
                >
                    Todo
                </button>
                {managedCategories.filter(c => c.isActive).map(cat => (
                    <button 
                        key={cat.id}
                        className={`category-pill ${activeCategory === cat.name ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat.name)}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
            <button className="btn btn-outline-secondary rounded-pill btn-sm fw-bold border-2" onClick={() => setIsCategoryModalOpen(true)}>
                <i className="bi bi-folder-check me-2"></i>Editar Categorías
            </button>
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
                  
                  {item.extras && item.extras.length > 0 && (
                      <div className="mt-2 mb-2">
                          <small className="text-muted"><i className="bi bi-list-check me-1"></i>{item.extras.length} grupos de extras</small>
                      </div>
                  )}

                  <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                    <button className="btn btn-sm btn-outline-secondary rounded-pill px-3" onClick={() => handleEdit(item)}>
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

      <MenuItemModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave}
        initialItem={itemToEdit}
        availableCategories={managedCategories.filter(c => c.isActive).map(c => c.name)}
        existingItems={items}
      />

      <CategoryManagerModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        categories={categoriesWithCounts}
        onUpdateCategories={setManagedCategories}
      />
    </div>
  );
};

export default RestaurantMenuPage;

