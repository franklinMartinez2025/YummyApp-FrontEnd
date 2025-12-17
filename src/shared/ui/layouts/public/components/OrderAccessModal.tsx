import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../../context/useAuthContext';
import './OrderAccessModal.css';

interface OrderAccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const OrderAccessModal: React.FC<OrderAccessModalProps> = ({ isOpen, onClose }) => {
    const { isAuthenticated, user } = useAuthContext();
    const navigate = useNavigate();
    const [orderId, setOrderId] = useState('');

    if (!isOpen) return null;

    const handleTrackOrder = (e: React.FormEvent) => {
        e.preventDefault();
        if (orderId.trim()) {
            // Navigate to tracking page (assuming query param or route)
            navigate(`/orders?track=${orderId}`); 
            onClose();
        }
    };

    const handleViewHistory = () => {
        navigate('/orders');
        onClose();
    };

    const handleLogin = () => { 
        navigate('/auth/login');
        onClose();
    };

    return (
        <div className="order-modal-overlay" onClick={onClose}>
            <div className="order-modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    <i className="bi bi-x-lg"></i>
                </button>

                <div className="order-modal-header">
                    <div className="order-modal-icon-wrapper">
                        <i className="bi bi-box-seam-fill"></i>
                    </div>
                    <h3 className="order-modal-title">
                        {isAuthenticated ? `Hola, ${user?.fullName?.split(' ')[0]}` : 'Rastrea tu Pedido'}
                    </h3>
                    <p className="order-modal-subtitle">
                        {isAuthenticated 
                            ? 'Estás a un clic de tu deliciosa comida.' 
                            : 'Ingresa el código de tu pedido para ver dónde está.'}
                    </p>
                </div>

                <div className="order-modal-body">
                    {isAuthenticated ? (
                        <div className="d-flex flex-column gap-3">
                            {/* User Logged In View */}
                            <div className="p-3 bg-light rounded-3 border d-flex align-items-center gap-3">
                                <div className="bg-white p-2 rounded-circle shadow-sm">
                                    <i className="bi bi-clock-history text-primary"></i>
                                </div>
                                <div>
                                    <h6 className="mb-0 fw-bold">Historial Reciente</h6>
                                    <small className="text-muted">Revisa tus últimos antojos</small>
                                </div>
                                <i className="bi bi-chevron-right ms-auto text-muted"></i>
                            </div>

                            <button className="btn-track-order" onClick={handleViewHistory}>
                                Ver Mis Pedidos <i className="bi bi-arrow-right"></i>
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleTrackOrder}>
                            {/* Guest View */}
                            <div className="order-input-group">
                                <input 
                                    type="text" 
                                    className="order-input" 
                                    placeholder="Ej. ORD-12345" 
                                    value={orderId}
                                    onChange={e => setOrderId(e.target.value)}
                                    autoFocus
                                />
                                <i className="bi bi-upc-scan order-input-icon"></i>
                            </div>

                            <button type="submit" className="btn-track-order mb-3">
                                Rastrear Ahora
                            </button>

                            <div className="text-center">
                                <span className="text-muted small">¿Tienes una cuenta? </span>
                                <button 
                                    type="button" 
                                    className="btn btn-link p-0 text-decoration-none fw-bold"
                                    onClick={handleLogin}
                                >
                                    Inicia Sesión
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
