import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Users, Bed, Bath, Maximize, Check } from 'lucide-react';
import { HeroImage } from '@/components/sections/HeroImage';
import { CTASection } from '@/components/sections/CTASection';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { rooms, getRoomBySlug, getAllRoomSlugs } from '@/data/rooms';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllRoomSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomBySlug(slug);

  if (!room) {
    return {
      title: 'Room Not Found',
    };
  }

  return {
    title: room.title,
    description: room.shortDescription,
  };
}

export default async function RoomDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);

  if (!room) {
    notFound();
  }

  // Get other rooms for cross-sell
  const otherRooms = rooms.filter((r) => r.slug !== room.slug);

  return (
    <>
      {/* Hero Section */}
      <HeroImage
        subtitle={room.subtitle}
        title={room.title}
        size="large"
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
          Back to All Accommodations
        </Link>
      </Section>

      {/* Room Details */}
      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-primary-dark mb-6">
              About This Suite
            </h2>
            <div className="prose prose-lg text-gray-medium max-w-none">
              {room.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Features */}
            <div className="mt-10">
              <h3 className="font-heading text-2xl font-medium text-primary-dark mb-4">
                Suite Features
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
                    {room.capacity.adults} Adults
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
                    className="flex items-center gap-2 text-sm text-gray-medium"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-gold rounded-full" />
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <Button href="/contact" className="w-full">
              Enquire About This Suite
            </Button>
          </div>
        </div>
      </Section>

      {/* Image Gallery Placeholder */}
      <Section background="off-white">
        <h2 className="font-heading text-3xl font-medium text-primary-dark mb-8 text-center">
          Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`aspect-square ${room.placeholderClass}`}
              role="img"
              aria-label={`${room.title} gallery image ${i}`}
            />
          ))}
        </div>
      </Section>

      {/* Other Rooms */}
      {otherRooms.length > 0 && (
        <Section background="white">
          <h2 className="font-heading text-3xl font-medium text-primary-dark mb-8 text-center">
            Explore Other Suites
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherRooms.map((otherRoom) => (
              <Link
                key={otherRoom.slug}
                href={`/accommodations/${otherRoom.slug}`}
                className="group block bg-white overflow-hidden border border-gray-light hover:shadow-lg transition-all"
              >
                <div
                  className={`aspect-video ${otherRoom.placeholderClass}`}
                  role="img"
                  aria-label={otherRoom.title}
                />
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
