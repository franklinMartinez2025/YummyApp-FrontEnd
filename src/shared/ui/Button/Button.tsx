import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

const variantClassMap: Record<ButtonVariant, string> = {
  primary: 'btn btn-primary',
  secondary: 'btn btn-secondary',
  outline: 'btn btn-outline-primary',
  danger: 'btn btn-danger',
};

const sizeClassMap: Record<ButtonSize, string> = {
  small: 'btn-sm',
  medium: '',
  large: 'btn-lg',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = ({
  children,
  className = '',
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled,
  leftIcon,
  rightIcon,
  ...rest
}: ButtonProps) => {
  const variantClass = variantClassMap[variant] ?? variantClassMap.primary;
  const sizeClass = sizeClassMap[size] ?? sizeClassMap.medium;
  const composedClassName = [variantClass, sizeClass, className].filter(Boolean).join(' ').trim();

  return (
    <button
      className={composedClassName}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && (
        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
      )}
      {leftIcon && <span className="me-2 d-inline-flex align-items-center">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ms-2 d-inline-flex align-items-center">{rightIcon}</span>}
    </button>
  );
};

