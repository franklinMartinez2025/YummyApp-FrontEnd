import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useRoles } from '../hooks/useRoles';
import { useAuthContext } from '../../../shared/context/useAuthContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [passError, setPassError] = useState('');

  const { register, login, isLoading, error } = useAuth();
  const { roles, isLoading: isLoadingRoles, error: rolesError } = useRoles();
  const { login: contextLogin } = useAuthContext();
  const navigate = useNavigate();

  // Establecer el primer rol como valor por defecto cuando se carguen los roles
  useEffect(() => {
    if (roles.length > 0 && !role) {
      setRole(roles[0].name);
    }
  }, [roles, role]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');

    if (password !== confirmPassword) {
      setPassError('Las contraseñas no coinciden');
      return;
    }

    const result = await register(email, password, name, phone, role);

    if (result.success) {

      const loginResult = await login(email, password);
      if (loginResult.success && loginResult.user) {
        const token = localStorage.getItem('auth_token') || '';
        const userForContext = {
          id: loginResult.user.email,
          fullName: loginResult.user.fullName,
          email: loginResult.user.email,
          roles: loginResult.user.roles
        };

        contextLogin(userForContext, token);
        navigate('/');
      }
    }
  };

  return (
    <div>
      <h2 className="text-center text-white mb-4 fw-bold">Crear Cuenta</h2>

      {error && (
        <div className="alert alert-danger border-0 bg-danger bg-opacity-25 text-white mb-4" role="alert">
          <i className="bi bi-exclamation-circle me-2"></i> {error}
        </div>
      )}

      {passError && (
        <div className="alert alert-warning border-0 bg-warning bg-opacity-25 text-white mb-4" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i> {passError}
        </div>
      )}

      {rolesError && (
        <div className="alert alert-danger border-0 bg-danger bg-opacity-25 text-white mb-4" role="alert">
          <i className="bi bi-exclamation-circle me-2"></i> {rolesError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingName"
            placeholder="Nombre Completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="floatingName">Nombre Completo</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingEmail"
            placeholder="nombre@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="floatingEmail">Correo Electrónico</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="tel"
            className="form-control"
            id="floatingPhone"
            placeholder="Teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <label htmlFor="floatingPhone">Teléfono</label>
        </div>

        <div className="form-floating mb-3">
          <select
            className="form-select"
            id="floatingRole"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            aria-label="Seleccionar Rol"
            disabled={isLoadingRoles || roles.length === 0}
            required
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white'
            }}
          >
            {isLoadingRoles ? (
              <option>Cargando roles...</option>
            ) : roles.length === 0 ? (
              <option>No hay roles disponibles</option>
            ) : (
              roles.map((roleItem) => (
                <option key={roleItem.id} value={roleItem.name}>
                  {roleItem.name}
                </option>
              ))
            )}
          </select>
          <label htmlFor="floatingRole">Rol</label>
        </div>

        <div className="form-floating mb-3">
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

        <div className="form-floating mb-4">
          <input
            type="password"
            className="form-control"
            id="floatingConfirmPassword"
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label htmlFor="floatingConfirmPassword">Confirmar Contraseña</label>
        </div>

        <div className="form-check mb-4">
          <input className="form-check-input bg-transparent border-white" type="checkbox" id="terms" required />
          <label className="form-check-label text-white-50 small" htmlFor="terms">
            Acepto los <a href="#" className="text-white text-decoration-underline">Términos y Condiciones</a> y la <a href="#" className="text-white text-decoration-underline">Política de Privacidad</a>
          </label>
        </div>

        <button type="submit" className="btn btn-auth" disabled={isLoading}>
          {isLoading ? (
            <span><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Registrando...</span>
          ) : (
            'Registrarse'
          )}
        </button>
      </form>

      <div className="text-center mt-4">
        <p className="text-white-50 mb-0">
          ¿Ya tienes una cuenta? <Link to="/auth/login" className="auth-link">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
