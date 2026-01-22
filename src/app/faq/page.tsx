import type { Metadata } from 'next';
import { HeroImage } from '@/components/sections/HeroImage';
import { CTASection } from '@/components/sections/CTASection';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Accordion } from '@/components/ui/Accordion';
import { faqCategories } from '@/data/faq';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Find answers to common questions about Manyoni Ridge Safari Lodge - rates, bookings, activities, and more.',
};

export default function FAQPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroImage
        subtitle="FAQ"
        title="Frequently Asked Questions"
        description="Find answers to common questions about your stay at Manyoni Ridge Safari Lodge."
        size="medium"
        placeholderClass="placeholder-safari"
        showScrollIndicator={false}
      />

      {/* FAQ Section */}
      <Section background="white">
        <div className="max-w-3xl mx-auto">
          {faqCategories.map((category, index) => (
            <div key={index} className="mb-12 last:mb-0">
              <Heading as="h2" className="text-2xl mb-6">
                {category.title}
              </Heading>
              <Accordion
                items={category.items.map((item, itemIndex) => ({
                  id: `${index}-${itemIndex}`,
                  title: item.question,
                  content: <p>{item.answer}</p>,
                }))}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Still Have Questions */}
      <Section background="cream">
        <div className="max-w-2xl mx-auto text-center">
          <Heading as="h2" centered>
            Still Have Questions?
          </Heading>
          <p className="text-gray-medium text-lg mb-8">
            Our team is here to help. Get in touch and we&apos;ll respond within 24
            hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-gold text-primary-dark font-semibold uppercase tracking-wider text-sm hover:bg-primary-gold/90 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="mailto:enquiries@manyoniridge.co.za"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary-gold text-primary-gold font-semibold uppercase tracking-wider text-sm hover:bg-primary-gold hover:text-primary-dark transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Book?"
        description="Start planning your unforgettable safari experience at Manyoni Ridge."
        ctaText="Make an Enquiry"
        ctaHref="/contact"
        background="gold"
      />
    </>
  );
}
