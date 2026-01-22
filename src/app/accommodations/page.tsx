import type { Metadata } from 'next';
import { HeroImage } from '@/components/sections/HeroImage';
import { RoomCard } from '@/components/sections/RoomCard';
import { CTASection } from '@/components/sections/CTASection';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { rooms } from '@/data/rooms';

export const metadata: Metadata = {
  title: 'Accommodations',
  description:
    'Discover our luxurious one and two bedroom suites at Manyoni Ridge Safari Lodge. Each suite offers private pools, stunning bush views, and exceptional comfort.',
};

export default function AccommodationsPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroImage
        subtitle="Accommodations"
        title="Luxury Suites in the Heart of the Bush"
        description="Experience unparalleled comfort in our intimate collection of suites, each offering private pools, breathtaking views, and seamless harmony with the African wilderness."
        size="large"
        placeholderClass="placeholder-room"
        showScrollIndicator={false}
      />

      {/* Introduction */}
      <Section background="cream">
        <div className="max-w-3xl mx-auto text-center">
          <Heading as="h2" centered>
            Your Private Sanctuary
          </Heading>
          <p className="text-gray-medium text-lg leading-relaxed">
            Manyoni Ridge offers just nine exclusive suites, ensuring an intimate
            and personalized experience. Choose between our romantic one bedroom
            suites or spacious two bedroom family suites, each thoughtfully
            designed to immerse you in luxury while celebrating the natural beauty
            that surrounds you.
          </p>
        </div>
      </Section>

      {/* Room Listings */}
      <Section background="white">
        <div className="space-y-16">
          {rooms.map((room, index) => (
            <RoomCard
              key={room.slug}
              room={room}
              index={index}
              variant="featured"
            />
          ))}
        </div>
      </Section>

      {/* Features Section */}
      <Section background="off-white">
        <Heading
          as="h2"
          subtitle="Every suite at Manyoni Ridge comes with exceptional amenities and services."
          centered
        >
          Suite Features
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {[
            {
              title: 'Private Plunge Pool',
              description:
                'Each suite features a private pool where you can cool off while watching wildlife pass by.',
            },
            {
              title: 'Indoor & Outdoor Showers',
              description:
                'Experience the freedom of showering under the African sky or retreat to your luxurious indoor bathroom.',
            },
            {
              title: 'Expansive Decks',
              description:
                'Generous private decks offer the perfect vantage point for game viewing from the comfort of your suite.',
            },
            {
              title: 'King-Size Beds',
              description:
                'Sink into premium linens and enjoy restful sleep in our handcrafted king-size beds.',
            },
            {
              title: 'Climate Control',
              description:
                'Stay comfortable year-round with air conditioning and ceiling fans in every suite.',
            },
            {
              title: 'Complimentary Amenities',
              description:
                'Mini bar, coffee station, safe, Wi-Fi, bathrobes, and slippers included in every suite.',
            },
          ].map((feature, index) => (
            <div key={index} className="text-center">
              <h3 className="font-heading text-xl font-medium text-primary-dark mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-medium text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Book Your Stay?"
        description="Contact us to check availability and start planning your safari experience."
        ctaText="Make an Enquiry"
        ctaHref="/contact"
        secondaryCtaText="View FAQ"
        secondaryCtaHref="/faq"
        background="gold"
      />
    </>
  );
}
