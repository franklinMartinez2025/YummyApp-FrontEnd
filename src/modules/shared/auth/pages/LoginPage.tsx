import { LoginForm } from '../components/LoginForm';

/** Página principal de inicio de sesión */
const LoginPage = () => {
  return (
    <div>
      <h2 className="text-center text-white mb-4 fw-bold">Bienvenido de nuevo</h2>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
