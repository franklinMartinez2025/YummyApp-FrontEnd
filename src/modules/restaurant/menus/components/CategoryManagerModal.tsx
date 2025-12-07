import { useState, useEffect } from 'react';
import '../styles/CategoryManagerModal.css';
import type { GenericItemName } from '../../../../shared/types/common';


interface CategoryManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: GenericItemName[];
  onUpdateCategories: (newCategories: GenericItemName[]) => void;
}

export const CategoryManagerModal = ({ isOpen, onClose, categories, onUpdateCategories }: CategoryManagerModalProps) => {
    const [localCategories, setLocalCategories] = useState<GenericItemName[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editName, setEditName] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');

    useEffect(() => {
        if (isOpen) {
            setLocalCategories(categories);
            setIsAdding(false);
            setEditingId(null);
        }
    }, [isOpen, categories]);

    const handleDelete = (id: number) => {
        if (window.confirm("¿Seguro que deseas eliminar esta categoría?")) {
            const updated = localCategories.filter(cat => cat.id !== id);
            setLocalCategories(updated);
            onUpdateCategories(updated);
        }
    };

    const startEdit = (cat: GenericItemName) => {
        setEditingId(cat.id);
        setEditName(cat.name);
    };

    const saveEdit = () => {
        if (!editName.trim()) return;
        const updated = localCategories.map(cat => 
            cat.id === editingId ? { ...cat, name: editName } : cat
        );
        setLocalCategories(updated);
        onUpdateCategories(updated);
        setEditingId(null);
    };

    const handleAdd = () => {
        if (!newCategoryName.trim()) return;
        const newCat: GenericItemName = {
            id: Math.floor(Math.random() * 1000000),
            name: newCategoryName,
        };
        const updated = [...localCategories, newCat];
        setLocalCategories(updated);
        onUpdateCategories(updated);
        setNewCategoryName('');
        setIsAdding(false);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay-custom open" onClick={onClose}>
            <div className="modal-content-custom category-manager-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header-custom">
                    <h5 className="modal-title-custom">📂 Gestión de Categorías</h5>
                    <button type="button" className="btn-close-custom" onClick={onClose}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                <div className="modal-body-custom">
                    
                    {/* Add New Section */}
                    {isAdding ? (
                        <div className="add-category-card animate-fade-in-down mb-4">
                            <h6 className="fw-bold mb-2 text-primary">Nueva Categoría</h6>
                            <div className="d-flex gap-2">
                                <input 
                                    type="text" 
                                    className="form-control-custom" 
                                    value={newCategoryName}
                                    onChange={e => setNewCategoryName(e.target.value)}
                                    placeholder="Nombre (ej. Sopas)" 
                                    autoFocus
                                    onKeyDown={e => e.key === 'Enter' && handleAdd()}
                                />
                                <button className="btn btn-success rounded-pill px-3" onClick={handleAdd}>
                                    <i className="bi bi-check-lg"></i>
                                </button>
                                <button className="btn btn-light rounded-pill px-3" onClick={() => setIsAdding(false)}>
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button className="btn btn-outline-primary w-100 rounded-3 mb-4 py-2 border-dashed fw-bold" onClick={() => setIsAdding(true)}>
                            <i className="bi bi-plus-lg me-2"></i>Crear Nueva Categoría (RF-REST-001)
                        </button>
                    )}

                    {/* List */}
                    <div className="categories-list d-flex flex-column gap-2">
                        {localCategories.map(cat => (
                            <div key={cat.id} className={`category-item p-3 rounded-3 border d-flex justify-content-between align-items-center`}>
                                
                                {editingId === cat.id ? (
                                    <div className="d-flex gap-2 flex-grow-1 me-2">
                                        <input 
                                            type="text" 
                                            className="form-control form-control-sm" 
                                            value={editName}
                                            onChange={e => setEditName(e.target.value)} 
                                            autoFocus
                                        />
                                        <button className="btn btn-sm btn-success" onClick={saveEdit}><i className="bi bi-check"></i></button>
                                        <button className="btn btn-sm btn-light" onClick={() => setEditingId(null)}><i className="bi bi-x"></i></button>
                                    </div>
                                ) : (
                                    <div className="d-flex align-items-center gap-3">
                                        <div>
                                            <h6 className="mb-0 fw-bold">{cat.name}</h6>
                                        </div>
                                    </div>
                                )}

                                <div className="actions d-flex gap-1">
                                    <button className="btn btn-sm btn-link text-secondary" onClick={() => startEdit(cat)} title="Editar (RF-REST-002)">
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                    <button 
                                        className={`btn btn-sm btn-link text-danger`} 
                                        onClick={() => handleDelete(cat.id)}
                                        title="Eliminar (RF-REST-003)"
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
