import type { Metadata } from 'next';
import { HeroImage } from '@/components/sections/HeroImage';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { RatesDisplay } from './RatesDisplay';

export const metadata: Metadata = {
  title: 'Rates',
  description:
    'View rates for Manyoni Ridge Safari Lodge. All-inclusive safari accommodation with villa and exclusive use options.',
};

export default function RatesPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroImage
        subtitle="Rates"
        title="Safari Experience Pricing"
        description="All-inclusive luxury safari accommodation in the heart of Zululand. Choose from intimate villas or exclusive lodge use."
        size="large"
        imageSrc="/images/2-bed 1.jpg"
        showScrollIndicator={false}
        verticalAlign="bottom"
      />

      {/* Rates Section */}
      <Section background="white">
        <Heading
          as="h2"
          subtitle="All rates include accommodation, meals, selected beverages, and two daily game drives"
          centered
        >
          Our Rates
        </Heading>

        <div className="mt-12">
          <RatesDisplay />
        </div>
      </Section>

      {/* Booking CTA */}
      <Section background="cream">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl text-primary-dark mb-4">
            Ready to Experience Manyoni Ridge?
          </h2>
          <p className="text-gray-medium mb-8">
            Contact us to check availability, request a detailed quote, or make a booking enquiry.
            Our team is here to help plan your perfect safari experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-block bg-primary-gold text-white px-8 py-3 rounded hover:bg-primary-gold/90 transition-colors"
            >
              Make an Enquiry
            </a>
            <a
              href="/accommodations"
              className="inline-block bg-white text-primary-gold border border-primary-gold px-8 py-3 rounded hover:bg-primary-gold/5 transition-colors"
            >
              View Accommodation
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
