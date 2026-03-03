'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Select } from './Select';
import { Checkbox } from './Checkbox';
import { Check } from 'lucide-react';

interface GravityFormField {
  id: number;
  type: string;
  label: string;
  isRequired: boolean;
  placeholder?: string;
  description?: string;
  choices?: Array<{ text: string; value: string }>;
  inputs?: Array<{ id: string; label: string }>;
}

interface GravityFormData {
  id: number;
  title: string;
  description: string;
  fields: GravityFormField[];
  button: {
    text: string;
  };
  confirmations: {
    message?: string;
  };
}

interface GravityFormRendererProps {
  formId: number | string;
  className?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

/**
 * GravityFormRenderer - Renders Gravity Forms using custom React components
 *
 * This fetches the form structure from WordPress but renders it using your
 * own styled components, giving you full control over the appearance.
 */
export function GravityFormRenderer({
  formId,
  className,
  onSuccess,
  onError
}: GravityFormRendererProps) {
  const [formData, setFormData] = useState<GravityFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  // Fetch form structure from WordPress
  useEffect(() => {
    const fetchForm = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/gravity-forms/${formId}/structure`);

        if (!response.ok) {
          throw new Error(`Failed to load form: ${response.statusText}`);
        }

        const data = await response.json();
        setFormData(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load form';
        setError(errorMessage);
        onError?.(err instanceof Error ? err : new Error(errorMessage));
      } finally {
        setIsLoading(false);
      }
    };

    fetchForm();
  }, [formId, onError]);

  // Submit form to WordPress
  const onSubmit = async (data: any) => {
    try {
      const response = await fetch(`/api/gravity-forms/${formId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      const result = await response.json();

      setIsSubmitted(true);
      setConfirmationMessage(
        result.confirmation_message ||
        formData?.confirmations?.message ||
        'Thank you for your submission!'
      );

      reset();
      onSuccess?.(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Submission failed';
      setError(errorMessage);
      onError?.(err instanceof Error ? err : new Error(errorMessage));
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className={cn('flex items-center justify-center py-12', className)}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-gold"></div>
      </div>
    );
  }

  // Error state
  if (error || !formData) {
    return (
      <div className={cn('text-center py-12', className)}>
        <p className="text-red-600 mb-4">{error || 'Form not found'}</p>
        <p className="text-gray-600 text-sm">
          Please check that the form ID is correct and try again.
        </p>
      </div>
    );
  }

  // Success state
  if (isSubmitted) {
    return (
      <div className={cn('text-center py-12', className)}>
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="font-heading text-2xl font-medium text-primary-dark mb-2">
          Message Sent
        </h3>
        <div
          className="text-gray-700 mb-6"
          dangerouslySetInnerHTML={{ __html: confirmationMessage }}
        />
        <Button onClick={() => setIsSubmitted(false)} variant="outline">
          Send Another Message
        </Button>
      </div>
    );
  }

  // Render field based on type
  const renderField = (field: GravityFormField) => {
    const fieldName = `input_${field.id}`;
    const isRequired = field.isRequired;

    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
      case 'number':
        return (
          <Input
            key={field.id}
            type={field.type}
            label={field.label}
            placeholder={field.placeholder}
            {...register(fieldName, {
              required: isRequired ? `${field.label} is required` : false,
            })}
            error={errors[fieldName]?.message as string}
            required={isRequired}
          />
        );

      case 'textarea':
        return (
          <Textarea
            key={field.id}
            label={field.label}
            placeholder={field.placeholder}
            {...register(fieldName, {
              required: isRequired ? `${field.label} is required` : false,
            })}
            error={errors[fieldName]?.message as string}
            required={isRequired}
          />
        );

      case 'select':
        return (
          <Select
            key={field.id}
            label={field.label}
            placeholder={field.placeholder || 'Select...'}
            options={field.choices?.map(choice => ({
              value: choice.value,
              label: choice.text,
            })) || []}
            {...register(fieldName, {
              required: isRequired ? `${field.label} is required` : false,
            })}
            error={errors[fieldName]?.message as string}
            required={isRequired}
          />
        );

      case 'checkbox':
        return (
          <div key={field.id} className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              {field.label}
              {isRequired && <span className="text-red-500 ml-1">*</span>}
            </label>
            {field.choices?.map((choice, index) => (
              <Checkbox
                key={`${field.id}_${index}`}
                label={choice.text}
                {...register(`${fieldName}.${index}`)}
              />
            ))}
            {errors[fieldName] && (
              <p className="text-red-600 text-sm">{errors[fieldName]?.message as string}</p>
            )}
          </div>
        );

      case 'name':
        return (
          <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {field.inputs?.map((input) => (
              <Input
                key={input.id}
                label={input.label}
                {...register(`${fieldName}_${input.id}`, {
                  required: isRequired ? `${input.label} is required` : false,
                })}
                error={errors[`${fieldName}_${input.id}`]?.message as string}
                required={isRequired}
              />
            ))}
          </div>
        );

      case 'date':
        return (
          <Input
            key={field.id}
            type="date"
            label={field.label}
            {...register(fieldName, {
              required: isRequired ? `${field.label} is required` : false,
            })}
            error={errors[fieldName]?.message as string}
            required={isRequired}
          />
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-6', className)}>
      {formData.description && (
        <div className="text-gray-600 mb-6">{formData.description}</div>
      )}

      {formData.fields.map(field => renderField(field))}

      <Button type="submit" isLoading={isSubmitting} className="w-full md:w-auto">
        {formData.button?.text || 'Submit'}
      </Button>
    </form>
  );
}
