import { forwardRef, useRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, type, ...props }, ref) => {
    const inputId = id || props.name;
    const internalRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref as any) || internalRef;

    // For date inputs, make the entire field clickable to open the picker
    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (type === 'date' && inputRef?.current) {
        // Only trigger if clicking on the container, not the input itself
        if (e.target !== inputRef.current) {
          e.preventDefault();
          inputRef.current.focus();
          inputRef.current.showPicker?.();
        }
      }
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-primary-dark mb-1.5"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div
          onClick={handleContainerClick}
          className={cn(type === 'date' && 'cursor-pointer')}
          suppressHydrationWarning
        >
          <input
            ref={inputRef}
            type={type}
            id={inputId}
            className={cn(
              'w-full px-4 py-3 text-base',
              'bg-white border border-gray-light rounded-none',
              'text-primary-dark placeholder:text-gray-400',
              'transition-colors duration-200',
              'focus:outline-none focus:border-primary-gold focus:ring-1 focus:ring-primary-gold',
              'disabled:bg-gray-light disabled:cursor-not-allowed',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              type === 'date' && 'cursor-pointer',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-gray-medium">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
