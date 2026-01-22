import type { Metadata } from 'next';
import { HeroImage } from '@/components/sections/HeroImage';
import { SplitContent } from '@/components/sections/SplitContent';
import { TextBlock } from '@/components/sections/TextBlock';
import { CTASection } from '@/components/sections/CTASection';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Manyoni Ridge Safari Lodge - our story, vision, and commitment to exceptional safari experiences.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroImage
        subtitle="About Us"
        title="Our Story"
        description="A vision born from a passion for Africa's wilderness and a commitment to sharing its magic."
        size="large"
        placeholderClass="placeholder-safari"
        showScrollIndicator={false}
      />

      {/* Introduction */}
      <TextBlock
        title="Intimate Luxury in the Wild"
        subtitle="Our Philosophy"
        description="Manyoni Ridge was created with a singular vision: to offer an intimate safari experience where exceptional service meets authentic wilderness. We believe that the best safari experiences are personal, meaningful, and deeply connected to the land and its people."
        background="cream"
      />

      {/* Our Story */}
      <SplitContent
        subtitle="The Beginning"
        title="A Dream Realized"
        description="Manyoni Ridge emerged from years of planning and a deep love for the African bush. Set within the renowned Manyoni Private Game Reserve, our lodge represents a new chapter in sustainable luxury tourism in KwaZulu-Natal. Every aspect of our design and operation reflects our commitment to conservation, community, and unforgettable guest experiences."
        imagePlaceholder="placeholder-nature"
        imagePosition="left"
      />

      {/* Vision & Values */}
      <Section background="white">
        <Heading
          as="h2"
          subtitle="The principles that guide everything we do at Manyoni Ridge."
          centered
        >
          Our Values
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {[
            {
              title: 'Authenticity',
              description:
                'Genuine experiences rooted in the traditions and rhythms of the African bush.',
            },
            {
              title: 'Conservation',
              description:
                'Active participation in protecting wildlife and their habitats for future generations.',
            },
            {
              title: 'Excellence',
              description:
                'Uncompromising commitment to quality in every detail of your experience.',
            },
            {
              title: 'Community',
              description:
                'Supporting local communities through employment, education, and sustainable development.',
            },
          ].map((value, index) => (
            <div key={index} className="text-center">
              <h3 className="font-heading text-xl font-medium text-primary-dark mb-2">
                {value.title}
              </h3>
              <p className="text-gray-medium text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* The Team */}
      <SplitContent
        subtitle="Our People"
        title="Expert Guides & Dedicated Team"
        description="Behind every exceptional safari experience is a team of passionate professionals. Our guides are among the most experienced in KwaZulu-Natal, with deep knowledge of the bush and its inhabitants. Our hospitality team brings warmth and attention to detail that transforms a stay into a cherished memory."
        features={[
          'FGASA qualified field guides',
          'Multi-lingual staff',
          'Expert trackers',
          'Dedicated conservation team',
          'Professional hospitality training',
        ]}
        imagePlaceholder="placeholder-safari"
        imagePosition="right"
        background="cream"
      />

      {/* Opening Information */}
      <Section background="white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary-gold text-sm uppercase tracking-[0.2em] mb-4 font-medium">
            Coming Soon
          </p>
          <Heading as="h2" centered>
            Opening July 2026
          </Heading>
          <p className="text-gray-medium text-lg leading-relaxed mb-8">
            Manyoni Ridge Safari Lodge is currently under construction and will
            welcome its first guests in July 2026. We invite you to register your
            interest and be among the first to experience our new lodge.
          </p>
          <div
            className="aspect-video placeholder-room max-w-2xl mx-auto"
            role="img"
            aria-label="Lodge construction render"
          />
        </div>
      </Section>

      {/* Awards Placeholder */}
      <Section background="off-white">
        <Heading
          as="h2"
          subtitle="We look forward to earning recognition for our commitment to excellence."
          centered
        >
          Recognition
        </Heading>
        <p className="text-center text-gray-medium mt-4">
          As a new lodge, our awards and accolades will be displayed here following
          our opening in July 2026.
        </p>
      </Section>

      {/* CTA Section */}
      <CTASection
        title="Be Part of Our Story"
        description="Register your interest and be among the first to experience Manyoni Ridge."
        ctaText="Contact Us"
        ctaHref="/contact"
        secondaryCtaText="Subscribe for Updates"
        secondaryCtaHref="#newsletter"
        background="gold"
      />
    </>
  );
}
