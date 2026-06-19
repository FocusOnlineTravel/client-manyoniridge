'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { analytics } from '@/lib/analytics';
import { Button } from '@/components/ui/Button';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Select } from './Select';

const enquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  nationality: z.string().min(1, 'Nationality is required'),
  arrivalDate: z.string().min(1, 'Arrival date is required'),
  departureDate: z.string().min(1, 'Departure date is required'),
  adults: z.string().min(1, 'Number of adults is required'),
  children: z.string(),
  roomPreference: z.string().optional(),
  referralSource: z.string().optional(),
  specialRequests: z.string().optional(),
}).refine(
  (data) => {
    if (!data.arrivalDate || !data.departureDate) return true;
    const arrival = new Date(data.arrivalDate);
    const departure = new Date(data.departureDate);
    return departure > arrival;
  },
  {
    message: 'Departure date must be after arrival date',
    path: ['departureDate'],
  }
);

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

const nationalityOptions = [
  { value: 'South African', label: 'South African' },
  { value: 'American', label: 'American' },
  { value: 'British', label: 'British' },
  { value: 'Australian', label: 'Australian' },
  { value: 'Canadian', label: 'Canadian' },
  { value: 'German', label: 'German' },
  { value: 'French', label: 'French' },
  { value: 'Italian', label: 'Italian' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'Dutch', label: 'Dutch' },
  { value: 'Swiss', label: 'Swiss' },
  { value: 'Belgian', label: 'Belgian' },
  { value: 'Irish', label: 'Irish' },
  { value: 'New Zealand', label: 'New Zealand' },
  { value: 'Indian', label: 'Indian' },
  { value: 'Chinese', label: 'Chinese' },
  { value: 'Japanese', label: 'Japanese' },
  { value: 'Brazilian', label: 'Brazilian' },
  { value: 'Argentine', label: 'Argentine' },
  { value: 'Other', label: 'Other' },
];

const referralSourceOptions = [
  { value: '', label: 'Select...' },
  { value: 'google', label: 'Google Search' },
  { value: 'social-media', label: 'Social Media' },
  { value: 'travel-agent', label: 'Travel Agent' },
  { value: 'friend-family', label: 'Friend or Family' },
  { value: 'previous-guest', label: 'Previous Guest' },
  { value: 'magazine', label: 'Magazine or Publication' },
  { value: 'website', label: 'Travel Website' },
  { value: 'other', label: 'Other' },
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
    watch,
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      adults: '2',
      children: '0',
    },
  });

  const arrivalDate = watch('arrivalDate');

  // Calculate minimum departure date (1 day after arrival)
  const getMinDepartureDate = () => {
    if (!arrivalDate) return undefined;
    const arrival = new Date(arrivalDate);
    arrival.setDate(arrival.getDate() + 1);
    return arrival.toISOString().split('T')[0];
  };

  const onSubmit = async (data: EnquiryFormData) => {
    console.log('Booking enquiry:', data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    analytics.formSubmit('enquiry_form', {
      form_variant: variant,
      referral_source: data.referralSource || undefined,
      nationality: data.nationality,
    });
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
        <Select
          label="Nationality"
          placeholder="Select your nationality"
          options={nationalityOptions}
          {...register('nationality')}
          error={errors.nationality?.message}
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
            min={getMinDepartureDate()}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          type="tel"
          label="Phone Number"
          placeholder="+27 82 123 4567"
          {...register('phone')}
          error={errors.phone?.message}
        />
        <Select
          label="Nationality"
          placeholder="Select your nationality"
          options={nationalityOptions}
          {...register('nationality')}
          error={errors.nationality?.message}
          required
        />
      </div>

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
          min={getMinDepartureDate()}
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

      <Select
        label="How did you hear about us?"
        placeholder="Please select"
        options={referralSourceOptions}
        {...register('referralSource')}
      />

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
