import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { HeroImage } from '@/components/sections/HeroImage';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Thank you for contacting Manyoni Ridge Safari Lodge.',
};

export default function ThankYouPage() {
  return (
    <>
      {/* Hero Banner */}
      <HeroImage
        title="Thank You!"
        description="We've received your message"
        size="medium"
        imageSrc="/images/MANYONI RIDGE CLUBHOUSE RENDERS 12.jpg"
        showScrollIndicator={false}
        verticalAlign="center"
      />

      {/* Content Section */}
      <Section background="white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-light text-primary-dark mb-4">
            Your Message Has Been Sent
          </h2>

          <p className="text-lg text-gray-medium mb-8">
            Thank you for contacting Manyoni Ridge Safari Lodge. Our team will review your message
            and get back to you within 24-48 hours. We look forward to helping you plan your safari adventure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="primary">Return Home</Button>
            </Link>
            <Link href="/accommodation">
              <Button variant="secondary">View Accommodation</Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
