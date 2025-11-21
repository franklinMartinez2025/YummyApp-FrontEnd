import { createContext, useContext, useState, type ReactNode } from 'react';
import { AuthModal } from '../components/AuthModal';

interface AuthModalContextType {
    isOpen: boolean;
    view: 'login' | 'register';
    openAuthModal: (view?: 'login' | 'register') => void;
    closeAuthModal: () => void;
    switchView: (view: 'login' | 'register') => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [view, setView] = useState<'login' | 'register'>('login');

    const openAuthModal = (initialView: 'login' | 'register' = 'login') => {
        setView(initialView);
        setIsOpen(true);
    };

    const closeAuthModal = () => {
        setIsOpen(false);
    };

    const switchView = (newView: 'login' | 'register') => {
        setView(newView);
    };

    return (
        <AuthModalContext.Provider value={{ isOpen, view, openAuthModal, closeAuthModal, switchView }}>
            {children}
            <AuthModal />
        </AuthModalContext.Provider>
    );
};

export const useAuthModal = () => {
    const context = useContext(AuthModalContext);
    if (context === undefined) {
        throw new Error('useAuthModal must be used within an AuthModalProvider');
    }
    return context;
};
