import React from 'react';
import '../styles/RoleSelection.css';

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
        if (normalizedRole.includes('repartidor')) return 'bi-truck';
        if (normalizedRole.includes('cliente')) return 'bi-person';
        return 'bi-person-badge';
    };

    /** Obtiene una descripción breve para el rol */
    const getRoleDescription = (role: string) => {
        const normalizedRole = role.toLowerCase();
        if (normalizedRole.includes('admin')) return 'Gestión total del sistema';
        if (normalizedRole.includes('restaurante')) return 'Administra tu negocio';
        if (normalizedRole.includes('repartidor')) return 'Realiza entregas';
        if (normalizedRole.includes('cliente')) return 'Realiza pedidos y disfruta';
        return 'Acceso a tu perfil';
    };

    /** Formatea el nombre del rol para mostrarlo */
    const getRoleLabel = (role: string) => {
        // Capitalize first letter
        return role.charAt(0).toUpperCase() + role.slice(1);
    };

    return (
        <div className="role-selection-container text-center animate-fade-in">
            <div className="role-selection-header">
                <div className="role-selection-icon-wrapper">
                    <i className="bi bi-person-bounding-box"></i>
                </div>
                <h4 className="text-white fw-bold mb-2">Selecciona tu perfil</h4>
                <p className="text-white-50 small">
                    Hemos detectado múltiples roles asociados a tu cuenta. <br/>
                    ¿Cómo deseas ingresar hoy?
                </p>
            </div>

            <div className="d-grid gap-3">
                {roles.map((role, index) => (
                    <button
                        key={role}
                        onClick={() => onSelect(role)}
                        className="role-card-btn role-item-animate"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="role-card-content">
                            <div className="role-icon-box">
                                <i className={`bi ${getRoleIcon(role)}`}></i>
                            </div>
                            <div className="role-info">
                                <span className="role-name">{getRoleLabel(role)}</span>
                                <span className="role-desc">{getRoleDescription(role)}</span>
                            </div>
                        </div>
                        <div className="role-arrow">
                            <i className="bi bi-chevron-right"></i>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

