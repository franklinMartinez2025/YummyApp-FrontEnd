import { useState } from 'react';

// Data Models
export interface ModifierItem {
    id: string;
    name: string;
}

export interface ModifierGroup {
    id: string;
    name: string;
    minSelection: number;
    maxSelection: number;
    options: {
        id: string; // Unique ID for this option in the group
        itemId: string; // Reference to ModifierItem
        price: number;
    }[];
}

interface ExtrasLibraryProps {
    items: ModifierItem[];
    setItems: React.Dispatch<React.SetStateAction<ModifierItem[]>>;
    groups: ModifierGroup[];
    setGroups: React.Dispatch<React.SetStateAction<ModifierGroup[]>>;
}

export const ExtrasLibrary = ({ items, setItems, groups, setGroups }: ExtrasLibraryProps) => {
    const [activeTab, setActiveTab] = useState<'items' | 'groups'>('items');
    
    // Quick Add Item State
    const [newItemName, setNewItemName] = useState('');

    // Group Editor State
    const [editingGroup, setEditingGroup] = useState<ModifierGroup | null>(null);

    // -- Item Handlers --
    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newItemName.trim()) return;
        setItems(prev => [...prev, { id: Date.now().toString(), name: newItemName.trim() }]);
        setNewItemName('');
    };

    const handleDeleteItem = (id: string) => {
        // Warning: In specific implementations, check if used in groups first
        setItems(prev => prev.filter(i => i.id !== id));
    };

    // -- Group Handlers --
    const handleCreateGroup = () => {
        const newGroup: ModifierGroup = {
            id: Date.now().toString(),
            name: 'Nuevo Grupo',
            minSelection: 1,
            maxSelection: 1,
            options: []
        };
        setGroups(prev => [...prev, newGroup]);
        setEditingGroup(newGroup);
    };

    const handleSaveGroup = () => {
        if (editingGroup) {
            setGroups(prev => prev.map(g => g.id === editingGroup.id ? editingGroup : g));
            setEditingGroup(null);
        }
    };

    const addItemToGroup = (itemId: string) => {
        if (!editingGroup) return;
        const item = items.find(i => i.id === itemId);
        if (!item) return;

        setEditingGroup({
            ...editingGroup,
            options: [...editingGroup.options, {
                id: Date.now().toString(),
                itemId: item.id,
                price: 0
            }]
        });
    };

    return (
        <div className="extras-library container-fluid p-0 animate-fade-in">
            
            {/* Library Header */}
            <div className="d-flex gap-2 mb-4">
                <button 
                    className={`btn rounded-pill px-3 fw-bold ${activeTab === 'items' ? 'btn-dark' : 'btn-light text-secondary'}`}
                    onClick={() => setActiveTab('items')}
                >
                    1. Componentes
                </button>
                <button 
                    className={`btn rounded-pill px-3 fw-bold ${activeTab === 'groups' ? 'btn-dark' : 'btn-light text-secondary'}`}
                    onClick={() => setActiveTab('groups')}
                >
                    2. Armar Grupos
                </button>
            </div>

            {/* TAB 1: COMPONENTS */}
            {activeTab === 'items' && (
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card shadow-sm border-0 sticky-top" style={{top: '20px'}}>
                            <div className="card-body bg-light rounded-3">
                                <h6 className="fw-bold mb-3"><i className="bi bi-plus-circle me-2"></i>Crear Componente</h6>
                                <p className="small text-muted mb-3">
                                    Agrega items sueltos como "Sopa", "Arroz", "Papas". Luego los agruparás.
                                </p>
                                <form onSubmit={handleAddItem}>
                                    <div className="input-group mb-2">
                                        <input 
                                            type="text" 
                                            className="form-control"
                                            placeholder="Nombre (ej. Sopa de Pollo)"
                                            value={newItemName}
                                            onChange={e => setNewItemName(e.target.value)}
                                            autoFocus
                                        />
                                        <button className="btn btn-primary" type="submit">
                                            <i className="bi bi-check-lg"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-header bg-white py-3">
                                <h6 className="mb-0 fw-bold">Mis Componentes ({items.length})</h6>
                            </div>
                            <div className="card-body p-0">
                                <div className="list-group list-group-flush">
                                    {items.length === 0 && (
                                        <div className="text-center py-5 text-muted">
                                            <i className="bi bi-basket fs-1 mb-2 d-block opacity-25"></i>
                                            Sin componentes creados
                                        </div>
                                    )}
                                    {items.map(item => (
                                        <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center px-4 py-3">
                                            <span className="fw-medium">{item.name}</span>
                                            <button 
                                                className="btn btn-sm btn-outline-danger border-0 opacity-50 hover-opacity-100"
                                                onClick={() => handleDeleteItem(item.id)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: GROUPS */}
            {activeTab === 'groups' && (
                <div className="row g-4 animate-fade-in">
                    {!editingGroup ? (
                        <>
                            <div className="col-12 d-flex justify-content-between align-items-center mb-2">
                                <h5 className="fw-bold mb-0 text-dark">Mis Grupos de Extras</h5>
                                <button className="btn btn-primary" onClick={handleCreateGroup}>
                                    <i className="bi bi-plus-lg me-2"></i>Nuevo Grupo
                                </button>
                            </div>
                            
                            {groups.map(group => (
                                <div key={group.id} className="col-md-6 col-lg-4">
                                    <div className="card h-100 shadow-sm border-0 hover-lift-sm group-card-selector" onClick={() => setEditingGroup(group)}>
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <h6 className="fw-bold text-primary mb-0">{group.name}</h6>
                                                <span className="badge bg-light text-secondary border">
                                                    {group.options.length} opciones
                                                </span>
                                            </div>
                                            <p className="small text-muted mb-3">
                                                {group.minSelection === 1 && group.maxSelection === 1 
                                                    ? 'Selección Única (Obligatorio)' 
                                                    : `Selecciona entre ${group.minSelection} y ${group.maxSelection}`}
                                            </p>
                                            <div className="d-flex flex-wrap gap-1">
                                                {group.options.slice(0, 3).map(opt => {
                                                    const itemName = items.find(i => i.id === opt.itemId)?.name || '???';
                                                    return (
                                                        <span key={opt.id} className="badge bg-secondary-subtle text-dark small fw-normal">
                                                            {itemName}
                                                        </span>
                                                    );
                                                })}
                                                {group.options.length > 3 && <span className="badge bg-light text-muted border">+ {group.options.length - 3}</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        // EDITING MODE
                        <div className="col-12">
                            <div className="card shadow border-0">
                                <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center sticky-top z-1">
                                    <div className="d-flex align-items-center gap-3">
                                        <button className="btn btn-light rounded-circle" onClick={() => setEditingGroup(null)}>
                                            <i className="bi bi-arrow-left"></i>
                                        </button>
                                        <h5 className="mb-0 fw-bold">Editando Grupo</h5>
                                    </div>
                                    <button className="btn btn-success px-4" onClick={handleSaveGroup}>
                                        Guardar Grupo
                                    </button>
                                </div>
                                <div className="card-body p-4">
                                    <div className="row g-4">
                                        {/* Configuration */}
                                        <div className="col-lg-4 border-end">
                                            <h6 className="text-uppercase text-muted fs-xs fw-bold mb-3">Configuración</h6>
                                            <div className="mb-3">
                                                <label className="form-label small fw-bold">Nombre del Grupo</label>
                                                <input 
                                                    type="text" className="form-control" 
                                                    value={editingGroup.name} 
                                                    onChange={e => setEditingGroup({...editingGroup, name: e.target.value})}
                                                    placeholder="Ej. Entradas del Día"
                                                />
                                            </div>
                                            <div className="row g-2 mb-3">
                                                <div className="col-6">
                                                    <label className="form-label small fw-bold">Mínimo</label>
                                                    <input 
                                                        type="number" className="form-control" 
                                                        value={editingGroup.minSelection} 
                                                        onChange={e => setEditingGroup({...editingGroup, minSelection: parseInt(e.target.value) || 0})}
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <label className="form-label small fw-bold">Máximo</label>
                                                    <input 
                                                        type="number" className="form-control" 
                                                        value={editingGroup.maxSelection} 
                                                        onChange={e => setEditingGroup({...editingGroup, maxSelection: parseInt(e.target.value) || 0})}
                                                    />
                                                </div>
                                            </div>
                                            <div className="alert alert-info py-2 small">
                                                <i className="bi bi-info-circle me-1"></i>
                                                Configura cuántas opciones debe o puede elegir el cliente.
                                            </div>
                                        </div>

                                        {/* Items Manager */}
                                        <div className="col-lg-8">
                                            <h6 className="text-uppercase text-muted fs-xs fw-bold mb-3">Items en este Grupo</h6>
                                            
                                            {/* Item Picker */}
                                            <div className="mb-3">
                                                <div className="dropdown">
                                                    <button className="btn btn-outline-primary dropdown-toggle w-100 text-start d-flex justify-content-between align-items-center" type="button" data-bs-toggle="dropdown">
                                                        <span><i className="bi bi-plus-lg me-2"></i>Agregar Componente al Grupo</span>
                                                    </button>
                                                    <ul className="dropdown-menu w-100 shadow border-0 p-1" style={{maxHeight: '300px', overflowY: 'auto'}}>
                                                        {items.map(item => (
                                                            <li key={item.id}>
                                                                <button className="dropdown-item py-2 rounded-2" onClick={() => addItemToGroup(item.id)}>
                                                                    {item.name}
                                                                </button>
                                                            </li>
                                                        ))}
                                                        {items.length === 0 && <li className="px-3 py-2 text-muted small">No hay componentes. Crea uno en la pestaña 1.</li>}
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* Grouped Items List */}
                                            <div className="table-responsive bg-light rounded-3 border">
                                                <table className="table table-borderless align-middle mb-0">
                                                    <thead className="small text-muted text-uppercase">
                                                        <tr>
                                                            <th className="ps-3">Componente</th>
                                                            <th style={{width: '120px'}} className="text-end">Precio Extra</th>
                                                            <th style={{width: '40px'}}></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {editingGroup.options.length === 0 && (
                                                            <tr>
                                                                <td colSpan={3} className="text-center py-4 text-muted">
                                                                    Agrega componentes usando el botón de arriba.
                                                                </td>
                                                            </tr>
                                                        )}
                                                        {editingGroup.options.map((opt, idx) => {
                                                            const itemDef = items.find(i => i.id === opt.itemId);
                                                            return (
                                                                <tr key={opt.id} className="border-top">
                                                                    <td className="ps-3 fw-medium text-dark">{itemDef?.name || '(Item Eliminado)'}</td>
                                                                    <td className="text-end">
                                                                         <div className="input-group input-group-sm">
                                                                            <span className="input-group-text border-0 bg-transparent pe-1 text-muted">+</span>
                                                                            <input 
                                                                                type="number" 
                                                                                className="form-control form-control-sm border-0 text-end shadow-none px-0 bg-transparent"
                                                                                style={{maxWidth: '60px'}}
                                                                                value={opt.price} 
                                                                                onChange={(e) => {
                                                                                    const newOptions = [...editingGroup.options];
                                                                                    newOptions[idx].price = parseFloat(e.target.value) || 0;
                                                                                    setEditingGroup({...editingGroup, options: newOptions});
                                                                                }}
                                                                            />
                                                                         </div>
                                                                    </td>
                                                                    <td>
                                                                        <button className="btn btn-link text-danger p-0" onClick={() => {
                                                                            const newOptions = [...editingGroup.options];
                                                                            newOptions.splice(idx, 1);
                                                                            setEditingGroup({...editingGroup, options: newOptions});
                                                                        }}>
                                                                            <i className="bi bi-x-lg"></i>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
