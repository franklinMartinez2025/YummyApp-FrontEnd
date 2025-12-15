import { useState, useMemo } from 'react';
import type { ProductDto } from '../../../../../core/application/dtos/restaurant/ProductDto';
import type { CartItemModifierDto } from '../../../../../core/application/dtos/cart/CartDto';
import './ProductCustomizationModal.css';

interface ProductCustomizationModalProps {
    product: ProductDto;
    onClose: () => void;
    onConfirm: (
        modifiers: CartItemModifierDto[],
        specialInstructions: string,
        quantity: number
    ) => void;
}

export const ProductCustomizationModal = ({
    product,
    onClose,
    onConfirm
}: ProductCustomizationModalProps) => {
    const [quantity, setQuantity] = useState(1);
    const [specialInstructions, setSpecialInstructions] = useState('');
    const [selections, setSelections] = useState<Record<string, string[]>>({});

    // Initialize selections grouped by modifier group name
    const handleOptionToggle = (groupName: string, optionName: string) => {
        setSelections(prev => {
            return {
                ...prev,
                [groupName]: [optionName] 
            };
        });
    };

    const calculateTotal = useMemo(() => {
        let total = product.price;
        product.customization?.forEach(group => {
            const groupSelections = selections[group.name] || [];
            group.options.forEach(option => {
                if (groupSelections.includes(option.name)) {
                    total += option.price;
                }
            });
        });
        return total * quantity;
    }, [product, selections, quantity]);

    const handleConfirm = () => {
        const modifiers: CartItemModifierDto[] = [];
        
        product.customization?.forEach(group => {
            const groupSelections = selections[group.name];
            if (groupSelections && groupSelections.length > 0) {
                 const selectedOptions = group.options
                    .filter(opt => groupSelections.includes(opt.name))
                    .map(opt => ({
                        id: opt.id,
                        name: opt.name,
                        price: opt.price
                    }));

                if (selectedOptions.length > 0) {
                    modifiers.push({
                        id: group.id,
                        name: group.name,
                        price: 0, // Group price usually 0, options carry price
                        options: selectedOptions
                    });
                }
            }
        });

        onConfirm(modifiers, specialInstructions, quantity);
    };

    const isValid = useMemo(() => {
        // Validate required groups if necessary. 
        // For now, assume all groups listed in customization might be optional unless specified otherwise
        // But user said "must select", so let's enforce selection for all groups for now as a safe default based on "debe elegir uno"
        if (!product.customization) return true;
        
        return product.customization.every(group => {
             const selected = selections[group.name];
             return selected && selected.length > 0;
        });
    }, [product.customization, selections]);


    return (
        <div className="modal-overlay" onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
        }}>
            <div className="customization-modal">
                <div className="modal-header-hero">
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="hero-image"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://placehold.co/800x400?text=Plato';
                        }}
                    />
                    <div className="hero-overlay"></div>
                    <button 
                        onClick={onClose}
                        className="btn-close-custom"
                        aria-label="Close"
                    >
                        <i className="bi bi-x mx-auto fs-5"></i>
                    </button>
                </div>

                <div className="modal-content-scroller">
                    <div className="modal-body-custom">
                        <div className="product-info-header">
                            <h4 className="fw-bold mb-2 display-6 fs-3">{product.name}</h4>
                            <p className="text-muted mb-0">{product.description}</p>
                        </div>

                        {product.customization?.map((group) => (
                            <div key={group.name} className="modifier-group">
                                <div className="modifier-group-header">
                                    <h6 className="fw-bold mb-0">{group.name}</h6>
                                    <span className="badge bg-light text-dark border rounded-pill px-3">Obligatorio</span>
                                </div>
                                
                                <div className="d-flex flex-column gap-2">
                                    {group.options.map((option) => {
                                        const isSelected = selections[group.name]?.includes(option.name);
                                        return (
                                            <div 
                                                key={option.name}
                                                className={`modifier-option ${isSelected ? 'selected' : ''} d-flex justify-content-between align-items-center`}
                                                onClick={() => handleOptionToggle(group.name, option.name)}
                                            >
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className={`rounded-circle border d-flex align-items-center justify-content-center ${isSelected ? 'bg-primary border-primary' : 'bg-white'}`} style={{width: '24px', height: '24px'}}>
                                                        {isSelected && <i className="bi bi-check text-white small"></i>}
                                                    </div>
                                                    <span className={`fw-medium ${isSelected ? 'text-primary' : 'text-dark'}`}>
                                                        {option.name}
                                                    </span>
                                                </div>
                                                <span className="text-muted fw-medium small">
                                                    {option.price > 0 ? `+ $${option.price.toFixed(2)}` : 'Gratis'}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        <div className="mt-5">
                            <label className="form-label fw-bold mb-3 d-flex align-items-center">
                                <i className="bi bi-chat-square-text me-2 text-primary"></i>
                                Instrucciones especiales
                            </label>
                            <textarea
                                className="form-control bg-light border-0"
                                rows={3}
                                placeholder="Ej: Sin cebolla, extra servilletas... (Opcional)"
                                value={specialInstructions}
                                onChange={(e) => setSpecialInstructions(e.target.value)}
                                style={{ borderRadius: '1rem', padding: '1rem' }}
                            />
                        </div>
                    </div>
                </div>

                <div className="modal-footer-custom">
                    {/* Visual hint for quantity behavior */}
                    {quantity > 1 && (
                        <div className="alert alert-light border-0 bg-light text-muted small mb-3 py-2 px-3 d-flex align-items-center">
                            <i className="bi bi-info-circle-fill me-2 text-primary"></i>
                            Se agregarán {quantity} items con idéntica configuración.
                        </div>
                    )}

                    <div className="row g-3 align-items-center">
                        <div className="col-4">
                            <div className="quantity-control shadow-sm">
                                <button 
                                    className="btn btn-quantity"
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                >
                                    <i className="bi bi-dash"></i>
                                </button>
                                <span className="fw-bold fs-5 mx-2">{quantity}</span>
                                <button 
                                    className="btn btn-quantity"
                                    onClick={() => setQuantity(q => q + 1)}
                                >
                                    <i className="bi bi-plus"></i>
                                </button>
                            </div>
                        </div>
                        <div className="col-8 d-flex gap-2">
                            <button 
                                className="btn btn-add-to-cart flex-grow-1 shadow-lg d-flex justify-content-center align-items-center gap-2"
                                disabled={!isValid}
                                onClick={handleConfirm}
                            >
                                <span>Agregar</span>
                                <span className="badge bg-white text-primary rounded-pill px-2">
                                    ${(calculateTotal * quantity).toFixed(2)}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
