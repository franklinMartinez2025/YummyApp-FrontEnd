import { useState, useEffect } from 'react';
import '../styles/MenuItemModal.css';
import { ProductSelectorModal } from './ProductSelectorModal';
import { AlertDialog, type AlertType } from '../../../shared/components/AlertDialog';

// Types
export interface ExtraOption {
  id: string;
  name: string;
  price: number;
  linkedProductId?: string | number; // RF-REST-020: Link to existing product
}

export interface ExtraGroup {
  id: string;
  name: string;
  minSelection: number;
  maxSelection: number;
  options: ExtraOption[];
}

export interface MenuItem {
  id?: number | string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  status: 'Activo' | 'Agotado';
  extras?: ExtraGroup[];
  // RF-REST-010, 013, 015, 022
  preparationTime?: number; 
  isStockManaged?: boolean;
  stock?: number;
  isRecommended?: boolean;
  isPopular?: boolean;
  availableDays?: string[]; // e.g., ["Mon", "Sat"]
  isVisible?: boolean; // Controls public visibility
}

interface MenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: MenuItem) => void;
  initialItem?: MenuItem;
  availableCategories?: string[];
  existingItems?: MenuItem[]; // RF-REST-014 (Validation) & RF-REST-020 (Combos)
}

const DEFAULT_CATEGORIES = ["Entradas", "Platos Fuertes", "Bebidas", "Postres"];
const DAYS_OF_WEEK = [
    { key: 'Mon', label: 'L' }, { key: 'Tue', label: 'M' }, { key: 'Wed', label: 'X' },
    { key: 'Thu', label: 'J' }, { key: 'Fri', label: 'V' }, { key: 'Sat', label: 'S' }, { key: 'Sun', label: 'D' }
];

export const MenuItemModal = ({ isOpen, onClose, onSave, initialItem, availableCategories = DEFAULT_CATEGORIES, existingItems = [] }: MenuItemModalProps) => {
    const [formData, setFormData] = useState<MenuItem>({
        name: '', description: '', price: 0, image: '', category: availableCategories[0] || '', status: 'Activo', 
        extras: [{ id: 'default', name: 'Contenido del Combo', minSelection: 0, maxSelection: 99, options: [] }],
        preparationTime: 15, isStockManaged: false, stock: 0, isRecommended: false, isPopular: false, 
        availableDays: DAYS_OF_WEEK.map(d => d.key),
        isVisible: true
    });

    const [categories, setCategories] = useState(availableCategories);
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [activeTab, setActiveTab] = useState<'info' | 'extras'>('info');
    const [isVisible, setIsVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isProductSelectorOpen, setIsProductSelectorOpen] = useState(false);

    // Alert State
    const [alertConfig, setAlertConfig] = useState<{isOpen: boolean, title: string, message: string, type: AlertType}>({
        isOpen: false, title: '', message: '', type: 'info'
    });

    // Handle animations
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setCategories(availableCategories);
            setError(null); // Reset error
        } else {
            const timer = setTimeout(() => setIsVisible(false), 400);
            return () => clearTimeout(timer);
        }
    }, [isOpen, availableCategories]);

// ... (existing UseEffect and handleChange)

    // Extras Logic (Same logic, nicely wrapped)
