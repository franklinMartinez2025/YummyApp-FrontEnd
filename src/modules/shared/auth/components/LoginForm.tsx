import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useAuthContext } from '../../../../shared/context/useAuthContext';

interface LoginFormProps {
    onSuccess?: () => void;
    onRegisterClick?: () => void;
}

export const LoginForm = ({ onSuccess, onRegisterClick }: LoginFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useAuth();
    const { login: contextLogin } = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await login(email, password);

        if (result.success && result.user) {
            const userForContext = {
                id: result.user.email,
                fullName: result.user.fullName,
                email: result.user.email,
                roles: result.user.roles,
                refreshToken: result.refreshToken
            };
            contextLogin(userForContext, result.token);

            if (onSuccess) {
                onSuccess();
            } else {
                // Redirigir según el rol
                const hasAdminRole = result.user.roles?.some((role: string) =>
                    role.toLowerCase().includes('administrador') || role.toLowerCase().includes('admin')
                );
                const hasRestaurantRole = result.user.roles?.some((role: string) =>
                    role.toLowerCase().includes('restaurante') || role.toLowerCase().includes('restaurant')
                );

                if (hasAdminRole) {
                    navigate('/admin/dashboard');
                } else if (hasRestaurantRole) {
                    navigate('/restaurant/dashboard');
                } else {
                    navigate('/');
                }
            }
        }
    };

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

                <div className="form-floating mb-4">
                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="floatingPassword">Contraseña</label>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                        <input className="form-check-input bg-transparent border-white" type="checkbox" id="rememberMe" />
                        <label className="form-check-label text-white-50" htmlFor="rememberMe">
                            Recordarme
                        </label>
                    </div>
                    <Link to="/auth/forgot-password" className="text-white-50 text-decoration-none small hover-white">
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>

                <button type="submit" className="btn btn-auth w-100" disabled={isLoading}>
                    {isLoading ? (
                        <span><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Iniciando...</span>
                    ) : (
                        'Iniciar Sesión'
                    )}
                </button>
            </form>

            <div className="auth-divider">
                <span>O continúa con</span>
            </div>

            <div className="d-flex gap-3 justify-content-center mb-4">
                <button className="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                    <i className="bi bi-google text-danger"></i>
                </button>
                <button className="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                    <i className="bi bi-facebook text-primary"></i>
                </button>
                <button className="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                    <i className="bi bi-apple text-dark"></i>
                </button>
            </div>

            <div className="text-center">
                <p className="text-white-50 mb-0">
                    ¿No tienes una cuenta?{' '}
                    {onRegisterClick ? (
                        <button
                            onClick={onRegisterClick}
                            className="btn btn-link p-0 text-decoration-none auth-link"
                            style={{ verticalAlign: 'baseline' }}
                        >
                            Regístrate
                        </button>
                    ) : (
                        <Link to="/auth/register" className="auth-link">Regístrate</Link>
                    )}
                </p>
            </div>
        </div>
    );
};
