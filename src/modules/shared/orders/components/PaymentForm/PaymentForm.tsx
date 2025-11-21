import { useState } from 'react';

interface PaymentFormProps {
    onSubmit: (paymentData: { type: 'credit_card' | 'cash'; cardLast4?: string }) => void;
}

export const PaymentForm = ({ onSubmit }: PaymentFormProps) => {
    const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'cash'>('credit_card');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 16) value = value.slice(0, 16);
        setCardNumber(value);

        // Notify parent of changes (simplified for this demo)
        if (value.length === 16) {
            onSubmit({
                type: 'credit_card',
                cardLast4: value.slice(-4)
            });
        }
    };

    const handleMethodChange = (method: 'credit_card' | 'cash') => {
        setPaymentMethod(method);
        onSubmit({ type: method });
    };

    return (
        <div className="payment-form">
            <h5 className="mb-3 fw-bold">Método de Pago</h5>

            <div className="btn-group w-100 mb-4" role="group">
                <input
                    type="radio"
                    className="btn-check"
                    name="paymentMethod"
                    id="card"
                    autoComplete="off"
                    checked={paymentMethod === 'credit_card'}
                    onChange={() => handleMethodChange('credit_card')}
                />
                <label className="btn btn-outline-primary" htmlFor="card">
                    <i className="bi bi-credit-card me-2"></i>Tarjeta
                </label>

                <input
                    type="radio"
                    className="btn-check"
                    name="paymentMethod"
                    id="cash"
                    autoComplete="off"
                    checked={paymentMethod === 'cash'}
                    onChange={() => handleMethodChange('cash')}
                />
                <label className="btn btn-outline-primary" htmlFor="cash">
                    <i className="bi bi-cash-coin me-2"></i>Efectivo
                </label>
            </div>

            {paymentMethod === 'credit_card' && (
                <div className="card-details fade-in">
                    <div className="mb-3">
                        <label className="form-label small text-muted">Número de Tarjeta</label>
                        <div className="input-group">
                            <span className="input-group-text bg-white border-end-0">
                                <i className="bi bi-credit-card-2-front"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control border-start-0 ps-0"
                                placeholder="0000 0000 0000 0000"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6">
                            <div className="mb-3">
                                <label className="form-label small text-muted">Expiración</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="MM/YY"
                                    maxLength={5}
                                    value={expiry}
                                    onChange={(e) => setExpiry(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="mb-3">
                                <label className="form-label small text-muted">CVC</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="123"
                                    maxLength={3}
                                    value={cvc}
                                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {paymentMethod === 'cash' && (
                <div className="alert alert-info fade-in">
                    <i className="bi bi-info-circle me-2"></i>
                    Pagarás en efectivo al momento de la entrega.
                </div>
            )}
        </div>
    );
};
