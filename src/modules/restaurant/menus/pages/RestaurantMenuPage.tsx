import { useState, useMemo, useEffect } from 'react';
import '../../menus/styles/RestaurantMenuPage.css';
import { MenuItemModal } from '../components/MenuItemModal';
import { CategoryManagerModal } from '../components/CategoryManagerModal';
import { ExtrasLibrary, type ModifierItem, type ModifierGroup } from '../components/ExtrasLibrary';
import type { MenuItem } from '../components/MenuItemModal';
import type { Category } from '../components/CategoryManagerModal';
import { MenuService } from '../../../../core/application/services/Restaurant/MenuService';
import { MenuAdapter } from '../../../../core/infrastructure/adapters/restaurant/MenuAdapter';

const RestaurantMenuPage = () => {

  const [activeSection, setActiveSection] = useState<'menu' | 'library'>('menu');
  const [items, setItems] = useState<MenuItem[]>([]);
  const [managedCategories, setManagedCategories] = useState<Category[]>([]);
  const [modifierItems, setModifierItems] = useState<ModifierItem[]>([]);
  const [modifierGroups, setModifierGroups] = useState<ModifierGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeCategory, setActiveCategory] = useState("Todo");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<MenuItem | undefined>(undefined);

  const menuService = useMemo(() => new MenuService(new MenuAdapter()), []);
  const RESTAURANT_ID = 1;

  useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await menuService.getInitialData(RESTAURANT_ID);       
            if (response.success && response.data) {
                const data = response.data;
                const mappedCategories: Category[] = data.categories.map(c => ({
                    id: c.id.toString(),
                    name: c.name,
                    isActive: true,
                    productCount: 0
                }));

                const mappedItems: MenuItem[] = data.foodItems.map(f => ({
                    id: f.dishId,
                    name: f.dishName,
                    description: f.description,
                    price: f.price,
                    image: f.imageUrl || '',
                    category: f.categoryName,
                    status: f.isActive ? 'Activo' : 'Agotado',
                    extras: [], 
                    preparationTime: 15,
                    isStockManaged: false,
                    stock: 0,
                    isVisible: true,
                    isRecommended: false,
                    isPopular: false,
                    availableDays: []
                }));

                const mappedModifierItems: ModifierItem[] = data.components.map(c => ({
                    id: c.id.toString(), 
                    name: c.name
                }));

                const mappedModifierGroups: ModifierGroup[] = data.modifierGroupsTemplates.map(g => ({
                    id: g.groupId.toString(),
                    name: g.groupName,
                    minSelection: 0,
                    maxSelection: 1,
                    options: g.options.map(o => ({
                        id: o.optionId.toString(),
                        itemId: o.itemId.toString(),
                        price: o.price
                    }))
                }));

                setManagedCategories(mappedCategories);
                setItems(mappedItems);
                setModifierItems(mappedModifierItems);
                setModifierGroups(mappedModifierGroups);
            } else {
                setError(response.message || "Error al cargar datos del menú");
            }
        } catch (err) {
            console.error(err);
            setError("Error de conexión al cargar el menú");
        } finally {
            setLoading(false);
        }
    };

    fetchData();
  }, [menuService]);

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
      // TODO: Implement Backend Save
      if (itemToEdit) {
          setItems(prev => prev.map(i => i.id === itemToEdit.id ? { ...item, id: itemToEdit.id } : i));
      } else {
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
          
          <div className="bg-white p-1 rounded-pill shadow-sm d-flex gap-1 border">
              <button 
                className={`btn rounded-pill px-4 fw-bold ${activeSection === 'menu' ? 'btn-dark' : 'btn-light text-secondary'}`}
                onClick={() => setActiveSection('menu')}
              >
                  <i className="bi bi-grid-fill me-2"></i>Platillos
              </button>
              <button 
                className={`btn rounded-pill px-4 fw-bold ${activeSection === 'library' ? 'btn-dark' : 'btn-light text-secondary'}`}
                onClick={() => setActiveSection('library')}
              >
                  <i className="bi bi-collection-fill me-2"></i>Bibliotecas
              </button>
          </div>

          <button className="btn-yummy-add" onClick={handleCreate} disabled={activeSection === 'library'}>
            <i className="bi bi-plus-lg"></i>
            Nuevo Platillo
          </button>
        </div>

        {activeSection === 'library' ? (
             <ExtrasLibrary 
                items={modifierItems} 
                setItems={setModifierItems}
                groups={modifierGroups}
                setGroups={setModifierGroups}
             />
        ) : (
            <>
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
                        {managedCategories.map(cat => (
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
            </>
        )}

      </div>

      <MenuItemModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave}
        initialItem={itemToEdit}
        availableCategories={managedCategories.map(c => c.name)}
        existingItems={items}
        // Pass library data so Modal can use it
        availableGroups={modifierGroups}
        availableModifierItems={modifierItems}
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

