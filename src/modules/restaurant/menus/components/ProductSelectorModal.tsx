import { useState, useMemo } from 'react';
import '../styles/MenuItemModal.css';
import type { FoodItemDto } from '../../../../core/application/dtos/restaurant/FoodItem.dto';

interface ProductSelectorModalProps {
    isOpen: boolean;
    onClose: () => void;
    products: FoodItemDto[];
    onSelect: (selectedProducts: FoodItemDto[]) => void; 
}

export const ProductSelectorModal = ({ isOpen, onClose, products, onSelect }: ProductSelectorModalProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

    const activeProducts = useMemo(() => 
        products.filter(p => p.isActive), 
    [products]);

    const filteredProducts = useMemo(() => 
        activeProducts.filter(p => p.dishName.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase())),
    [activeProducts, searchTerm]);

    const handleToggle = (id: number) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    const handleConfirm = () => {
        const selected = activeProducts.filter(p => selectedIds.has(p.dishId));
        onSelect(selected);
        onClose();
        setSelectedIds(new Set()); 
        setSearchTerm('');
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay-custom open" onClick={onClose} style={{zIndex: 1060}}>
            <div className="modal-content-custom" onClick={e => e.stopPropagation()} style={{maxWidth: '600px', height: '80vh', display: 'flex', flexDirection: 'column'}}>
                <div className="modal-header-custom bg-white border-bottom">
                    <h5 className="modal-title-custom"><i className="bi bi-basket me-2"></i>Seleccionar Productos</h5>
                    <button type="button" className="btn-close-custom" onClick={onClose}><i className="bi bi-x-lg"></i></button>
                </div>

                <div className="p-3 border-bottom bg-light">
                    <input 
                        type="text" 
                        className="form-control-custom" 
                        placeholder="Buscar por nombre o descripción..." 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        autoFocus
                    />
                </div>

                <div className="modal-body-custom p-0" style={{overflowY: 'auto', flex: 1}}>
                    {filteredProducts.length > 0 ? (
                        <div className="list-group list-group-flush">
                            {filteredProducts.map(product => (
                                <label key={product.dishId} className={`list-group-item list-group-item-action p-3 d-flex align-items-center gap-3 cursor-pointer ${selectedIds.has(product.dishId) ? 'bg-primary-subtle' : ''}`}>
                                    <input 
                                        type="checkbox" 
                                        className="form-check-input flex-shrink-0" 
                                        style={{width: '1.5em', height: '1.5em'}}
                                        checked={selectedIds.has(product.dishId)}
                                        onChange={() => handleToggle(product.dishId)}
                                    />
                                    <div className="d-flex align-items-center gap-3 flex-grow-1">
                                        {product.imageUrl && (
                                            <img src={product.imageUrl} alt="" className="rounded-3 object-fit-cover" style={{width: '50px', height: '50px'}} />
                                        )}
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center w-100">
                                                <h6 className="mb-0 fw-bold">{product.dishName}</h6>
                                                <span className="badge bg-light text-dark border">${product.price}</span>
                                            </div>
                                            <small className="text-secondary line-clamp-1">{product.description}</small>
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center p-5 text-muted">
                            <i className="bi bi-search display-6 mb-3"></i>
                            <p>No se encontraron productos activos.</p>
                        </div>
                    )}
                </div>

                <div className="modal-footer-custom bg-white border-top p-3">
                    <div className="d-flex justify-content-between w-100 align-items-center">
                        <span className="text-muted small">{selectedIds.size} seleccionados</span>
                        <div className="d-flex gap-2">
                            <button className="btn-cancel" onClick={onClose}>Cancelar</button>
                            <button className="btn-save" onClick={handleConfirm} disabled={selectedIds.size === 0}>
                                <i className="bi bi-check-lg me-2"></i>
                                Añadir {selectedIds.size > 0 ? `(${selectedIds.size})` : ''}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

