import React from 'react';

interface RoleSelectionProps {
    roles: string[];
    onSelect: (role: string) => void;
}

/** Componente para seleccionar un rol cuando el usuario tiene múltiples roles asignados */
export const RoleSelection: React.FC<RoleSelectionProps> = ({ roles, onSelect }) => {
    
    /** Obtiene el icono correspondiente al rol */
    const getRoleIcon = (role: string) => {
        const normalizedRole = role.toLowerCase();
        if (normalizedRole.includes('admin')) return 'bi-shield-lock';
        if (normalizedRole.includes('restaurante')) return 'bi-shop';
        if (normalizedRole.includes('cliente')) return 'bi-person';
        return 'bi-person-badge';
    };

    /** Formatea el nombre del rol para mostrarlo */
    const getRoleLabel = (role: string) => {
        // Capitalize first letter
        return role.charAt(0).toUpperCase() + role.slice(1);
    };

    return (
        <div className="role-selection-container text-center animate__animated animate__fadeIn">
            <div className="mb-4">
                <div className="icon-circle bg-primary bg-opacity-10 text-primary mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', borderRadius: '50%' }}>
                    <i className="bi bi-person-bounding-box fs-2"></i>
                </div>
                <h4 className="text-white fw-bold mb-2">Selecciona tu perfil</h4>
                <p className="text-white-50 small">
                    Hemos detectado múltiples roles asociados a tu cuenta. <br/>
                    ¿Cómo deseas ingresar hoy?
                </p>
            </div>

            <div className="d-grid gap-3">
                {roles.map((role) => (
                    <button
                        key={role}
                        onClick={() => onSelect(role)}
                        className="btn btn-outline-light p-3 d-flex align-items-center justify-content-between hover-scale"
                        style={{ border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.05)' }}
                    >
                        <div className="d-flex align-items-center gap-3">
                            <div className="rounded-circle bg-dark d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                <i className={`bi ${getRoleIcon(role)} text-primary`}></i>
                            </div>
                            <span className="fw-medium">{getRoleLabel(role)}</span>
                        </div>
                        <i className="bi bi-chevron-right text-white-50"></i>
                    </button>
                ))}
            </div>
        </div>
    );
};
