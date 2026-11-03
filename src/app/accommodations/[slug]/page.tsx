import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, Users, Bed, Bath, Maximize, Check } from 'lucide-react';
import { HeroImage } from '@/components/sections/HeroImage';
import { CTASection } from '@/components/sections/CTASection';
import { DetailGallery } from '@/components/sections/DetailGallery';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { SchemaMarkup } from '@/components/ui/SchemaMarkup';
import { getRoomBySlug, getAllRooms } from '@/lib/wordpress/rooms';
import { buildStaticMetadata } from '@/lib/metadata';
import { ROOM_SEO } from '@/lib/seo';
import { BOOKING_ENGINE_URL } from '@/lib/constants';

const generateBreadcrumbSchema = (roomTitle: string, roomSlug: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.manyoniridge.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Accommodations",
      "item": "https://www.manyoniridge.com/accommodations"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": roomTitle,
      "item": `https://www.manyoniridge.com/accommodations/${roomSlug}`
    }
  ]
});

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const seo = ROOM_SEO[slug];
  const room = seo ? undefined : await getRoomBySlug(slug);

  return buildStaticMetadata({
    title: seo?.title ?? room?.title ?? 'Accommodation',
    description: seo?.description ?? room?.shortDescription,
    slug: `accommodations/${slug}`,
  });
}

/**
 * Rendered on the server so the villa content is in the HTML. It used to be
 * fetched client-side, which left crawlers and AI tools with an empty page.
 */
export default async function RoomDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [room, allRooms] = await Promise.all([getRoomBySlug(slug), getAllRooms()]);

  if (!room) {
    notFound();
  }

  const otherRooms = allRooms.filter((r) => r.slug !== room.slug);

  return (
    <>
      <SchemaMarkup data={generateBreadcrumbSchema(room.title, room.slug)} />
      {/* Hero Section */}
      <HeroImage
        subtitle={room.subtitle}
        title={room.title}
        size="large"
        imageSrc={room.heroImage}
        placeholderClass={room.placeholderClass}
        showScrollIndicator={false}
      />

      {/* Back Link */}
      <Section background="white" noPadding className="py-6 border-b border-gray-light">
        <Link
          href="/accommodations"
          className="inline-flex items-center gap-2 text-sm text-gray-medium hover:text-primary-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Accommodation
        </Link>
      </Section>

      {/* Room Details */}
      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-primary-dark mb-6">
              About This Villa
            </h2>
            <div
              className="prose prose-lg text-gray-medium max-w-none"
              dangerouslySetInnerHTML={{ __html: room.description }}
            />

            {/* Features */}
            <div className="mt-10">
              <h3 className="font-heading text-2xl font-medium text-primary-dark mb-4">
                Villa Features
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {room.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-gray-medium"
                  >
                    <Check className="w-5 h-5 text-primary-gold flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Info Card */}
            <div className="bg-primary-cream p-6 mb-6">
              <h3 className="font-heading text-xl font-medium text-primary-dark mb-4">
                Quick Information
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-medium">
                  <Users className="w-5 h-5 text-primary-gold" />
                  <span>
                    {room.capacity.adults} {room.slug === 'two-bedroom-villa' ? 'Pax' : 'Adults'}
                    {room.capacity.children > 0 &&
                      `, ${room.capacity.children} Children`}
                  </span>
                </li>
                <li className="flex items-center gap-3 text-gray-medium">
                  <Bed className="w-5 h-5 text-primary-gold" />
                  <span>
                    {room.bedrooms} Bedroom{room.bedrooms > 1 && 's'}
                  </span>
                </li>
                <li className="flex items-center gap-3 text-gray-medium">
                  <Bath className="w-5 h-5 text-primary-gold" />
                  <span>
                    {room.bathrooms} Bathroom{room.bathrooms > 1 && 's'}
                  </span>
                </li>
                <li className="flex items-center gap-3 text-gray-medium">
                  <Maximize className="w-5 h-5 text-primary-gold" />
                  <span>{room.size}</span>
                </li>
              </ul>
            </div>

            {/* Amenities Card */}
            <div className="bg-white border border-gray-light p-6 mb-6">
              <h3 className="font-heading text-xl font-medium text-primary-dark mb-4">
                Amenities
              </h3>
              <ul className="space-y-2">
                {room.amenities.map((amenity, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-medium"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 bg-primary-gold rounded-full flex-shrink-0" />
                    <span
                      className="[&_a]:text-primary-gold [&_a]:underline hover:[&_a]:text-primary-dark"
                      dangerouslySetInnerHTML={{ __html: amenity }}
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <Button href={BOOKING_ENGINE_URL} target="_blank" className="flex-1">
                Book Now
              </Button>
              <Button href="/contact" variant="outline" className="flex-1">
                Enquire
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Image Gallery */}
      {room.images && room.images.length > 0 && (
        <DetailGallery images={room.images} title={room.title} maxThumbnails={8} />
      )}

      {/* Other Rooms */}
      {otherRooms.length > 0 && (
        <Section background="white">
          <h2 className="font-heading text-3xl font-medium text-primary-dark mb-8 text-center">
            Explore Other Villas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherRooms.map((otherRoom) => (
              <Link
                key={otherRoom.slug}
                href={`/accommodations/${otherRoom.slug}`}
                className="group block bg-white overflow-hidden border border-gray-light hover:shadow-lg transition-all"
              >
                <div
                  className={`aspect-video relative overflow-hidden ${
                    !otherRoom.images || otherRoom.images.length === 0 ? otherRoom.placeholderClass : ''
                  }`}
                >
                  {otherRoom.images && otherRoom.images.length > 0 && (
                    <Image
                      src={otherRoom.images[0]}
                      alt={otherRoom.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                </div>
                <div className="p-6">
                  <p className="text-primary-gold text-xs uppercase tracking-wider mb-1">
                    {otherRoom.subtitle}
                  </p>
                  <h3 className="font-heading text-xl font-medium text-primary-dark group-hover:text-primary-gold transition-colors">
                    {otherRoom.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* CTA Section */}
      <CTASection
        title="Ready to Book?"
        description="Contact us to check availability and start planning your stay."
        ctaText="Make an Enquiry"
        ctaHref="/contact"
        background="gold"
      />
    </>
  );
}
