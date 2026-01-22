import { forwardRef } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, id, ...props }, ref) => {
    const checkboxId = id || props.name;

    return (
      <div className="w-full">
        <label
          htmlFor={checkboxId}
          className={cn(
            'flex items-start gap-3 cursor-pointer group',
            props.disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          <div className="relative flex-shrink-0 mt-0.5">
            <input
              ref={ref}
              type="checkbox"
              id={checkboxId}
              className="peer sr-only"
              {...props}
            />
            <div
              className={cn(
                'w-5 h-5 border-2 border-gray-light',
                'transition-colors duration-200',
                'group-hover:border-primary-gold',
                'peer-focus-visible:ring-2 peer-focus-visible:ring-primary-gold peer-focus-visible:ring-offset-2',
                'peer-checked:bg-primary-gold peer-checked:border-primary-gold',
                error && 'border-red-500'
              )}
            />
            <Check
              className={cn(
                'absolute top-0.5 left-0.5 w-4 h-4 text-white',
                'opacity-0 peer-checked:opacity-100 transition-opacity'
              )}
            />
          </div>
          <span className="text-sm text-gray-medium leading-relaxed">{label}</span>
        </label>
        {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
