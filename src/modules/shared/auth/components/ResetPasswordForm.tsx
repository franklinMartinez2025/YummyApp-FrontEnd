import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ResetPasswordForm = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    
    // Obtener valores de la URL (flujo normal por correo)
    const urlToken = searchParams.get('token');
    const urlEmail = searchParams.get('email');
    
    // Obtener email del estado de la navegación (flujo manual desde ForgotPassword)
    const stateEmail = location.state?.email || '';

    const [manualToken, setManualToken] = useState('');
    const [manualEmail, setManualEmail] = useState(stateEmail);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const { resetPassword, validateToken, isLoading, error } = useAuth();
    const [isValidatingToken, setIsValidatingToken] = useState(false); // Iniciamos en false por defecto
    const [tokenError, setTokenError] = useState<string | null>(null);

    // Determinar si debemos mostrar los campos manuales
    const showManualInputs = !urlToken || !urlEmail;

    useEffect(() => {
        const checkToken = async () => {
            if (urlToken) {
                setIsValidatingToken(true);
                // Validar token automáticamente si viene en la URL
                const result = await validateToken(urlToken);
                if (!result || !result.success) {
                    setTokenError(result?.error || 'El enlace de recuperación es inválido o ha expirado.');
                }
                setIsValidatingToken(false);
            }
        };

        checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlToken]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        const finalToken = urlToken || manualToken;
        const finalEmail = urlEmail || manualEmail;

        if (!finalToken || !finalEmail) {
            setTokenError("Es necesario proporcionar el token y el correo electrónico.");
            return;
        }

        const result = await resetPassword(finalEmail, finalToken, newPassword);

        if (result && result.success) {
            setSuccessMessage(result.message || 'Contraseña restablecida correctamente.');
            setTimeout(() => {
                navigate('/auth/login');
            }, 3000);
        }
    };

    if (isValidatingToken) {
        return (
            <div className="text-center text-white py-5">
                <div className="spinner-border text-light mb-3" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p>Verificando enlace...</p>
            </div>
        );
    }

    if (tokenError) {
        return (
            <div className="text-center">
                <div className="alert alert-danger border-0 bg-danger bg-opacity-25 text-white mb-4" role="alert">
                    <i className="bi bi-x-circle me-2"></i> {tokenError}
                </div>
                <button 
                    onClick={() => { setTokenError(null); navigate('/auth/reset-password'); }} 
                    className="btn btn-auth mb-3"
                >
                    Intentar nuevamente
                </button>
                <div className="mt-3">
                    <Link to="/auth/login" className="text-white-50 text-decoration-none small hover-white">
                        Volver al inicio de sesión
                    </Link>
                </div>
            </div>
        );
    }

    if (successMessage) {
        return (
            <div className="text-center">
                <div className="alert alert-success border-0 bg-success bg-opacity-25 text-white mb-4" role="alert">
                    <i className="bi bi-check-circle me-2"></i> {successMessage}
                </div>
                <p className="text-white-50">Serás redirigido al inicio de sesión en unos segundos...</p>
                <Link to="/auth/login" className="btn btn-auth">
                    Ir al Inicio de Sesión
                </Link>
            </div>
        );
    }

    return (
        <div>
            {error && (
                <div className="alert alert-danger border-0 bg-danger bg-opacity-25 text-white mb-4" role="alert">
                    <i className="bi bi-exclamation-circle me-2"></i> {error}
                </div>
            )}

            {/* Mensaje informativo si estamos en modo manual */}
            {showManualInputs && (
                <div className="alert alert-info border-0 bg-info bg-opacity-25 text-white mb-4" role="alert">
                    <i className="bi bi-info-circle me-2"></i> Ingresa el código que recibiste y tu correo.
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {showManualInputs && (
                    <>
                         <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="floatingEmail"
                                placeholder="nombre@ejemplo.com"
                                value={manualEmail}
                                onChange={(e) => setManualEmail(e.target.value)}
                                required
                            />
                            <label htmlFor="floatingEmail">Correo Electrónico</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingToken"
                                placeholder="Código de recuperación"
                                value={manualToken}
                                onChange={(e) => setManualToken(e.target.value)}
                                required
                            />
                            <label htmlFor="floatingToken">Código / Token</label>
                        </div>
                    </>
                )}

                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className="form-control"
                        id="floatingNewPassword"
                        placeholder="Nueva Contraseña"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        minLength={6}
                    />
                    <label htmlFor="floatingNewPassword">Nueva Contraseña</label>
                </div>

                <div className="form-floating mb-4">
                    <input
                        type="password"
                        className="form-control"
                        id="floatingConfirmPassword"
                        placeholder="Confirmar Contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={6}
                    />
                    <label htmlFor="floatingConfirmPassword">Confirmar Contraseña</label>
                </div>

                <button type="submit" className="btn btn-auth w-100 mb-3" disabled={isLoading}>
                    {isLoading ? (
                        <span><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Restableciendo...</span>
                    ) : (
                        'Cambiar Contraseña'
                    )}
                </button>
            </form>
        </div>
    );
};
