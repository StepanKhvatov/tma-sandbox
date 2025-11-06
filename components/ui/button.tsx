'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', isLoading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'btn-telegram',
          'w-full',
          'min-h-[44px]',
          'px-6 py-3',
          'rounded-lg',
          'font-medium',
          'transition-colors',
          'focus:outline-none',
          'focus:ring-2 focus:ring-telegram-primary focus:ring-offset-2',
          variant === 'primary' && 'bg-telegram-primary text-white hover:bg-telegram-primary-hover active:bg-telegram-primary-active disabled:opacity-50 disabled:cursor-not-allowed',
          variant === 'secondary' && 'bg-bg-secondary text-text-primary border border-border-light hover:bg-bg-tertiary active:bg-bg-tertiary disabled:opacity-50 disabled:cursor-not-allowed',
          isLoading && 'opacity-50 cursor-wait',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
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
            <span>Загрузка...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