// ... (existing logic)

    const handleAddProducts = (selectedProducts: MenuItem[]) => {
        const newExtras = [...(formData.extras || [])];
        if (newExtras.length === 0) {
             newExtras.push({ id: 'default', name: 'Contenido del Combo', minSelection: 0, maxSelection: 99, options: [] });
        }
        const currentGroup = newExtras[0];

        selectedProducts.forEach(prod => {
            // Avoid duplicates in the same group
            if (!currentGroup.options.some(opt => opt.linkedProductId === prod.id)) {
                currentGroup.options.push({
                    id: Date.now().toString() + Math.random().toString(), // Unique ID
                    name: prod.name,
                    price: 0, // RF-REST REQUEST: Final price is unified, so extra price is 0
                    linkedProductId: prod.id
                });
            }
        });

        setFormData(prev => ({ ...prev, extras: newExtras }));
    };

    const openProductSelector = () => {
        setIsProductSelectorOpen(true);
    };

    useEffect(() => {
        if (initialItem) {
            setFormData(initialItem);
        } else {
            setFormData({
                name: '', description: '', price: 0, image: '', category: categories[0] || '', status: 'Activo', 
                extras: [{ id: 'default', name: 'Contenido del Combo', minSelection: 0, maxSelection: 99, options: [] }],
                preparationTime: 15, isStockManaged: false, stock: 0, isRecommended: false, isPopular: false, 
                availableDays: DAYS_OF_WEEK.map(d => d.key),
                isVisible: true
            });
        }
        setActiveTab('info');
    }, [initialItem, isOpen]);

    // Don't unmount immediately to allow exit animation
    if (!isOpen && !isVisible) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
             const checked = (e.target as HTMLInputElement).checked;
             setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: (name === 'price' || name === 'preparationTime' || name === 'stock') ? parseFloat(value) : value
            }));
        }
        if (name === 'name') setError(null);
    };

    const toggleDay = (dayKey: string) => {
        setFormData(prev => {
            const current = prev.availableDays || [];
            return {
                ...prev,
                availableDays: current.includes(dayKey) 
                    ? current.filter(d => d !== dayKey) 
                    : [...current, dayKey]
            };
        });
    };

    // Extras Logic (Same logic, nicely wrapped)


    const addOptionToGroup = () => {
        const newExtras = [...(formData.extras || [])];
        if (newExtras.length === 0) {
             newExtras.push({ id: 'default', name: 'Contenido del Combo', minSelection: 0, maxSelection: 99, options: [] });
        }
        newExtras[0].options.push({
            id: Date.now().toString(),
            name: 'Opción Nueva',
            price: 0
        });
        setFormData(prev => ({ ...prev, extras: newExtras }));
    };

    const updateOption = (groupIndex: number, optionIndex: number, field: keyof ExtraOption, value: any) => {
        const newExtras = [...(formData.extras || [])];
        newExtras[groupIndex].options[optionIndex] = {
            ...newExtras[groupIndex].options[optionIndex],
            [field]: field === 'price' ? parseFloat(value) : value
        };
        setFormData(prev => ({ ...prev, extras: newExtras }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // RF-REST-014: Validation
        const normalizedName = formData.name.trim().toLowerCase();
        const isDuplicate = existingItems.some(existing => 
            existing.name.toLowerCase() === normalizedName && 
            (!initialItem || initialItem.id !== existing.id)
        );

        if (isDuplicate) {
            setError("⚠️ El nombre ya existe. Elige otro. (RF-REST-014)");
            return;
        }

        // RF-REST REQUEST: Validate Price > 0
        if (formData.price <= 0) {
            setAlertConfig({
                isOpen: true,
                title: 'Precio Requerido',
                message: 'No puedes guardar un platillo sin precio o con precio 0. Por favor asigna un valor válido.',
                type: 'warning'
            });
            return;
        }

        onSave(formData);
    };

    const closeAlert = () => setAlertConfig(prev => ({ ...prev, isOpen: false }));

    return (
        <div className={`modal-overlay-custom ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className="modal-content-custom" onClick={e => e.stopPropagation()}>
                
                {/* Header */}
                <div className="modal-header-custom">
                    <h5 className="modal-title-custom">
                        {initialItem ? '✨ Editar Platillo' : '🚀 Nuevo Platillo'}
                    </h5>
                    <button type="button" className="btn-close-custom" onClick={onClose}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="d-flex flex-column" style={{flex: 1, overflow: 'hidden'}}>
                    
                    {/* Body */}
                    <div className="modal-body-custom">
                        {error && <div className="alert alert-warning py-2 mb-3 shake-animation"><i className="bi bi-exclamation-triangle-fill me-2"></i>{error}</div>}
                        
                        <div className="tabs-custom">
                            <button
                                type="button"
                                className={`tab-btn-custom ${activeTab === 'info' ? 'active' : ''}`}
                                onClick={() => setActiveTab('info')}
                            >
                                <i className="bi bi-info-circle me-2"></i>Información
                            </button>
                            <button
                                type="button"
                                className={`tab-btn-custom ${activeTab === 'extras' ? 'active' : ''}`}
                                onClick={() => setActiveTab('extras')}
                            >
                                <i className="bi bi-layers me-2"></i>Extras & Modificadores
                            </button>
                        </div>

                        {activeTab === 'info' ? (
                            <div className="row g-3">
                                { /* Name & Category */ }
                                <div className="col-md-6">
                                    <div className="input-group-custom">
                                        <label className="form-label-custom">Nombre</label>
                                        <input type="text" className="form-control-custom" name="name" value={formData.name} onChange={handleChange} required placeholder="Ej. Lomo Saltado" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group-custom">
                                        <label className="form-label-custom">Categoría</label>
                                        <div className="d-flex gap-2">
                                            {isAddingCategory ? (
                                                <input type="text" className="form-control-custom animate-fade-in" name="category" value={formData.category} onChange={handleChange} placeholder="Nueva..." autoFocus />
                                            ) : (
                                                <select className="form-control-custom" name="category" value={formData.category} onChange={handleChange}>
                                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                                </select>
                                            )}
                                            <button type="button" className={`btn ${isAddingCategory ? 'btn-danger' : 'btn-outline-primary'} rounded-3 px-3`} onClick={() => setIsAddingCategory(!isAddingCategory)}>
                                                <i className={`bi ${isAddingCategory ? 'bi-x-lg' : 'bi-plus-lg'}`}></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                { /* Description */ }
                                <div className="col-12">
                                    <div className="input-group-custom">
                                        <label className="form-label-custom">Descripción</label>
                                        <textarea className="form-control-custom" name="description" rows={2} value={formData.description} onChange={handleChange} required placeholder="Descripción apetitosa..."></textarea>
                                    </div>
                                </div>

                                { /* Price & Time & Status */ }
                                <div className="col-md-4">
                                    <div className="input-group-custom">
                                        <label className="form-label-custom">Precio ($)</label>
                                        <input type="number" step="0.01" className="form-control-custom" name="price" value={formData.price} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                     <div className="input-group-custom">
                                        <label className="form-label-custom">Tiempo (min)</label>
                                        <input type="number" className="form-control-custom" name="preparationTime" value={formData.preparationTime} onChange={handleChange} required placeholder="15" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="input-group-custom">
                                        <label className="form-label-custom">Estado</label>
                                        <select className="form-control-custom" name="status" value={formData.status} onChange={handleChange}>
                                            <option value="Activo">🟢 Activo</option>
                                            <option value="Agotado">🔴 Agotado</option>
                                        </select>
                                    </div>
                                </div>

                                { /* Availability (RF-REST-022) */ }
                                <div className="col-12">
                                    <label className="form-label-custom mb-1">Disponibilidad Semanal</label>
                                    <div className="d-flex gap-2">
                                        {DAYS_OF_WEEK.map(day => (
                                            <button 
                                                key={day.key} 
                                                type="button"
                                                className={`btn btn-sm rounded-circle ${formData.availableDays?.includes(day.key) ? 'btn-primary' : 'btn-outline-secondary'}`}
                                                style={{width: '32px', height: '32px', padding: 0}}
                                                onClick={() => toggleDay(day.key)}
                                            >
                                                {day.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                { /* Stock & Tags (RF-REST-013, 015) */ }
                                <div className="col-12 d-flex flex-wrap gap-4 align-items-center bg-light p-3 rounded-3 border">
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" id="stockSwitch" name="isStockManaged" checked={formData.isStockManaged} onChange={handleChange} />
                                        <label className="form-check-label fw-bold small" htmlFor="stockSwitch">Gestionar Stock</label>
                                    </div>
                                    {formData.isStockManaged && (
                                        <div className="animate-fade-in" style={{width: '120px'}}>
                                            <input type="number" className="form-control form-control-sm border-secondary" name="stock" value={formData.stock} onChange={handleChange} placeholder="Cant." />
                                        </div>
                                    )}
                                    <div className="vr mx-2"></div>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" id="recSwitch" name="isRecommended" checked={formData.isRecommended} onChange={handleChange} />
                                        <label className="form-check-label badge bg-warning text-dark cursor-pointer" htmlFor="recSwitch">⭐ Recomendado</label>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" id="popSwitch" name="isPopular" checked={formData.isPopular} onChange={handleChange} />
                                        <label className="form-check-label badge bg-danger cursor-pointer" htmlFor="popSwitch">🔥 Popular</label>
                                    </div>
                                    <div className="vr mx-2"></div>
                                    <div className="form-check form-switch" title="Si se desactiva, el producto no aparecerá en el menú público (ideal para items base de combos)">
                                        <input className="form-check-input" type="checkbox" id="visibleSwitch" name="isVisible" checked={formData.isVisible !== false} onChange={handleChange} />
                                        <label className="form-check-label fw-bold text-success cursor-pointer" htmlFor="visibleSwitch">
                                            {formData.isVisible !== false ? <><i className="bi bi-eye-fill me-1"></i>Visible al Público</> : <><i className="bi bi-eye-slash-fill me-1 text-muted"></i>Oculto al Público</>}
                                        </label>
                                    </div>
                                </div>

                                { /* Image */ }
                                <div className="col-12">
                                    <div className="input-group-custom">
                                        <label className="form-label-custom">URL Imagen</label>
                                        <input type="url" className="form-control-custom" name="image" value={formData.image} onChange={handleChange} required placeholder="https://..." />
                                    </div>
                                    {formData.image && (
                                        <div className="mt-2 rounded-3 overflow-hidden shadow-sm" style={{height: '100px', width: 'fit-content'}}>
                                            <img src={formData.image} alt="Preview" style={{height: '100%', objectFit: 'cover'}} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="extras-management animate-fade-in-up">
                                <div className="extra-card">
                                    <div className="table-responsive">
                                        <table className="table table-borderless align-middle mb-0">
                                            <thead className="text-muted small text-uppercase"><tr><th>Item</th><th style={{width: '120px'}} className="text-end">Extra ($)</th><th style={{width: '50px'}}></th></tr></thead>
                                            <tbody>
                                                {formData.extras?.[0]?.options.map((opt, oIndex) => (
                                                    <tr key={opt.id} className={opt.linkedProductId ? "bg-light" : ""}>
                                                        <td>
                                                            {opt.linkedProductId ? (
                                                                <div className="d-flex align-items-center gap-2 py-1">
                                                                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill" title="Producto Vinculado">
                                                                        <i className="bi bi-box-seam-fill me-1"></i>Combo Item
                                                                    </span>
                                                                    <span className="fw-bold text-dark">{opt.name}</span>
                                                                </div>
                                                            ) : (
                                                                <input type="text" className="form-control form-control-sm border-0 bg-transparent border-bottom rounded-0" value={opt.name} onChange={(e) => updateOption(0, oIndex, 'name', e.target.value)} placeholder="Nombre Opción" />
                                                            )}
                                                        </td>
                                                        <td className="text-end">
                                                            {opt.linkedProductId ? (
                                                                <span className="text-muted small">Incluido</span>
                                                            ) : (
                                                                <input type="number" className="form-control form-control-sm border-0 bg-transparent border-bottom rounded-0 text-end" value={opt.price} onChange={(e) => updateOption(0, oIndex, 'price', e.target.value)} />
                                                            )}
                                                        </td>
                                                        <td>
                                                            <button type="button" className="btn btn-link text-danger p-0" title="Eliminar" onClick={() => {
                                                                const newExtras = [...(formData.extras || [])];
                                                                if (newExtras[0]) {
                                                                    newExtras[0].options.splice(oIndex, 1);
                                                                    setFormData(prev => ({ ...prev, extras: newExtras }));
                                                                }
                                                            }}><i className="bi bi-trash"></i></button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {(!formData.extras?.[0]?.options.length) && (
                                                    <tr><td colSpan={3} className="text-center text-muted py-4 small">Añade items al combo usando los botones de abajo.</td></tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    
                                    <div className="d-flex gap-2 mt-2">
                                        <button type="button" className="btn btn-sm btn-light text-secondary flex-grow-1 rounded-3 fw-bold py-2" onClick={addOptionToGroup}>
                                            <i className="bi bi-plus me-1"></i>Opción Simple
                                        </button>
                                        
                                        <button 
                                            type="button" 
                                            className="btn btn-sm btn-primary-soft text-primary flex-grow-1 rounded-3 fw-bold py-2 border border-primary-subtle" 
                                            onClick={openProductSelector}
                                        >
                                            <i className="bi bi-search me-1"></i>Seleccionar Platillos (+)
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="modal-footer-custom">
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            <i className="bi bi-x-lg"></i>
                            Cancelar
                        </button>
                        <button type="submit" className="btn-save">
                            <i className="bi bi-check-lg"></i>
                            {initialItem ? 'Guardar Cambios' : 'Crear Producto'}
                        </button>
                    </div>

                </form>
            </div>
            
            <ProductSelectorModal 
                isOpen={isProductSelectorOpen}
                onClose={() => setIsProductSelectorOpen(false)}
                products={existingItems || []}
                onSelect={handleAddProducts}
            />

            <AlertDialog 
                isOpen={alertConfig.isOpen}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
                onConfirm={closeAlert}
                confirmText="Entendido"
            />
        </div>
    );
};
