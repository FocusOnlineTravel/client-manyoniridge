import type { Metadata } from 'next';
import { HeroImage } from '@/components/sections/HeroImage';
import { SplitContent } from '@/components/sections/SplitContent';
import { CTASection } from '@/components/sections/CTASection';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';

export const metadata: Metadata = {
  title: 'Dining',
  description:
    'Experience exceptional cuisine at Manyoni Ridge Safari Lodge. From bush breakfasts to boma dinners under the stars.',
};

export default function DiningPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroImage
        subtitle="Culinary Experience"
        title="Dining Under the African Sky"
        description="Savor exceptional cuisine crafted from fresh, local ingredients, enjoyed in unforgettable settings from our elegant dining room to intimate bush dinners."
        size="large"
        placeholderClass="placeholder-gold"
        showScrollIndicator={false}
      />

      {/* Introduction */}
      <Section background="cream">
        <div className="max-w-3xl mx-auto text-center">
          <Heading as="h2" centered>
            A Culinary Journey
          </Heading>
          <p className="text-gray-medium text-lg leading-relaxed">
            At Manyoni Ridge, dining is an integral part of your safari experience.
            Our talented chefs create dishes that celebrate the rich flavors of
            South Africa while incorporating international influences. Every meal
            is an opportunity to gather, share stories of the day&apos;s adventures,
            and create lasting memories.
          </p>
        </div>
      </Section>

      {/* Main Lodge Dining */}
      <SplitContent
        subtitle="Main Lodge"
        title="Elegant Dining with Bush Views"
        description="Our main dining area offers a sophisticated setting where you can enjoy breakfast, lunch, and dinner while overlooking the African bush. Floor-to-ceiling windows ensure uninterrupted views, while the open-plan kitchen allows you to watch our chefs at work."
        features={[
          'Seasonal menus featuring local ingredients',
          'Extensive wine selection from South African estates',
          'Accommodations for all dietary requirements',
          'À la carte and set menu options',
        ]}
        imageSrc="/images/2-bed 7.jpg"
        imagePosition="left"
      />

      {/* Dining Experiences */}
      <Section background="white">
        <Heading
          as="h2"
          subtitle="From intimate bush dinners to starlit boma evenings, every meal is an experience."
          centered
        >
          Dining Experiences
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {[
            {
              title: 'Bush Breakfast',
              description:
                'After your morning game drive, enjoy a hearty breakfast served in a scenic location in the bush.',
              placeholder: 'placeholder-nature',
            },
            {
              title: 'Sundowner Drinks',
              description:
                'Pause during your afternoon drive to toast the African sunset with drinks and canapés.',
              placeholder: 'placeholder-gold',
            },
            {
              title: 'Boma Dinner',
              description:
                'Dine around the fire in our traditional boma, under a canopy of stars.',
              placeholder: 'placeholder-safari',
            },
            {
              title: 'Private Dining',
              description:
                'Celebrate special occasions with a private dinner on your suite deck or a secluded bush location.',
              placeholder: 'placeholder-room',
            },
            {
              title: 'High Tea',
              description:
                'Refresh before your afternoon drive with our selection of teas, coffees, and homemade treats.',
              placeholder: 'placeholder-gold',
            },
            {
              title: 'Pool Deck Lunch',
              description:
                'Enjoy a light lunch by the pool during the heat of the day.',
              placeholder: 'placeholder-room',
            },
          ].map((experience, index) => (
            <div key={index} className="group">
              <div
                className={`aspect-[4/3] ${experience.placeholder} mb-4`}
                role="img"
                aria-label={experience.title}
              />
              <h3 className="font-heading text-xl font-medium text-primary-dark mb-2">
                {experience.title}
              </h3>
              <p className="text-gray-medium text-sm">{experience.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Wine & Drinks */}
      <SplitContent
        subtitle="Wine & Beverages"
        title="A Cellar Worth Exploring"
        description="Our carefully curated wine list showcases the best of South African viticulture, from the celebrated estates of Stellenbosch and Franschhoek to hidden gems from lesser-known regions. Our bar offers premium spirits, craft beers, and signature cocktails inspired by the African bush."
        features={[
          'Award-winning South African wines',
          'Premium international spirits',
          'Local craft beers',
          'Signature safari cocktails',
          'Expertly paired wine dinners available',
        ]}
        imagePlaceholder="placeholder-gold"
        imagePosition="right"
        background="cream"
      />

      {/* Dietary Requirements */}
      <Section background="white">
        <div className="max-w-3xl mx-auto text-center">
          <Heading as="h2" centered>
            Dietary Accommodations
          </Heading>
          <p className="text-gray-medium text-lg leading-relaxed mb-8">
            We understand that every guest has unique dietary needs and
            preferences. Please inform us in advance of any allergies, intolerances,
            or dietary requirements, and our chefs will ensure your meals are
            prepared with the utmost care.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Vegetarian',
              'Vegan',
              'Gluten-Free',
              'Halal',
              'Kosher',
              'Low-Sodium',
              'Dairy-Free',
              'Nut-Free',
            ].map((diet) => (
              <span
                key={diet}
                className="px-4 py-2 bg-primary-cream text-primary-dark text-sm font-medium"
              >
                {diet}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Taste the Wild?"
        description="Contact us to learn more about our dining experiences and special occasion packages."
        ctaText="Make an Enquiry"
        ctaHref="/contact"
        background="gold"
      />
    </>
  );
}
