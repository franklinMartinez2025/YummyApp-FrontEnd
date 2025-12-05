import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const { forgotPassword, isLoading, error } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage(null);
        
        const result = await forgotPassword(email);
        
        if (result && result.success) {
            setSuccessMessage(result.message || 'Se ha enviado un enlace de recuperación a tu correo.');
            setEmail('');
        }
    };

    return (
        <div>
            {error && (
                <div className="alert alert-danger border-0 bg-danger bg-opacity-25 text-white mb-4" role="alert">
                    <i className="bi bi-exclamation-circle me-2"></i> {error}
                </div>
            )}

            {successMessage && (
                <div className="alert alert-success border-0 bg-success bg-opacity-25 text-white mb-4" role="alert">
                    <i className="bi bi-check-circle me-2"></i> {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="text-center mb-4">
                    <p className="text-white-50">
                        Ingresa tu correo electrónico y te enviaremos las instrucciones para restablecer tu contraseña.
                    </p>
                </div>

                <div className="form-floating mb-4">
                    <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="nombre@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="floatingInput">Correo Electrónico</label>
                </div>

                <button type="submit" className="btn btn-auth w-100 mb-3" disabled={isLoading}>
                    {isLoading ? (
                        <span><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Enviando...</span>
                    ) : (
                        'Enviar Instrucciones'
                    )}
                </button>

                <div className="text-center">
                    <Link to="/auth/login" className="text-white-50 text-decoration-none small hover-white">
                        <i className="bi bi-arrow-left me-2"></i>Volver al inicio de sesión
                    </Link>
                </div>
            </form>
        </div>
    );
};
