import type { Metadata } from 'next';
import { HeroImage } from '@/components/sections/HeroImage';
import { ActivityCard } from '@/components/sections/ActivityCard';
import { CTASection } from '@/components/sections/CTASection';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { activities } from '@/data/activities';

export const metadata: Metadata = {
  title: 'Safari Activities',
  description:
    'Discover unforgettable safari experiences at Manyoni Ridge. From Big 5 game drives to rhino conservation and family adventures.',
};

export default function ActivitiesPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroImage
        subtitle="Safari Activities"
        title="Experiences That Define Your Safari"
        description="From thrilling game drives to meaningful conservation encounters, discover the many ways to connect with the African wilderness at Manyoni Ridge."
        size="large"
        placeholderClass="placeholder-nature"
        showScrollIndicator={false}
      />

      {/* Introduction */}
      <Section background="cream">
        <div className="max-w-3xl mx-auto text-center">
          <Heading as="h2" centered>
            Unforgettable Encounters
          </Heading>
          <p className="text-gray-medium text-lg leading-relaxed">
            At Manyoni Ridge, we believe the best safari experiences go beyond
            game viewing. Our activities are designed to create deep connections
            with the African wilderness, its wildlife, and the communities working
            to protect it. Each experience is guided by our expert team who share
            their passion and knowledge of this remarkable ecosystem.
          </p>
        </div>
      </Section>

      {/* Activities Grid */}
      <Section background="white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <ActivityCard key={activity.slug} activity={activity} index={index} />
          ))}
        </div>
      </Section>

      {/* Daily Schedule */}
      <Section background="off-white">
        <Heading
          as="h2"
          subtitle="A typical day at Manyoni Ridge is filled with adventure and relaxation."
          centered
        >
          Your Day at Manyoni Ridge
        </Heading>

        <div className="max-w-2xl mx-auto mt-12">
          <div className="space-y-6">
            {[
              {
                time: '05:30',
                title: 'Wake Up Call',
                description: 'Rise with the sun and enjoy tea or coffee in your suite.',
              },
              {
                time: '06:00',
                title: 'Morning Game Drive',
                description:
                  'Set out on an early morning safari to catch the wildlife at its most active.',
              },
              {
                time: '09:30',
                title: 'Breakfast',
                description:
                  'Return to the lodge for a hearty breakfast with bush views.',
              },
              {
                time: '11:00',
                title: 'Optional Activities',
                description:
                  'Join a conservation experience, spa treatment, or relax by your pool.',
              },
              {
                time: '13:00',
                title: 'Lunch',
                description:
                  'Enjoy a light lunch at the main lodge or your private deck.',
              },
              {
                time: '15:30',
                title: 'High Tea',
                description: 'Refresh with afternoon tea and treats before your evening drive.',
              },
              {
                time: '16:00',
                title: 'Afternoon Game Drive',
                description:
                  'Head out as the day cools, returning after a sundowner stop in the bush.',
              },
              {
                time: '19:30',
                title: 'Dinner',
                description:
                  'Dine under the stars or in our boma, sharing stories of the day.',
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="w-16 flex-shrink-0">
                  <span className="text-primary-gold font-medium">{item.time}</span>
                </div>
                <div className="flex-1 pb-6 border-b border-gray-light last:border-0">
                  <h3 className="font-heading text-lg font-medium text-primary-dark mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-medium text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <CTASection
        title="Ready for Adventure?"
        description="Contact us to learn more about our activities and start planning your safari."
        ctaText="Make an Enquiry"
        ctaHref="/contact"
        secondaryCtaText="View Accommodations"
        secondaryCtaHref="/accommodations"
        background="image"
        imageSrc="/images/Birds and Wildlife/Roller, Lilac-breasted Kruger SA AR-042 Edited.jpg"
      />
    </>
  );
}
