'use client';

import * as React from 'react';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      disabled,
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-stone-900 disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
      primary: 'bg-stone-900 text-stone-50 hover:bg-stone-800 active:bg-stone-950',
      secondary: 'bg-stone-100 text-stone-900 hover:bg-stone-200 active:bg-stone-300 border border-stone-200',
      outline: 'border border-stone-300 text-stone-900 hover:bg-stone-50 active:bg-stone-100',
      ghost: 'text-stone-900 hover:bg-stone-100 active:bg-stone-200',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm gap-2',
      md: 'px-6 py-3 text-base gap-2',
      lg: 'px-8 py-4 text-lg gap-3',
    };

    if (asChild) {
      const child = React.Children.only(children) as React.ReactElement<{ [key: string]: unknown }>;
      // Merge props onto the child element
      const mergedProps = {
        ...props,
        className: cn(baseStyles, variants[variant], sizes[size], fullWidth && 'w-full', className, (child.props.className as string) ?? ''),
        disabled: disabled || loading,
      };
      // For accessibility, if the child is not a button, we might want to adjust role, but we'll assume it's appropriate.
      // We'll also need to handle ref? We'll ignore for now.
      return React.cloneElement(child, mergedProps);
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], fullWidth && 'w-full', className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
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
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';