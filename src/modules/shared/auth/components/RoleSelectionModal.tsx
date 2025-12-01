import React from 'react';
import { RoleSelection } from './RoleSelection';

interface RoleSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    roles: string[];
    onSelect: (role: string) => void;
}

/** Modal que envuelve el componente de selección de roles */
export const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({ isOpen, onClose, roles, onSelect }) => {
    if (!isOpen) return null;

    return (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1055 }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark text-white border-secondary">
                    <div className="modal-header border-secondary">
                        <h5 className="modal-title fw-bold">Cambiar Rol</h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={onClose}
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body p-4">
                        <RoleSelection roles={roles} onSelect={onSelect} />
                    </div>
                </div>
            </div>
        </div>
    );
};
