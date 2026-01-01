'use client';

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, useState } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    const inputStyles = cn(
      'flex w-full',
      'bg-background-tertiary',
      'border border-border-subtle',
      'rounded-xl',
      'px-4 py-3',
      'text-text-primary text-base',
      'placeholder:text-text-muted',
      'transition-all duration-200',
      'focus:outline-none focus:border-accent-orange focus:ring-1 focus:ring-accent-orange',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      error && 'border-error focus:border-error focus:ring-error',
      leftIcon && 'pl-11',
      (rightIcon || isPassword) && 'pr-11'
    );

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="label text-text-secondary">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            type={isPassword && showPassword ? 'text' : type}
            className={cn(inputStyles, className)}
            disabled={disabled}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
          {rightIcon && !isPassword && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm text-error">{error}</p>
        )}
        {hint && !error && (
          <p className="text-sm text-text-muted">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Textarea component
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, disabled, ...props }, ref) => {
    const textareaStyles = cn(
      'flex w-full min-h-[100px]',
      'bg-background-tertiary',
      'border border-border-subtle',
      'rounded-xl',
      'px-4 py-3',
      'text-text-primary text-base',
      'placeholder:text-text-muted',
      'transition-all duration-200',
      'focus:outline-none focus:border-accent-orange focus:ring-1 focus:ring-accent-orange',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'resize-none',
      error && 'border-error focus:border-error focus:ring-error'
    );

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="label text-text-secondary">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(textareaStyles, className)}
          disabled={disabled}
          {...props}
        />
        {error && (
          <p className="text-sm text-error">{error}</p>
        )}
        {hint && !error && (
          <p className="text-sm text-text-muted">{hint}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Input };
export default Input;

