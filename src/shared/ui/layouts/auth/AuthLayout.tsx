import { Outlet, Link } from 'react-router-dom';
import './AuthLayout.css';

export const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <div className="auth-background"></div>
      <div className="auth-overlay"></div>
      
      <div className="auth-content container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-12 col-md-8 col-lg-5">
            <div className="text-center mb-4 animate-fade-down">
              <Link to="/" className="text-decoration-none">
                <h1 className="auth-brand">YummyApp</h1>
              </Link>
              <p className="auth-tagline">Sabor extraordinario en cada bocado</p>
            </div>
            
            <div className="auth-card animate-fade-up">
              <Outlet />
            </div>
            
            <div className="text-center mt-4 animate-fade-in">
              <p className="text-white-50 small">
                &copy; {new Date().getFullYear()} YummyApp. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

