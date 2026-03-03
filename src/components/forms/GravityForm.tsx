'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface GravityFormProps {
  formId: number | string;
  className?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

/**
 * GravityForm component - Embeds a Gravity Form from WordPress
 *
 * This component fetches and renders a Gravity Form using the WordPress REST API.
 * It requires the Gravity Forms REST API to be enabled in WordPress.
 *
 * @param formId - The ID of the Gravity Form to embed
 * @param className - Optional CSS classes
 * @param onSuccess - Callback when form is successfully submitted
 * @param onError - Callback when form submission fails
 */
export function GravityForm({ formId, className, onSuccess, onError }: GravityFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadForm = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch form from WordPress Gravity Forms API
        const response = await fetch(`/api/gravity-forms/${formId}`);

        if (!response.ok) {
          throw new Error(`Failed to load form: ${response.statusText}`);
        }

        const data = await response.json();

        if (containerRef.current && data.html) {
          containerRef.current.innerHTML = data.html;

          // Re-initialize any scripts that the form needs
          const scripts = containerRef.current.querySelectorAll('script');
          scripts.forEach((script) => {
            const newScript = document.createElement('script');
            Array.from(script.attributes).forEach((attr) => {
              newScript.setAttribute(attr.name, attr.value);
            });
            newScript.appendChild(document.createTextNode(script.innerHTML));
            script.parentNode?.replaceChild(newScript, script);
          });

          // Listen for form submission events
          if (typeof window !== 'undefined' && (window as any).gform) {
            (window as any).gform.addAction('gform_confirmation_loaded', (formIdNum: number) => {
              if (formIdNum === parseInt(formId.toString())) {
                onSuccess?.();
              }
            });
          }
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load form';
        setError(errorMessage);
        onError?.(err instanceof Error ? err : new Error(errorMessage));
      } finally {
        setIsLoading(false);
      }
    };

    loadForm();
  }, [formId, onSuccess, onError]);

  if (isLoading) {
    return (
      <div className={cn('flex items-center justify-center py-12', className)}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-gold"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('text-center py-12', className)}>
        <p className="text-red-600 mb-4">{error}</p>
        <p className="text-gray-600 text-sm">
          Please check that the form ID is correct and the Gravity Forms REST API is enabled.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn('gravity-form-container', className)}
    />
  );
}
