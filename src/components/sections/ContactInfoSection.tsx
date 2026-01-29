import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { ContactInfoSectionProps } from '@/lib/types';
import { CONTACT } from '@/lib/constants';

/**
 * ContactInfoSection - Display contact information
 */
export function ContactInfoSection({ background = 'white' }: ContactInfoSectionProps) {
  const sectionBackground =
    background === 'primary-dark'
      ? 'dark'
      : background === 'gold' || background === 'image'
        ? 'white'
        : background;

  return (
    <Section background={sectionBackground}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-gold/10 mb-4">
            <Phone className="w-6 h-6 text-primary-gold" />
          </div>
          <h3 className="font-heading text-lg font-medium text-primary-dark mb-2">Phone</h3>
          <a href={`tel:${CONTACT.phone}`} className="text-gray-600 hover:text-primary-gold">
            {CONTACT.phone}
          </a>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-gold/10 mb-4">
            <Mail className="w-6 h-6 text-primary-gold" />
          </div>
          <h3 className="font-heading text-lg font-medium text-primary-dark mb-2">Email</h3>
          <a
            href={`mailto:${CONTACT.email}`}
            className="text-gray-600 hover:text-primary-gold"
          >
            {CONTACT.email}
          </a>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-gold/10 mb-4">
            <MapPin className="w-6 h-6 text-primary-gold" />
          </div>
          <h3 className="font-heading text-lg font-medium text-primary-dark mb-2">Location</h3>
          <p className="text-gray-600">{CONTACT.location}</p>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-gold/10 mb-4">
            <Clock className="w-6 h-6 text-primary-gold" />
          </div>
          <h3 className="font-heading text-lg font-medium text-primary-dark mb-2">
            Office Hours
          </h3>
          <p className="text-gray-600">Mon - Fri: 8am - 5pm</p>
        </div>
      </div>
    </Section>
  );
}
