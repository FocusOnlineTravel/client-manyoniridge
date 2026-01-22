'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Select } from './Select';

const enquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  arrivalDate: z.string().min(1, 'Arrival date is required'),
  departureDate: z.string().min(1, 'Departure date is required'),
  adults: z.string().min(1, 'Number of adults is required'),
  children: z.string(),
  roomPreference: z.string().optional(),
  specialRequests: z.string().optional(),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

const adultOptions = [
  { value: '1', label: '1 Adult' },
  { value: '2', label: '2 Adults' },
  { value: '3', label: '3 Adults' },
  { value: '4', label: '4 Adults' },
  { value: '5', label: '5+ Adults' },
];

const childrenOptions = [
  { value: '0', label: 'No Children' },
  { value: '1', label: '1 Child' },
  { value: '2', label: '2 Children' },
  { value: '3', label: '3 Children' },
  { value: '4', label: '4+ Children' },
];

const roomOptions = [
  { value: '', label: 'No Preference' },
  { value: 'one-bedroom', label: 'One Bedroom Suite' },
  { value: 'two-bedroom', label: 'Two Bedroom Suite' },
];

interface EnquiryFormProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export function EnquiryForm({ className, variant = 'default' }: EnquiryFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      adults: '2',
      children: '0',
    },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    console.log('Booking enquiry:', data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitted(true);
    reset();
  };

  if (isSubmitted) {
    return (
      <div className={cn('text-center py-8', className)}>
        <div className="inline-flex items-center justify-center w-14 h-14 bg-sage-green/20 rounded-full mb-4">
          <Check className="w-7 h-7 text-sage-green" />
        </div>
        <h3 className="font-heading text-xl font-medium text-primary-dark mb-2">
          Enquiry Received
        </h3>
        <p className="text-gray-medium text-sm mb-4">
          We&apos;ll get back to you within 24 hours with availability and rates.
        </p>
        <Button onClick={() => setIsSubmitted(false)} variant="outline" size="sm">
          Submit Another Enquiry
        </Button>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-4', className)}>
        <Input
          label="Full Name"
          placeholder="Your name"
          {...register('name')}
          error={errors.name?.message}
          required
        />
        <Input
          type="email"
          label="Email"
          placeholder="your@email.com"
          {...register('email')}
          error={errors.email?.message}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="date"
            label="Arrival"
            {...register('arrivalDate')}
            error={errors.arrivalDate?.message}
            required
          />
          <Input
            type="date"
            label="Departure"
            {...register('departureDate')}
            error={errors.departureDate?.message}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Adults"
            options={adultOptions}
            {...register('adults')}
            error={errors.adults?.message}
            required
          />
          <Select
            label="Children"
            options={childrenOptions}
            {...register('children')}
          />
        </div>
        <Button type="submit" isLoading={isSubmitting} className="w-full">
          Check Availability
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-6', className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          placeholder="John Doe"
          {...register('name')}
          error={errors.name?.message}
          required
        />
        <Input
          type="email"
          label="Email Address"
          placeholder="john@example.com"
          {...register('email')}
          error={errors.email?.message}
          required
        />
      </div>

      <Input
        type="tel"
        label="Phone Number"
        placeholder="+27 82 123 4567"
        {...register('phone')}
        error={errors.phone?.message}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          type="date"
          label="Arrival Date"
          {...register('arrivalDate')}
          error={errors.arrivalDate?.message}
          required
        />
        <Input
          type="date"
          label="Departure Date"
          {...register('departureDate')}
          error={errors.departureDate?.message}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Select
          label="Adults"
          options={adultOptions}
          {...register('adults')}
          error={errors.adults?.message}
          required
        />
        <Select
          label="Children"
          options={childrenOptions}
          {...register('children')}
        />
        <Select
          label="Room Preference"
          options={roomOptions}
          {...register('roomPreference')}
        />
      </div>

      <Textarea
        label="Special Requests"
        placeholder="Any special requirements or requests?"
        {...register('specialRequests')}
      />

      <Button type="submit" isLoading={isSubmitting} className="w-full md:w-auto">
        Submit Enquiry
      </Button>
    </form>
  );
}
