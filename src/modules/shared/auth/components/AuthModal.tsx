import { useAuthModal } from '../context/AuthModalContext';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export const AuthModal = () => {
    const { isOpen, closeAuthModal, view, switchView } = useAuthModal();

    if (!isOpen) return null;

    return (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark text-white border-secondary">
                    <div className="modal-header border-secondary">
                        <h5 className="modal-title fw-bold">
                            {view === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
                        </h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={closeAuthModal}
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body p-4">
                        {view === 'login' ? (
                            <LoginForm
                                onSuccess={closeAuthModal}
                                onRegisterClick={() => switchView('register')}
                            />
                        ) : (
                            <RegisterForm
                                onSuccess={closeAuthModal}
                                onLoginClick={() => switchView('login')}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
