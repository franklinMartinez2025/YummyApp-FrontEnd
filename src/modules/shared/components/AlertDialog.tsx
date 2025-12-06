import { useEffect, useState } from 'react';
import '../styles/AlertDialog.css';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    type?: AlertType;
    onConfirm: () => void;
    onCancel?: () => void; // Optional: Only required if we want a cancel button
    confirmText?: string;
    cancelText?: string;
}

export const AlertDialog = ({
    isOpen,
    title,
    message,
    type = 'info',
    onConfirm,
    onCancel,
    confirmText = 'Aceptar',
    cancelText = 'Cancelar'
}: AlertDialogProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case 'success': return <i className="bi bi-check-lg"></i>;
            case 'error': return <i className="bi bi-x-lg"></i>;
            case 'warning': return <i className="bi bi-exclamation-lg"></i>;
            case 'info': return <i className="bi bi-info-lg"></i>;
        }
    };

    return (
        <div className={`alert-overlay ${isOpen ? 'open' : ''} alert-${type}`} onClick={onCancel || onConfirm}>
            <div className="alert-content" onClick={e => e.stopPropagation()}>
                <div className="alert-icon-wrapper animate-bounce">
                    {getIcon()}
                </div>
                
                <h3 className="alert-title">{title}</h3>
                <p className="alert-message">{message}</p>

                <div className="alert-actions">
                    {onCancel && (
                        <button className="alert-btn btn-cancel-alert" onClick={onCancel}>
                            {cancelText}
                        </button>
                    )}
                    <button className="alert-btn btn-confirm" onClick={onConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};
