import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  message?: string;
  fullHeight?: boolean;
}

export const LoadingSpinner = ({ message, fullHeight = false }: LoadingSpinnerProps) => {
  return (
    <div className={`loading-spinner ${fullHeight ? 'loading-spinner--full' : ''}`}>
      <div className="spinner-border text-primary" role="status" aria-live="polite">
        <span className="visually-hidden">Cargando...</span>
      </div>
      {message && <p className="loading-spinner__message">{message}</p>}
    </div>
  );
};

