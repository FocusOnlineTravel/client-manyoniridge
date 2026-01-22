import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Users, Check, AlertCircle } from 'lucide-react';
import { HeroImage } from '@/components/sections/HeroImage';
import { ActivityCard } from '@/components/sections/ActivityCard';
import { CTASection } from '@/components/sections/CTASection';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { activities, getActivityBySlug, getAllActivitySlugs } from '@/data/activities';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllActivitySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const activity = getActivityBySlug(slug);

  if (!activity) {
    return {
      title: 'Activity Not Found',
    };
  }

  return {
    title: activity.title,
    description: activity.shortDescription,
  };
}

export default async function ActivityDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const activity = getActivityBySlug(slug);

  if (!activity) {
    notFound();
  }

  // Get other activities for cross-sell
  const otherActivities = activities
    .filter((a) => a.slug !== activity.slug)
    .slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <HeroImage
        subtitle={activity.subtitle}
        title={activity.title}
        size="large"
        placeholderClass={activity.placeholderClass}
        showScrollIndicator={false}
      />

      {/* Back Link */}
      <Section background="white" noPadding className="py-6 border-b border-gray-light">
        <Link
          href="/activities"
          className="inline-flex items-center gap-2 text-sm text-gray-medium hover:text-primary-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Activities
        </Link>
      </Section>

      {/* Activity Details */}
      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-primary-dark mb-6">
              About This Experience
            </h2>
            <div className="prose prose-lg text-gray-medium max-w-none">
              {activity.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Highlights */}
            <div className="mt-10">
              <h3 className="font-heading text-2xl font-medium text-primary-dark mb-4">
                Highlights
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activity.highlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-gray-medium"
                  >
                    <Check className="w-5 h-5 text-primary-gold flex-shrink-0" />
                    {highlight}
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
                Activity Details
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-medium">
                  <Clock className="w-5 h-5 text-primary-gold" />
                  <span>Duration: {activity.duration}</span>
                </li>
                {activity.difficulty && (
                  <li className="flex items-center gap-3 text-gray-medium">
                    <AlertCircle className="w-5 h-5 text-primary-gold" />
                    <span>Difficulty: {activity.difficulty}</span>
                  </li>
                )}
                {activity.minAge && (
                  <li className="flex items-center gap-3 text-gray-medium">
                    <Users className="w-5 h-5 text-primary-gold" />
                    <span>Minimum Age: {activity.minAge} years</span>
                  </li>
                )}
              </ul>
            </div>

            {/* What's Included Card */}
            <div className="bg-white border border-gray-light p-6 mb-6">
              <h3 className="font-heading text-xl font-medium text-primary-dark mb-4">
                What&apos;s Included
              </h3>
              <ul className="space-y-2">
                {activity.includes.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-medium"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-gold rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <Button href="/contact" className="w-full">
              Enquire About This Activity
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
              className={`aspect-square ${activity.placeholderClass}`}
              role="img"
              aria-label={`${activity.title} gallery image ${i}`}
            />
          ))}
        </div>
      </Section>

      {/* Other Activities */}
      {otherActivities.length > 0 && (
        <Section background="white">
          <h2 className="font-heading text-3xl font-medium text-primary-dark mb-8 text-center">
            More Activities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherActivities.map((otherActivity, index) => (
              <ActivityCard
                key={otherActivity.slug}
                activity={otherActivity}
                index={index}
              />
            ))}
          </div>
        </Section>
      )}

      {/* CTA Section */}
      <CTASection
        title="Plan Your Safari"
        description="Ready to experience the magic of Manyoni Ridge? Get in touch to start planning."
        ctaText="Make an Enquiry"
        ctaHref="/contact"
        background="gold"
      />
    </>
  );
}
