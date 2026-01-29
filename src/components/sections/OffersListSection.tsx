import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { OffersListSectionProps } from '@/lib/types';

/**
 * OffersListSection - Display special offers
 */
export function OffersListSection({ offers, background = 'white' }: OffersListSectionProps) {
  const sectionBackground =
    background === 'primary-dark'
      ? 'dark'
      : background === 'gold' || background === 'image'
        ? 'white'
        : background;

  return (
    <Section background={sectionBackground}>
      <div className="space-y-12">
        {offers.map((offer, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
              <div className="inline-block bg-primary-gold/10 text-primary-gold px-4 py-1 rounded-full text-sm font-medium mb-4">
                {offer.subtitle}
              </div>
              <h3 className="font-heading text-3xl text-primary-dark font-medium mb-4">
                {offer.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">{offer.description}</p>

              <ul className="space-y-2 mb-6">
                {offer.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-primary-gold mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>

              <p className="text-sm text-gray-500 mb-4">Valid until: {offer.validUntil}</p>

              <Button href="/contact">Book This Offer</Button>
            </div>

            <div className={`relative h-96 rounded-lg overflow-hidden ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
              <Image
                src={offer.imageSrc}
                alt={offer.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
