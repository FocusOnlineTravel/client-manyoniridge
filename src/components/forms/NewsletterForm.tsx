'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/forms/Input';

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

interface NewsletterFormProps {
  variant?: 'default' | 'footer';
  className?: string;
}

export function NewsletterForm({ variant = 'default', className }: NewsletterFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    // Simulate API call
    console.log('Newsletter signup:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    reset();

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  if (variant === 'footer') {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-2', className)}>
        {isSubmitted ? (
          <div className="flex items-center gap-2 text-primary-gold text-sm">
            <Check className="w-4 h-4" />
            <span>Thank you for subscribing!</span>
          </div>
        ) : (
          <>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                {...register('email')}
                className={cn(
                  'flex-1 px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-none',
                  'text-white placeholder:text-gray-400',
                  'focus:outline-none focus:border-primary-gold',
                  errors.email && 'border-red-500'
                )}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-3 py-2 bg-primary-gold text-primary-dark hover:bg-primary-gold/90 transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            {errors.email && (
              <p className="text-red-400 text-xs">{errors.email.message}</p>
            )}
          </>
        )}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-4', className)}>
      {isSubmitted ? (
        <div className="flex items-center justify-center gap-2 text-sage-green py-4">
          <Check className="w-5 h-5" />
          <span className="font-medium">Thank you for subscribing!</span>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email address"
              {...register('email')}
              error={errors.email?.message}
              className="flex-1"
            />
            <Button type="submit" isLoading={isSubmitting}>
              Subscribe
            </Button>
          </div>
          <p className="text-gray-medium text-xs text-center sm:text-left">
            By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
          </p>
        </>
      )}
    </form>
  );
}
