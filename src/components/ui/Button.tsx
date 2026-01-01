'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center gap-2',
      'font-heading font-medium',
      'rounded-xl',
      'transition-all duration-200 ease-out',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary',
      'disabled:opacity-50 disabled:cursor-not-allowed'
    );

    const variantStyles = {
      primary: cn(
        'bg-accent-orange text-white',
        'hover:bg-accent-orange-hover hover:shadow-glow-orange',
        'focus-visible:ring-accent-orange',
        'active:scale-[0.98]'
      ),
      secondary: cn(
        'bg-accent-purple text-white',
        'hover:bg-accent-purple-hover hover:shadow-glow-purple',
        'focus-visible:ring-accent-purple',
        'active:scale-[0.98]'
      ),
      ghost: cn(
        'bg-transparent text-accent-orange',
        'border border-accent-purple',
        'hover:bg-accent-purple-muted hover:border-accent-purple-hover',
        'focus-visible:ring-accent-purple',
        'active:scale-[0.98]'
      ),
    };

    const sizeStyles = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <LoadingSpinner size={size} />
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Motion-enhanced button for animations
export const MotionButton = forwardRef<
  HTMLButtonElement,
  ButtonProps & Omit<HTMLMotionProps<'button'>, keyof ButtonProps>
>(({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
  const baseStyles = cn(
    'inline-flex items-center justify-center gap-2',
    'font-heading font-medium',
    'rounded-xl',
    'transition-colors duration-200',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  );

  const variantStyles = {
    primary: cn(
      'bg-accent-orange text-white',
      'hover:bg-accent-orange-hover',
      'focus-visible:ring-accent-orange'
    ),
    secondary: cn(
      'bg-accent-purple text-white',
      'hover:bg-accent-purple-hover',
      'focus-visible:ring-accent-purple'
    ),
    ghost: cn(
      'bg-transparent text-accent-orange',
      'border border-accent-purple',
      'hover:bg-accent-purple-muted',
      'focus-visible:ring-accent-purple'
    ),
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      ref={ref}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...props}
    >
      {isLoading ? <LoadingSpinner size={size} /> : children}
    </motion.button>
  );
});

MotionButton.displayName = 'MotionButton';

// Loading spinner component
function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeMap = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <svg
      className={cn('animate-spin', sizeMap[size])}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export { Button, LoadingSpinner };
export default Button;

