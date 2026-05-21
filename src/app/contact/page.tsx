import type { Metadata } from 'next';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { HeroImage } from '@/components/sections/HeroImage';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { GravityFormRenderer } from '@/components/forms/GravityFormRenderer';
import { Tabs } from '@/components/ui/Tabs';
import { CONTACT } from '@/lib/constants';
import { SchemaMarkup } from '@/components/ui/SchemaMarkup';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.manyoniridge.co.za"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Contact",
      "item": "https://www.manyoniridge.co.za/contact"
    }
  ]
};

export const metadata: Metadata = {
  title: 'Contact Us - Book Your Safari Experience',
  description:
    'Contact Manyoni Ridge Safari Lodge to book your luxury Big 5 safari experience in KwaZulu-Natal. Get in touch for enquiries, bookings, and safari planning assistance.',
};

export default function ContactPage() {
  const tabs = [
    {
      id: 'enquiry',
      label: 'Booking Enquiry',
      content: <GravityFormRenderer formId={2} />,
    },
    {
      id: 'contact',
      label: 'General Contact',
      content: <GravityFormRenderer formId={1} />,
    },
  ];

  return (
    <>
      <SchemaMarkup data={breadcrumbSchema} />
      {/* Hero Section */}
      <HeroImage
        subtitle="Contact"
        title="Get in Touch"
        description="We'd love to hear from you. Reach out to start planning your safari adventure."
        size="large"
        imageSrc="/images/MANYONI RIDGE CLUBHOUSE RENDERS 12.jpg"
        showScrollIndicator={false}
        verticalAlign="bottom"
      />

      {/* Contact Section */}
      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <Heading as="h2" className="text-2xl">
              Contact Information
            </Heading>

            <div className="space-y-6 mt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-cream text-primary-gold rounded-full">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-primary-dark mb-1">Phone</h3>
                  <a
                    href={CONTACT.phoneLink}
                    className="text-gray-medium hover:text-primary-gold transition-colors"
                  >
                    {CONTACT.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-cream text-primary-gold rounded-full">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-primary-dark mb-1">Email</h3>
                  <a
                    href={CONTACT.emailLink}
                    className="text-gray-medium hover:text-primary-gold transition-colors"
                  >
                    {CONTACT.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-cream text-primary-gold rounded-full">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-primary-dark mb-1">Location</h3>
                  <p className="text-gray-medium">{CONTACT.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-cream text-primary-gold rounded-full">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-primary-dark mb-1">Response Time</h3>
                  <p className="text-gray-medium">
                    We respond to all enquiries within 24-48 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Forms */}
          <div className="lg:col-span-2">
            <Tabs tabs={tabs} />
          </div>
        </div>
      </Section>

      {/* Getting Here */}
      <Section background="cream" id="directions">
        <Heading
          as="h2"
          subtitle="Manyoni Ridge is accessible by road from Durban or Richards Bay, or via charter flight."
          centered
        >
          Getting Here
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <h3 className="font-heading text-xl font-medium text-primary-dark mb-2">
              From Durban
            </h3>
            <p className="text-gray-medium text-sm">
              Approximately 3 hours by road from King Shaka International Airport.
              Self-drive or private transfer available.
            </p>
          </div>
          <div className="text-center">
            <h3 className="font-heading text-xl font-medium text-primary-dark mb-2">
              From Richards Bay
            </h3>
            <p className="text-gray-medium text-sm">
              Approximately 1.5 hours by road. The closest commercial airport.
              Private transfers can be arranged.
            </p>
          </div>
          <div className="text-center">
            <h3 className="font-heading text-xl font-medium text-primary-dark mb-2">
              Charter Flight
            </h3>
            <p className="text-gray-medium text-sm">
              Charter flights can be arranged to nearby airstrips. Please contact
              us for recommendations and arrangements.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
