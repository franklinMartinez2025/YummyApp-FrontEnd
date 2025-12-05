import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ResetPasswordForm = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const { resetPassword, validateToken, isLoading, error } = useAuth();
    const [isValidatingToken, setIsValidatingToken] = useState(true);
    const [tokenError, setTokenError] = useState<string | null>(null);

    useEffect(() => {
        const checkToken = async () => {
            if (!token) {
                setTokenError('Token no proporcionado.');
                setIsValidatingToken(false);
                return;
            }

            // Opcional: Validar token al cargar la página
            const result = await validateToken(token);
            if (!result || !result.success) {
                setTokenError(result?.error || 'El enlace de recuperación es inválido o ha expirado.');
            }
            setIsValidatingToken(false);
        };

        checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            // Manejamos el error localmente o podríamos usar un estado de error local, 
            // pero useAuth.error es global para el hook. Usaremos alert o un estado simple por ahora
            // O mejor, reutilizamos el error del hook si pudiéramos setearlo, pero como no:
            // Vamos a confiar en la validación de HTML5 o agregar un estado local simple de error de validación
            alert("Las contraseñas no coinciden");
            return;
        }

        if (!token || !email) {
            setTokenError("Datos de recuperación incompletos (token o email faltante).");
            return;
        }

        const result = await resetPassword(email, token, newPassword);

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
                <Link to="/auth/forgot-password" className="btn btn-auth">
                    Solicitar nuevo enlace
                </Link>
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

            <form onSubmit={handleSubmit}>
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
