import { useState, useMemo, useEffect } from 'react';
import '../../menus/styles/RestaurantMenuPage.css';
import { MenuItemModal } from '../components/MenuItemModal';
import { CategoryManagerModal } from '../components/CategoryManagerModal';
import { ExtrasLibrary} from '../components/ExtrasLibrary';
import { useMenu } from '../hooks/useMenu';
import type { GenericItemName } from '../../../../shared/types/common';
import type { FoodItemDto } from '../../../../core/application/dtos/restaurant/FoodItem.dto';
import type { ModifierGroupsTemplateDto } from '../../../../core/application/dtos/restaurant/ModifierGroupsTemplate.dto';
import { LoadingSpinner } from '../../../../shared/ui/LoadingSpinner/LoadingSpinner';



const RestaurantMenuPage = () => {
  const [activeSection, setActiveSection] = useState<'menu' | 'library'>('menu');
  const [items, setItems] = useState<FoodItemDto[]>([]);
  const [categories, setCategories] = useState<GenericItemName[]>([]);
  const [modifierItems, setModifierItems] = useState<GenericItemName[]>([]);
  const [inactiveModifierItems, setInactiveModifierItems] = useState<GenericItemName[]>([]);
  const [modifierGroups, setModifierGroups] = useState<ModifierGroupsTemplateDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("Todo");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<FoodItemDto | undefined>(undefined);
  const { getInitialData, registerDish, updateDish } = useMenu();
  const RESTAURANT_ID = 1;

  const fetchData = async () => {
    setLoading(true);
    try {
        const response = await getInitialData(RESTAURANT_ID); 
        if (response && response.success && response.data) {
            setCategories(response.data.categories);
            setItems(response.data.foodItems);
            setModifierItems(response.data.activeComponents);
            setInactiveModifierItems(response.data.inactiveComponents);
            setModifierGroups(response.data.modifierGroupsTemplates); 
        } else {
            setError("No se pudieron cargar los datos del menú.");
        }
    } catch (err) {
        setError("Ocurrió un error al cargar el menú. Por favor intente nuevamente.");
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ... (keeping existing useMemo and handle functions) ...

  const categoriesWithCounts = useMemo(() => {
      return categories.map(cat => ({
          ...cat,
          productCount: items.filter(i => i.categoryName === cat.name).length
      }));
  }, [items, categories]);

  const filteredItems = activeCategory === "Todo" 
    ? items 
    : items.filter(item => item.categoryName === activeCategory);

  const handleCreate = () => {
      setItemToEdit(undefined);
      setIsModalOpen(true);
  };

  const handleEdit = (item: FoodItemDto) => {
      setItemToEdit(item);
      setIsModalOpen(true);
  };

  const handleSave = async (item: FoodItemDto, imageFile?: File) => {
      setLoading(true);
      try {
        let response;
        
        if (item.dishId && item.dishId !== 0) {
            // EDITAR
            const updateDto: import('../../../../core/application/dtos/restaurant/UpdateDish.dto').UpdateDishDto = {
                dishId: item.dishId,
                name: item.dishName,
                categoryId: item.categoryId || (categories.find(c => c.name === item.categoryName)?.id || 0),
                description: item.description,
                price: item.price,
                preparationTime: item.preparationTime,
                isActive: item.isActive,
                stock: item.isStockManaged ? item.stock : 0, 
                extraIds: item.extras ? item.extras.map(e => e.id) : [],
                image: imageFile ?? null
            };

            response = await updateDish(updateDto);
        } else {
            // CREAR
            const registerDto: import('../../../../core/application/dtos/restaurant/RegisterDish.dto').RegisterDishDto = {
                restaurantId: RESTAURANT_ID,
                name: item.dishName,
                categoryId: item.categoryId || (categories.find(c => c.name === item.categoryName)?.id || 0), // Try to find ID from name if missing
                description: item.description,
                price: item.price,
                preparationTime: item.preparationTime,
                isActive: item.isActive,
                stock: item.isStockManaged ? item.stock : null,
                extraIds: item.extras ? item.extras.map(e => e.id) : [],
                image: imageFile || null
            };
            response = await registerDish(registerDto);
        }
        
        if (response.success) {
             const refreshResponse = await getInitialData(RESTAURANT_ID);
             if (refreshResponse.success && refreshResponse.data) {
                 setItems(refreshResponse.data.foodItems);
                 setCategories(refreshResponse.data.categories);
                 setModifierItems(refreshResponse.data.activeComponents);
                 setInactiveModifierItems(refreshResponse.data.inactiveComponents);
                 setModifierGroups(refreshResponse.data.modifierGroupsTemplates);
             }
             setIsModalOpen(false);
             setItemToEdit(undefined);
        } else {
            alert("Error al guardar: " + (response.message || "Error desconocido"));
        }

      } catch (err) {
          alert("Ocurrió un error al guardar el platillo.");
      } finally {
          setLoading(false);
      }
  };


  if (loading) {
      return <LoadingSpinner fullHeight message="Cargando menú..." />;
  }

  if (error) {
      return (
          <div className="d-flex justify-content-center align-items-center vh-100">
              <div className="alert alert-danger text-center shadow p-5" role="alert">
                  <h4 className="alert-heading mb-3"><i className="bi bi-exclamation-triangle-fill me-2"></i>Error</h4>
                  <p className="mb-0">{error}</p>
                  <button className="btn btn-outline-danger mt-3" onClick={() => window.location.reload()}>
                      Reintentar
                  </button>
              </div>
          </div>
      );
  }

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

          {activeSection === 'menu' && (
              <button className="btn-yummy-add" onClick={handleCreate}>
                <i className="bi bi-plus-lg"></i>
                Nuevo Platillo
              </button>
          )}
        </div>

        {activeSection === 'library' ? (
             <ExtrasLibrary 
                items={modifierItems} 
                setItems={setModifierItems}
                inactiveItems={inactiveModifierItems}
                setInactiveItems={setInactiveModifierItems}
                groups={modifierGroups}
                setGroups={setModifierGroups}
                onRefresh={fetchData}
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
                        {categories.map(cat => (
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
                    <div key={item.dishId} className="col-12 col-md-6 col-lg-4 col-xl-3">
                      <div className="menu-card h-100 d-flex flex-column">
                        <div className="menu-img-wrapper">
                          <img src={item.imageUrl??""} alt={item.dishName} className="menu-img" />
                          <span className="price-tag">${item.price.toFixed(2)}</span>
                        </div>
                        
                        <div className="menu-body flex-grow-1 d-flex flex-column">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                                <span className="badge bg-light text-secondary border">{item.categoryName}</span>
                                <span className={`status-badge ${item.isActive === false ? 'bg-danger text-white' : ''}`}>
                                    {item.isActive ? 'Activo' : 'Inactivo'}
                                </span>
                            </div>
                          
                          <h5 className="menu-title">{item.dishName}</h5>
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
        availableCategories={categories}
        existingItems={items}
        availableGroups={modifierGroups}
        availableModifierItems={modifierItems}
      />

      <CategoryManagerModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        categories={categoriesWithCounts}
        onUpdateCategories={setCategories}
      />
    </div>
  );
};

export default RestaurantMenuPage;


