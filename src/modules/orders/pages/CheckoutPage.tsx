import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../cart/context/CartContext';
import { useOrder } from '../hooks/useOrder';
import { PaymentForm } from '../components/PaymentForm/PaymentForm';
import './CheckoutPage.css';

export const CheckoutPage = () => {
    const navigate = useNavigate();
    const { items, totalAmount, clearCart } = useCart();
    const { createOrder, loadingState, orderId } = useOrder();

    const [address, setAddress] = useState({
        street: '',
        city: '',
        zipCode: '',
        instructions: ''
    });

    const [paymentData, setPaymentData] = useState<{ type: 'credit_card' | 'cash'; cardLast4?: string }>({
        type: 'credit_card'
    });

    useEffect(() => {
        if (items.length === 0 && !orderId) {
            navigate('/restaurants');
        }
    }, [items, navigate, orderId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const order = await createOrder({
            items,
            totalAmount,
            deliveryAddress: address,
            paymentMethod: paymentData
        });

        if (order) {
            clearCart();
        }
    };

    if (orderId) {
        return (
            <div className="container py-5 text-center fade-in">
                <div className="card border-0 shadow-sm mx-auto" style={{ maxWidth: '500px' }}>
                    <div className="card-body p-5">
                        <div className="mb-4 text-success">
                            <i className="bi bi-check-circle-fill display-1"></i>
                        </div>
                        <h2 className="fw-bold mb-3">¡Orden Confirmada!</h2>
                        <p className="text-muted mb-4">
                            Tu orden <span className="fw-bold text-dark">#{orderId}</span> ha sido recibida exitosamente.
                        </p>
                        <button
                            className="btn btn-primary rounded-pill px-4"
                            onClick={() => navigate('/restaurants')}
                        >
                            Volver a Restaurantes
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5 fade-in">
            <h2 className="fw-bold mb-4">Finalizar Pedido</h2>

            <div className="row g-5">
                {/* Form Column */}
                <div className="col-lg-7">
                    <form onSubmit={handleSubmit}>
                        {/* Address Section */}
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body p-4">
                                <h5 className="mb-3 fw-bold">Dirección de Entrega</h5>
                                <div className="mb-3">
                                    <label className="form-label small text-muted">Calle y Número</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        value={address.street}
                                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label small text-muted">Ciudad</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                required
                                                value={address.city}
                                                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label small text-muted">Código Postal</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                required
                                                value={address.zipCode}
                                                onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label small text-muted">Instrucciones de Entrega (Opcional)</label>
                                    <textarea
                                        className="form-control"
                                        rows={2}
                                        value={address.instructions}
                                        onChange={(e) => setAddress({ ...address, instructions: e.target.value })}
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Payment Section */}
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body p-4">
                                <PaymentForm onSubmit={setPaymentData} />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100 py-3 fw-bold rounded-pill shadow-sm"
                            disabled={loadingState === 'loading'}
                        >
                            {loadingState === 'loading' ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Procesando...
                                </>
                            ) : (
                                `Pagar $${totalAmount.toFixed(2)}`
                            )}
                        </button>
                    </form>
                </div>

                {/* Order Summary Column */}
                <div className="col-lg-5">
                    <div className="card border-0 shadow-sm bg-light sticky-top" style={{ top: '2rem' }}>
                        <div className="card-body p-4">
                            <h5 className="mb-4 fw-bold">Resumen del Pedido</h5>

                            <div className="order-items mb-4" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                {items.map((item) => (
                                    <div key={item.product.id} className="d-flex justify-content-between mb-3">
                                        <div>
                                            <span className="fw-bold me-2">{item.quantity}x</span>
                                            <span>{item.product.name}</span>
                                        </div>
                                        <span className="text-muted">${(item.product.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-top pt-3">
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Subtotal</span>
                                    <span>${totalAmount.toFixed(2)}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Envío</span>
                                    <span className="text-success">Gratis</span>
                                </div>
                                <div className="d-flex justify-content-between mt-3 pt-3 border-top">
                                    <span className="h5 fw-bold">Total</span>
                                    <span className="h5 fw-bold text-primary">${totalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
