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

const contactSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  nationality: z.string().min(1, 'Nationality is required'),
  subject: z.string().min(1, 'Please select a subject'),
  referralSource: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const subjectOptions = [
  { value: 'general', label: 'General Enquiry' },
  { value: 'booking', label: 'Booking Enquiry' },
  { value: 'group', label: 'Group Booking' },
  { value: 'special', label: 'Special Occasion' },
  { value: 'press', label: 'Press & Media' },
  { value: 'other', label: 'Other' },
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

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      subject: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    console.log('Contact form submission:', data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    analytics.formSubmit('contact_form', {
      subject: data.subject,
      referral_source: data.referralSource || undefined,
      nationality: data.nationality,
    });
    setIsSubmitted(true);
    reset();
  };

  if (isSubmitted) {
    return (
      <div className={cn('text-center py-12', className)}>
        <div className="inline-flex items-center justify-center w-16 h-16 bg-sage-green/20 rounded-full mb-4">
          <Check className="w-8 h-8 text-sage-green" />
        </div>
        <h3 className="font-heading text-2xl font-medium text-primary-dark mb-2">
          Message Sent
        </h3>
        <p className="text-gray-medium mb-6">
          Thank you for your enquiry. We&apos;ll be in touch within 24-48 hours.
        </p>
        <Button onClick={() => setIsSubmitted(false)} variant="outline">
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-6', className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          placeholder="John"
          {...register('firstName')}
          error={errors.firstName?.message}
          required
        />
        <Input
          label="Last Name"
          placeholder="Doe"
          {...register('lastName')}
          error={errors.lastName?.message}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          type="email"
          label="Email Address"
          placeholder="john@example.com"
          {...register('email')}
          error={errors.email?.message}
          required
        />
        <Input
          type="tel"
          label="Phone Number"
          placeholder="+27 82 123 4567"
          {...register('phone')}
          error={errors.phone?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Nationality"
          placeholder="Select your nationality"
          options={nationalityOptions}
          {...register('nationality')}
          error={errors.nationality?.message}
          required
        />
        <Select
          label="Subject"
          placeholder="Select a subject"
          options={subjectOptions}
          {...register('subject')}
          error={errors.subject?.message}
          required
        />
      </div>

      <Select
        label="How did you hear about us?"
        placeholder="Please select"
        options={referralSourceOptions}
        {...register('referralSource')}
      />

      <Textarea
        label="Message"
        placeholder="How can we help you?"
        {...register('message')}
        error={errors.message?.message}
        required
      />

      <Button type="submit" isLoading={isSubmitting} className="w-full md:w-auto">
        Send Message
      </Button>
    </form>
  );
}
