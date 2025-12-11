import { useState, useEffect, useRef } from 'react';
import '../styles/MenuItemModal.css';
import { AlertDialog, type AlertType } from '../../../shared/components/AlertDialog';
import type { FoodItemDto } from '../../../../core/application/dtos/restaurant/FoodItem.dto';
import type { GenericItemName } from '../../../../shared/types/common';
import type {ModifierGroupsTemplateDto } from '../../../../core/application/dtos/restaurant/ModifierGroupsTemplate.dto';

interface MenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: FoodItemDto, imageFile?: File) => void;
  initialItem?: FoodItemDto;
  availableCategories?: GenericItemName[];
  existingItems?: FoodItemDto[];
  availableGroups?: ModifierGroupsTemplateDto[];
  availableModifierItems?: GenericItemName[];
}

export const MenuItemModal = ({ 
    isOpen, onClose, onSave, initialItem, 
    availableCategories = [],
    existingItems = [],
    availableGroups = [], availableModifierItems = []
}: MenuItemModalProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState<FoodItemDto>({
        dishId: 0,
        dishName: '',
        description: '',
        price: 0,
        imageUrl: '',
        categoryId: 0,
        categoryName: '',
        isActive: true, 
        extras: [],
        preparationTime: 15,
        isStockManaged: false,
        stock: 0
    });



    const [categories, setCategories] = useState<GenericItemName[]>(availableCategories);
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [activeTab, setActiveTab] = useState<'info' | 'extras'>('info');
    const [isVisible, setIsVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [alertConfig, setAlertConfig] = useState<{isOpen: boolean, title: string, message: string, type: AlertType}>({
        isOpen: false, title: '', message: '', type: 'info'
    });

    // Image Upload State
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        // Init preview from existing URL if no new file selected
        if (!selectedFile) {
            setPreviewUrl(formData.imageUrl || null);
        }
        // Cleanup function for object URLs is handled in handleImageChange/cleanup
    }, [formData.imageUrl, selectedFile]);

    useEffect(() => {
        // Reset file state when modal opens/closes or item changes
        if(isOpen) {
             setSelectedFile(null);
             setPreviewUrl(initialItem?.imageUrl || null);
        }
    }, [isOpen, initialItem]);

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
                        dishId: 0,
                        dishName: '',
                        description: '',
                        price: 0,
                        imageUrl: '',
                        categoryId: 0,
                        categoryName: '',
                        isActive: true, 
                        extras: [],
                        preparationTime: 15,
                        isStockManaged: false,
                        stock: 0});
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

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(e.target.value);
        const selectedCategory = categories.find(c => c.id === selectedId);
        if (selectedCategory) {
            setFormData(prev => ({
                ...prev,
                categoryId: selectedCategory.id,
                categoryName: selectedCategory.name
            }));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
            
            // Cleanup previous object URL if needed, but for simplicity relying on component unmount or new selection replacement
            // Ideally we track the previous previewUrl and revoke it if it was a blob
        }
    };

    const linkGroup = (libraryGroup: ModifierGroupsTemplateDto) => {
        // Convert Library Group to Product Extra Group
        const newGroup: ModifierGroupsTemplateDto = {
            id: libraryGroup.id,
            name: libraryGroup.name,
            minSelection: libraryGroup.minSelection,
            maxSelection: libraryGroup.maxSelection,
            options: libraryGroup.options.map(opt => {
                const itemDef = availableModifierItems.find(i => i.id === opt.itemId);
                return {
                    id: 0,
                    itemId: opt.itemId,
                    itemName: itemDef ? itemDef.name : 'Unknown',
                    price: opt.price
                };
            })
        };

        setFormData(prev => ({ ...prev, extras: [...(prev.extras || []), newGroup] }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const normalizedName = formData.dishName.trim().toLowerCase();
        const isDuplicate = existingItems.some(existing => 
            existing.dishName.toLowerCase() === normalizedName && 
            (!initialItem || initialItem.dishId !== existing.dishId)
        );

        if (isDuplicate) {
            setError("⚠️ El nombre ya existe. Elige otro.");
            return;
        }
        
        if (formData.price <= 0) {
            setAlertConfig({
                isOpen: true,
                title: 'Precio Requerido',
                message: 'No puedes guardar un platillo sin precio o con precio 0. Por favor asigna un valor válido.',
                type: 'warning'
            });
            return;
        }

        onSave(formData, selectedFile || undefined);
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
                                        <input type="text" className="form-control-custom" name="dishName" value={formData.dishName} onChange={handleChange} required placeholder="Ej. Lomo Saltado" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group-custom">
                                        <label className="form-label-custom">Categoría</label>
                                        <div className="d-flex gap-2">
                                            {isAddingCategory ? (
                                                <input type="text" className="form-control-custom animate-fade-in" name="categoryName" value={formData.categoryName} onChange={handleChange} placeholder="Nueva..." autoFocus />
                                            ) : (
                                                <select className="form-control-custom" name="categoryId" value={formData.categoryId} onChange={handleCategoryChange} required>
                                                    <option value={0} disabled>Seleccionar...</option>
                                                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
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
                                        <select className="form-control-custom" name="isActive" value={formData.isActive.toString()} onChange={handleChange}>
                                            <option value="true">🟢 Activo</option>
                                            <option value="false">🔴 Agotado</option>
                                        </select>
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
                                </div>

                                { /* Image */ }
                                <div className="col-12">
                                    <div className="input-group-custom">
                                        <label className="form-label-custom">Imagen del Platillo</label>
                                        <input 
                                            type="file" 
                                            className="form-control-custom" 
                                            accept="image/*"
                                            onChange={handleImageChange} 
                                            ref={fileInputRef}
                                            required={!initialItem && !selectedFile} // Required only on create if no file selected
                                        />
                                        <small className="text-muted mt-1 d-block">Sube una imagen atractiva (JPG, PNG)</small>
                                    </div>
                                    {previewUrl && (
                                        <div className="mt-2 rounded-3 overflow-hidden shadow-sm position-relative group-preview-image" style={{height: '150px', width: '200px', border: '2px dashed #ddd'}}>
                                            <img src={previewUrl} alt="Preview" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                            <button 
                                                type="button" 
                                                className="position-absolute top-0 end-0 btn btn-sm btn-danger m-1 rounded-circle"
                                                onClick={() => {
                                                    setSelectedFile(null);
                                                    setPreviewUrl(initialItem?.imageUrl || null);
                                                    if (fileInputRef.current) {
                                                        fileInputRef.current.value = '';
                                                    }
                                                }}
                                            >
                                                <i className="bi bi-x"></i>
                                            </button>
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
                                                            {group.options.map((opt) => (
                                                                    <tr key={opt.id} className="border-bottom-custom">
                                                                    <td className="ps-3 text-dark">{opt.itemName}</td>
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
