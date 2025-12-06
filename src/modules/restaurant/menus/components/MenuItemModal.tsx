import { useState, useEffect } from 'react';
import '../styles/MenuItemModal.css';
import { AlertDialog, type AlertType } from '../../../shared/components/AlertDialog';
import type { ModifierGroup, ModifierItem } from './ExtrasLibrary';

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
  sourceGroupId?: string; // Link to library
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
  availableGroups?: ModifierGroup[]; // Library
  availableModifierItems?: ModifierItem[]; // Reference for names if needed
}

const DEFAULT_CATEGORIES = ["Entradas", "Platos Fuertes", "Bebidas", "Postres"];


export const MenuItemModal = ({ 
    isOpen, onClose, onSave, initialItem, 
    availableCategories = DEFAULT_CATEGORIES, existingItems = [],
    availableGroups = [], availableModifierItems = []
}: MenuItemModalProps) => {
    const [formData, setFormData] = useState<MenuItem>({
        name: '', description: '', price: 0, image: '', category: availableCategories[0] || '', status: 'Activo', 
        extras: [], // Default empty
        preparationTime: 15, isStockManaged: false, stock: 0, isRecommended: false, isPopular: false, 
        availableDays: [],
        isVisible: true
    });

    const [categories, setCategories] = useState(availableCategories);
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [activeTab, setActiveTab] = useState<'info' | 'extras'>('info');
    const [isVisible, setIsVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    useEffect(() => {
        if (initialItem) {
            setFormData(initialItem);
        } else {
            setFormData({
                name: '', description: '', price: 0, image: '', category: categories[0] || '', status: 'Activo', 
                extras: [],
                preparationTime: 15, isStockManaged: false, stock: 0, isRecommended: false, isPopular: false, 
                availableDays: [],
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



    const updateOption = (groupIndex: number, optionIndex: number, field: keyof ExtraOption, value: any) => {
        const newExtras = [...(formData.extras || [])];
        newExtras[groupIndex].options[optionIndex] = {
            ...newExtras[groupIndex].options[optionIndex],
            [field]: field === 'price' ? parseFloat(value) : value
        };
        setFormData(prev => ({ ...prev, extras: newExtras }));
    };

    const linkGroup = (libraryGroup: ModifierGroup) => {
        // Convert Library Group to Product Extra Group
        const newGroup: ExtraGroup = {
            id: Date.now().toString(),
            name: libraryGroup.name,
            minSelection: libraryGroup.minSelection,
            maxSelection: libraryGroup.maxSelection,
            sourceGroupId: libraryGroup.id,
            options: libraryGroup.options.map(opt => {
                // Resolve name from ID if possible
                const itemDef = availableModifierItems.find(i => i.id === opt.itemId);
                return {
                    id: Date.now().toString() + Math.random(),
                    name: itemDef ? itemDef.name : 'Unknown Item',
                    price: opt.price
                };
            })
        };

        setFormData(prev => ({ ...prev, extras: [...(prev.extras || []), newGroup] }));
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
                                { /* Name & Category */ }
                                <div className="col-12">
                                    <div className="row g-3">
                                        <div className="col-md-7">
                                            <div className="input-group-custom">
                                                <label className="form-label-custom">Nombre</label>
                                                <input type="text" className="form-control-custom" name="name" value={formData.name} onChange={handleChange} required placeholder="Ej. Lomo Saltado" />
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="input-group-custom">
                                                <label className="form-label-custom">Categoría</label>
                                                <div className="d-flex gap-2">
                                                    {isAddingCategory ? (
                                                        <input type="text" className="form-control-custom animate-fade-in" name="category" value={formData.category} onChange={handleChange} placeholder="Nueva..." autoFocus />
                                                    ) : (
                                                        <select className="form-control-custom" name="category" value={formData.category} onChange={handleChange} style={{flex: 1}}>
                                                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                                        </select>
                                                    )}
                                                    <button type="button" className={`btn ${isAddingCategory ? 'btn-danger' : 'btn-outline-primary'} rounded-3 px-3`} onClick={() => setIsAddingCategory(!isAddingCategory)}>
                                                        <i className={`bi ${isAddingCategory ? 'bi-x-lg' : 'bi-plus-lg'}`}></i>
                                                    </button>
                                                </div>
                                            </div>
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

                                { /* Stock Management Only */ }
                                <div className="col-12 d-flex align-items-center bg-light p-3 rounded-3 border">
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" id="stockSwitch" name="isStockManaged" checked={formData.isStockManaged} onChange={handleChange} />
                                        <label className="form-check-label fw-bold small" htmlFor="stockSwitch">Gestionar Stock</label>
                                    </div>
                                    {formData.isStockManaged && (
                                        <div className="animate-fade-in ms-3" style={{width: '120px'}}>
                                            <input type="number" className="form-control form-control-sm border-secondary" name="stock" value={formData.stock} onChange={handleChange} placeholder="Cant." />
                                        </div>
                                    )}
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
                                {/* Header Actions */}
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h6 className="mb-0 fw-bold text-dark">Grupos Asignados</h6>
                                    <div className="dropdown">
                                        <button className="btn btn-sm btn-primary dropdown-toggle fw-bold" type="button" data-bs-toggle="dropdown">
                                            <i className="bi bi-link-45deg me-1"></i>Vincular Grupo
                                        </button>
                                        <ul className="dropdown-menu shadow border-0 p-1" style={{maxHeight:'250px', overflowY:'auto'}}>
                                            <li><h6 className="dropdown-header text-uppercase fs-xs">Biblioteca de Grupos</h6></li>
                                            {availableGroups.length === 0 && <li className="px-3 py-2 text-muted small">No hay grupos creados. Ve a la pestaña de Bibliotecas.</li>}
                                            {availableGroups.map(grp => (
                                                <li key={grp.id}>
                                                    <button type="button" className="dropdown-item rounded-2 py-2" onClick={() => linkGroup(grp)}>
                                                        {grp.name} <span className="text-muted small ms-2">({grp.options.length} items)</span>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {(!formData.extras || formData.extras.length === 0) && (
                                    <div className="text-center p-5 border rounded-3 bg-light text-muted">
                                        <i className="bi bi-diagram-2 fs-1 mb-2 d-block opacity-50"></i>
                                        <p className="mb-0">Este producto no tiene grupos de modificadores.</p>
                                        <small>Vincula grupos como "Entradas" o "Bebidas" desde tu biblioteca.</small>
                                    </div>
                                )}

                                <div className="d-flex flex-column gap-3">
                                    {formData.extras?.map((group, groupIndex) => (
                                        <div key={group.id} className="card border shadow-sm group-card">
                                            <div className="card-header bg-white py-2 d-flex justify-content-between align-items-center">
                                                <div className="d-flex align-items-center gap-2 flex-grow-1">
                                                    {group.sourceGroupId && (
                                                        <span className="badge bg-primary-subtle text-primary border border-primary-subtle" title="Vinculado a Biblioteca">
                                                            <i className="bi bi-link-45deg"></i>
                                                        </span>
                                                    )}
                                                    <input 
                                                        type="text" 
                                                        className="form-control form-control-sm border-0 fw-bold px-0 shadow-none text-dark" 
                                                        value={group.name} 
                                                        readOnly 
                                                        style={{cursor: 'default'}}
                                                    />
                                                </div>
                                                <button type="button" className="btn btn-sm text-danger" onClick={() => {
                                                    const newExtras = [...(formData.extras || [])];
                                                    newExtras.splice(groupIndex, 1);
                                                    setFormData(prev => ({ ...prev, extras: newExtras }));
                                                }}>
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                            <div className="card-body p-3 bg-light">
                                                {/* Rules Info */}
                                                <div className="d-flex align-items-center fs-sm text-muted mb-2">
                                                    <i className="bi bi-info-circle me-2"></i>
                                                    Reglas: {group.minSelection === 1 && group.maxSelection === 1 
                                                        ? 'Selección Única (Obligatorio)' 
                                                        : `Cliente elige entre ${group.minSelection} y ${group.maxSelection}`}
                                                </div>

                                                {/* Options List Read-Onlyish */}
                                                <div className="table-responsive bg-white rounded-3 border">
                                                    <table className="table table-sm table-borderless align-middle mb-0">
                                                        <thead className="text-muted small text-uppercase bg-light border-bottom">
                                                            <tr>
                                                                <th className="ps-3">Opción</th>
                                                                <th className="text-end pe-3">Precio Extra</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {group.options.map((opt, oIndex) => (
                                                                <tr key={opt.id} className="border-bottom-custom">
                                                                    <td className="ps-3 text-dark">{opt.name}</td>
                                                                    <td className="text-end pe-3">
                                                                         {opt.price > 0 ? `+ $${opt.price.toFixed(2)}` : 'Gratis'}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
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
