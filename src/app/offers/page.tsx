import type { Metadata } from 'next';
import { HeroImage } from '@/components/sections/HeroImage';
import { CTASection } from '@/components/sections/CTASection';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Special Offers',
  description:
    'Discover special packages and exclusive offers at Manyoni Ridge Safari Lodge. Early booking discounts, honeymoon packages, and more.',
};

const offers = [
  {
    title: 'Early Bird Offer',
    subtitle: 'Book 6+ months in advance',
    description:
      'Plan ahead and save. Book your stay at least 6 months in advance and receive a special early booking discount on your accommodation.',
    highlights: ['10% discount on accommodation', 'Complimentary spa treatment', 'Priority room selection'],
    validUntil: 'Valid for stays from July 2026',
    placeholder: 'placeholder-gold',
  },
  {
    title: 'Honeymoon Package',
    subtitle: 'Celebrate your love',
    description:
      'Begin your married life with an unforgettable safari honeymoon. Our romantic package includes special touches to make your celebration extraordinary.',
    highlights: [
      'Private dinner under the stars',
      'Couples spa treatment',
      'Champagne & chocolate on arrival',
      'Late checkout',
    ],
    validUntil: 'Available year-round',
    placeholder: 'placeholder-room',
  },
  {
    title: 'Family Safari',
    subtitle: 'Create lasting memories',
    description:
      'Bring the family together for an African adventure. Our family package includes activities designed for all ages and special rates for children.',
    highlights: [
      'Free stays for children under 6',
      '50% discount for children 6-12',
      'Junior ranger programs',
      'Family game drive vehicle',
    ],
    validUntil: 'Available year-round',
    placeholder: 'placeholder-safari',
  },
  {
    title: 'Extended Stay',
    subtitle: '5 nights or more',
    description:
      'Immerse yourself in the bush with an extended stay. The longer you stay, the more you save, and the deeper your connection with the African wilderness.',
    highlights: [
      '5 nights: 10% discount',
      '7 nights: 15% discount',
      'Complimentary laundry service',
      'Private bush dinner included',
    ],
    validUntil: 'Available year-round',
    placeholder: 'placeholder-nature',
  },
];

export default function OffersPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroImage
        subtitle="Special Offers"
        title="Exclusive Packages & Offers"
        description="Discover our special packages designed to enhance your Manyoni Ridge experience."
        size="medium"
        placeholderClass="placeholder-gold"
        showScrollIndicator={false}
      />

      {/* Introduction */}
      <Section background="cream">
        <div className="max-w-3xl mx-auto text-center">
          <Heading as="h2" centered>
            Value Without Compromise
          </Heading>
          <p className="text-gray-medium text-lg leading-relaxed">
            While Manyoni Ridge represents the pinnacle of luxury safari
            experiences, we offer a range of packages and offers to help you plan
            your perfect stay. All our rates are fully inclusive of accommodation,
            meals, beverages, and game activities.
          </p>
        </div>
      </Section>

      {/* Offers Grid */}
      <Section background="white">
        <div className="space-y-12">
          {offers.map((offer, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div
                className={`aspect-[4/3] ${offer.placeholder} ${
                  index % 2 === 1 ? 'lg:order-2' : ''
                }`}
                role="img"
                aria-label={offer.title}
              />
              <div className={`flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <p className="text-primary-gold text-sm uppercase tracking-wider mb-2">
                  {offer.subtitle}
                </p>
                <h3 className="font-heading text-3xl font-medium text-primary-dark mb-4">
                  {offer.title}
                </h3>
                <p className="text-gray-medium mb-6">{offer.description}</p>
                <ul className="space-y-2 mb-6">
                  {offer.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-medium">
                      <span className="w-1.5 h-1.5 bg-primary-gold rounded-full" />
                      {highlight}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-medium mb-4 italic">{offer.validUntil}</p>
                <Button href="/contact" className="self-start">
                  Enquire About This Offer
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Terms */}
      <Section background="off-white">
        <div className="max-w-3xl mx-auto text-center">
          <Heading as="h3" className="text-xl">
            Terms & Conditions
          </Heading>
          <p className="text-gray-medium text-sm mt-4">
            All offers are subject to availability and cannot be combined with
            other promotions unless specified. Offers may be withdrawn or modified
            at any time. Full terms and conditions will be provided at the time of
            booking. For detailed information about any offer, please contact our
            reservations team.
          </p>
        </div>
      </Section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Book?"
        description="Contact us to discuss which offer best suits your plans."
        ctaText="Make an Enquiry"
        ctaHref="/contact"
        background="gold"
      />
    </>
  );
}
