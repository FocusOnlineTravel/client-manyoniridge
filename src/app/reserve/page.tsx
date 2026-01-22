import type { Metadata } from 'next';
import { HeroImage } from '@/components/sections/HeroImage';
import { SplitContent } from '@/components/sections/SplitContent';
import { TextBlock } from '@/components/sections/TextBlock';
import { CTASection } from '@/components/sections/CTASection';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';

export const metadata: Metadata = {
  title: 'The Reserve',
  description:
    'Discover Manyoni Private Game Reserve - 23,000 hectares of pristine African wilderness, home to the Big 5 and critical conservation efforts.',
};

export default function ReservePage() {
  const wildlife = [
    {
      name: 'Lion',
      description: 'The king of the African bush, often spotted during game drives.',
    },
    {
      name: 'Leopard',
      description: 'Elusive and majestic, frequently seen in the reserve.',
    },
    {
      name: 'Elephant',
      description: 'Majestic herds roam freely across the vast wilderness.',
    },
    {
      name: 'Rhino',
      description: 'Both black and white rhino, central to conservation efforts.',
    },
    {
      name: 'Buffalo',
      description: 'Large herds graze the open plains and woodlands.',
    },
    {
      name: 'Cheetah',
      description: 'The fastest land animal, thriving in the open savanna.',
    },
    {
      name: 'Wild Dog',
      description: 'Endangered painted wolves hunt in coordinated packs.',
    },
    {
      name: 'Pangolin',
      description: 'One of the world\'s most elusive and endangered mammals.',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroImage
        subtitle="The Reserve"
        title="Manyoni Private Game Reserve"
        description="23,000 hectares of pristine African wilderness in the heart of Zululand, home to the Big 5 and a thriving ecosystem of wildlife."
        size="large"
        placeholderClass="placeholder-nature"
        showScrollIndicator={false}
      />

      {/* Introduction */}
      <TextBlock
        title="A Wilderness Preserved"
        subtitle="Zululand, KwaZulu-Natal"
        description="Manyoni Private Game Reserve is a testament to successful conservation in South Africa. Formed from 17 former cattle farms, this remarkable reserve in northern KwaZulu-Natal has been restored to its natural state, creating a sanctuary for Africa's most iconic wildlife."
        background="cream"
      />

      {/* Big 5 Section */}
      <SplitContent
        subtitle="Big 5 Territory"
        title="Home to Africa's Most Iconic Wildlife"
        description="Manyoni is one of the few Big 5 reserves in KwaZulu-Natal, offering exceptional opportunities to encounter lion, leopard, elephant, rhino, and buffalo in their natural habitat. Our expert guides and trackers ensure unforgettable wildlife encounters on every game drive."
        features={[
          'All Big 5 species present',
          'Cheetah and wild dog populations',
          'Over 400 bird species recorded',
          'Diverse habitats and ecosystems',
        ]}
        ctaText="View Activities"
        ctaHref="/activities"
        imagePlaceholder="placeholder-safari"
        imagePosition="left"
      />

      {/* Wildlife Grid */}
      <Section background="white">
        <Heading
          as="h2"
          subtitle="From the Big 5 to the rare pangolin, discover the incredible diversity of wildlife at Manyoni."
          centered
        >
          Wildlife of Manyoni
        </Heading>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {wildlife.map((animal, index) => (
            <div key={index} className="text-center">
              <div className="aspect-square placeholder-nature mb-4" role="img" aria-label={animal.name} />
              <h3 className="font-heading text-lg font-medium text-primary-dark mb-1">
                {animal.name}
              </h3>
              <p className="text-gray-medium text-sm">{animal.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Conservation Section */}
      <SplitContent
        subtitle="Conservation"
        title="Protecting Africa's Heritage"
        description="Conservation is at the heart of everything we do at Manyoni. The reserve is a critical sanctuary for endangered species, including black and white rhino, and the elusive pangolin. Our dedicated anti-poaching teams, K-9 units, and community programs work tirelessly to ensure these species have a future."
        features={[
          'Active anti-poaching operations',
          'K-9 unit for wildlife protection',
          'Rhino monitoring programs',
          'Pangolin conservation research',
          'Community development initiatives',
        ]}
        ctaText="Conservation Experiences"
        ctaHref="/activities/rhino-conservation"
        imagePlaceholder="placeholder-safari"
        imagePosition="right"
        background="cream"
      />

      {/* Sustainability */}
      <Section background="white">
        <Heading
          as="h2"
          subtitle="Our commitment to preserving this wilderness for future generations."
          centered
        >
          Sustainability
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {[
            {
              title: 'Eco-Conscious Design',
              description:
                'Our lodge is designed to minimize environmental impact, using sustainable materials and solar energy.',
            },
            {
              title: 'Water Conservation',
              description:
                'Advanced water recycling systems and rainwater harvesting reduce our freshwater consumption.',
            },
            {
              title: 'Community Partnership',
              description:
                'We support local communities through employment, education, and sustainable development programs.',
            },
            {
              title: 'Wildlife Corridors',
              description:
                'Manyoni connects to other reserves, allowing wildlife to roam freely across vast landscapes.',
            },
            {
              title: 'Zero Single-Use Plastic',
              description:
                'We have eliminated single-use plastics throughout the lodge and on game drives.',
            },
            {
              title: 'Carbon Footprint',
              description:
                'We offset our carbon emissions and encourage guests to participate in conservation contributions.',
            },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <h3 className="font-heading text-xl font-medium text-primary-dark mb-2">
                {item.title}
              </h3>
              <p className="text-gray-medium text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <CTASection
        title="Experience the Wild"
        description="Discover the magic of Manyoni Private Game Reserve."
        ctaText="Plan Your Safari"
        ctaHref="/contact"
        secondaryCtaText="View Accommodations"
        secondaryCtaHref="/accommodations"
        background="image"
        placeholderClass="placeholder-nature"
      />
    </>
  );
}
