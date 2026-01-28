import Link from 'next/link';
import { HeroImage } from '@/components/sections/HeroImage';
import { SplitContent } from '@/components/sections/SplitContent';
import { TextBlock } from '@/components/sections/TextBlock';
import { RoomCard } from '@/components/sections/RoomCard';
import { ActivityCard } from '@/components/sections/ActivityCard';
import { NewsletterSection } from '@/components/sections/NewsletterSection';
import { CTASection } from '@/components/sections/CTASection';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { rooms } from '@/data/rooms';
import { activities } from '@/data/activities';
import { SITE_CONFIG } from '@/lib/constants';

export default function HomePage() {
  // Featured activities for the home page
  const featuredActivities = activities.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <HeroImage
        subtitle="Opening July 2026"
        title="Intimate Luxury in the Wild"
        description="Experience the magic of the African bush at our boutique safari lodge in Manyoni Private Game Reserve. Big 5 encounters, exceptional service, and unforgettable moments await."
        ctaText="Enquire Now"
        ctaHref="/contact"
        secondaryCtaText="Explore"
        secondaryCtaHref="/accommodations"
        scrollToId="intro"
        videoSrc="/videos/renders.mp4"
        verticalAlign="bottom"
        textBackground={true}
      />

      {/* Introduction Section */}
      <TextBlock
        title="Welcome to Manyoni Ridge"
        subtitle="Your Safari Awaits"
        description="Nestled in the heart of Manyoni Private Game Reserve, Manyoni Ridge offers an intimate safari experience where luxury meets wilderness. With only nine exclusive suites, we provide personalized service and unforgettable encounters with Africa's most iconic wildlife."
        ctaText="Discover Our Story"
        ctaHref="/about"
        background="cream"
      />

      {/* About Split Content */}
      <SplitContent
        subtitle="The Experience"
        title="Where Luxury Meets Wilderness"
        description="Every detail at Manyoni Ridge has been carefully considered to create an experience that honors both the magnificence of the African bush and your desire for comfort. From your private plunge pool overlooking the reserve to our exceptional cuisine, every moment is crafted to exceed expectations."
        features={[
          'Big 5 private game reserve',
          'Only 9 intimate suites',
          'All-inclusive luxury experience',
          'Expert guides and trackers',
          'Conservation-focused activities',
        ]}
        ctaText="View Accommodations"
        ctaHref="/accommodations"
        imageSrc="/images/Birds and Wildlife/DSC00748.jpeg"
        imagePosition="left"
      />

      {/* Accommodations Section */}
      <Section background="off-white" id="accommodations">
        <Heading
          as="h2"
          subtitle="Choose from our luxurious one and two bedroom suites, each offering private pools, stunning views, and unparalleled comfort in the heart of the bush."
          centered
        >
          Our Suites
        </Heading>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {rooms.map((room, index) => (
            <RoomCard key={room.slug} room={room} index={index} variant="featured" />
          ))}
        </div>
      </Section>

      {/* Reserve Info Strip */}
      <section className="bg-primary-dark py-16">
        <div className="container-max">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="font-heading text-4xl md:text-5xl text-primary-gold font-medium mb-2">
                23,000
              </p>
              <p className="text-white/80 text-sm uppercase tracking-wider">
                Hectares of Wilderness
              </p>
            </div>
            <div>
              <p className="font-heading text-4xl md:text-5xl text-primary-gold font-medium mb-2">
                Big 5
              </p>
              <p className="text-white/80 text-sm uppercase tracking-wider">
                Game Reserve
              </p>
            </div>
            <div>
              <p className="font-heading text-4xl md:text-5xl text-primary-gold font-medium mb-2">
                9
              </p>
              <p className="text-white/80 text-sm uppercase tracking-wider">
                Exclusive Suites
              </p>
            </div>
            <div>
              <p className="font-heading text-4xl md:text-5xl text-primary-gold font-medium mb-2">
                400+
              </p>
              <p className="text-white/80 text-sm uppercase tracking-wider">
                Bird Species
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <Section background="white" id="activities">
        <Heading
          as="h2"
          subtitle="From thrilling game drives to meaningful conservation experiences, discover the many ways to connect with the African wilderness."
          centered
        >
          Safari Activities
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {featuredActivities.map((activity, index) => (
            <ActivityCard key={activity.slug} activity={activity} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/activities"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-gold uppercase tracking-wider hover:gap-3 transition-all"
          >
            View All Activities
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </Section>

      {/* Conservation Content */}
      <SplitContent
        subtitle="Conservation"
        title="Protecting Africa's Heritage"
        description="At Manyoni Ridge, conservation is at the heart of everything we do. The reserve is home to critical populations of rhino and the elusive pangolin. By staying with us, you directly support anti-poaching efforts, habitat restoration, and community development initiatives."
        ctaText="Learn About Conservation"
        ctaHref="/reserve"
        imageSrc="/images/Birds and Wildlife/DSC00470.jpeg"
        imagePosition="right"
        background="cream"
      />

      {/* Newsletter Section */}
      <NewsletterSection
        title="Be the First to Know"
        description={`${SITE_CONFIG.name} opens in ${SITE_CONFIG.opening}. Subscribe to receive exclusive early booking offers and news from the bush.`}
      />

      {/* CTA Section */}
      <CTASection
        title="Begin Your Safari Journey"
        description="Contact us to start planning your unforgettable experience at Manyoni Ridge Safari Lodge."
        ctaText="Make an Enquiry"
        ctaHref="/contact"
        secondaryCtaText="View FAQ"
        secondaryCtaHref="/faq"
        background="image"
        imageSrc="/images/Birds and Wildlife/DSC00631.jpeg"
      />
    </>
  );
}
