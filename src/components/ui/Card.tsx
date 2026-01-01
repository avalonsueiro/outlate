'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'gradient-border';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      padding = 'md',
      hoverable = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'rounded-2xl';

    const variantStyles = {
      default: cn(
        'bg-background-secondary',
        'border border-border-subtle'
      ),
      elevated: cn(
        'bg-background-secondary',
        'border border-border-subtle',
        'shadow-lg shadow-black/20'
      ),
      'gradient-border': cn(
        'relative bg-background-secondary',
        'before:absolute before:inset-0 before:-z-10',
        'before:rounded-2xl before:p-[1px]',
        'before:bg-gradient-to-br before:from-accent-purple before:to-accent-orange'
      ),
    };

    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const hoverStyles = hoverable
      ? 'transition-all duration-200 hover:border-border-default hover:shadow-lg hover:shadow-accent-purple/10 cursor-pointer'
      : '';

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          paddingStyles[padding],
          hoverStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Motion-enhanced card for animations
export const MotionCard = forwardRef<
  HTMLDivElement,
  CardProps & Omit<HTMLMotionProps<'div'>, keyof CardProps>
>(
  (
    {
      className,
      variant = 'default',
      padding = 'md',
      hoverable = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'rounded-2xl';

    const variantStyles = {
      default: cn('bg-background-secondary', 'border border-border-subtle'),
      elevated: cn(
        'bg-background-secondary',
        'border border-border-subtle',
        'shadow-lg shadow-black/20'
      ),
      'gradient-border': cn(
        'relative bg-background-secondary',
        'before:absolute before:inset-0 before:-z-10',
        'before:rounded-2xl before:p-[1px]',
        'before:bg-gradient-to-br before:from-accent-purple before:to-accent-orange'
      ),
    };

    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          paddingStyles[padding],
          hoverable && 'cursor-pointer',
          className
        )}
        whileHover={hoverable ? { scale: 1.02, y: -2 } : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

MotionCard.displayName = 'MotionCard';

// Card Header component
export const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

// Card Title component
export const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('font-heading text-xl font-semibold text-text-primary', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

// Card Description component
export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-text-secondary', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

// Card Content component
export const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props} />
));
CardContent.displayName = 'CardContent';

// Card Footer component
export const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-4', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export { Card };
export default Card;

