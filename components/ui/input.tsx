'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-text-primary mb-2 text-sm font-medium"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'input w-full',
            'bg-bg-primary',
            'border border-border-light',
            'rounded-lg',
            'px-4 py-3',
            'text-text-primary',
            'placeholder:text-text-tertiary',
            'min-h-[44px]',
            'transition-colors',
            'focus:outline-none',
            'focus:border-telegram-primary',
            'focus:ring-2 focus:ring-telegram-primary focus:ring-opacity-20',
            error && 'border-error focus:border-error focus:ring-error',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-error">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

