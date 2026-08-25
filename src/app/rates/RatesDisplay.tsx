import { rates } from '@/lib/data/rates';
import { Check } from 'lucide-react';

function formatZAR(amount: number): string {
  return `${rates.currencySymbol}${amount.toLocaleString('en-ZA').replace(/,/g, ' ')}`;
}

export function RatesDisplay() {
  return (
    <div className="space-y-12">
      {/* Villa Rates */}
      <div>
        <h2 className="font-heading text-3xl text-primary-dark mb-8 text-center">
          Villa Rates
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* One-Bedroom Luxury Villa */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <h3 className="font-heading text-2xl text-primary-dark mb-2">
              One-Bedroom Luxury Villa
            </h3>
            <p className="text-gray-medium text-sm mb-6">Up to 2 adults + 1 child</p>

            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-heading text-primary-gold">
                  {formatZAR(rates.oneBedroom.perPersonSharing)}
                </span>
                <span className="text-gray-medium text-sm">per person sharing</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-heading text-primary-dark">
                  {formatZAR(rates.oneBedroom.singleSupplement)}
                </span>
                <span className="text-gray-medium text-sm">single supplement</span>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-medium">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary-gold flex-shrink-0" />
                <span>All-inclusive</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary-gold flex-shrink-0" />
                <span>Two game drives daily</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary-gold flex-shrink-0" />
                <span>Private outdoor hot tub</span>
              </div>
            </div>
          </div>

          {/* Two-Bedroom Luxury Villa */}
          <div className="bg-white border-2 border-primary-gold rounded-lg p-8 shadow-md relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-gold text-white px-4 py-1 rounded-full text-sm font-medium">
              Family Choice
            </div>

            <h3 className="font-heading text-2xl text-primary-dark mb-2">
              Two-Bedroom Luxury Villa
            </h3>
            <p className="text-gray-medium text-sm mb-6">Up to 4 adults + 2 children</p>

            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-heading text-primary-gold">
                  {formatZAR(rates.twoBedroom.perPerson)}
                </span>
                <span className="text-gray-medium text-sm">per person</span>
              </div>
              <p className="text-sm text-gray-medium">
                Minimum {rates.twoBedroom.minAdults} adults per villa · children at 50%
              </p>
            </div>

            <div className="space-y-2 text-sm text-gray-medium">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary-gold flex-shrink-0" />
                <span>All-inclusive</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary-gold flex-shrink-0" />
                <span>Two king en-suite bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary-gold flex-shrink-0" />
                <span>Heated private plunge pool</span>
              </div>
            </div>
          </div>

          {/* Honeymoon Villa */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <h3 className="font-heading text-2xl text-primary-dark mb-2">
              Honeymoon Villa
            </h3>
            <p className="text-gray-medium text-sm mb-6">Up to 2 adults + 1 child</p>

            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-heading text-primary-gold">
                  {formatZAR(rates.honeymoon.perPersonSharing)}
                </span>
                <span className="text-gray-medium text-sm">per person sharing</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-heading text-primary-dark">
                  {formatZAR(rates.honeymoon.singleSupplement)}
                </span>
                <span className="text-gray-medium text-sm">single supplement</span>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-medium">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary-gold flex-shrink-0" />
                <span>Premium waterhole views</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary-gold flex-shrink-0" />
                <span>Private outdoor hot tub &amp; spa bath</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary-gold flex-shrink-0" />
                <span>All-inclusive</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exclusive Use */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-primary-cream border border-primary-gold/20 rounded-lg p-8">
          <h3 className="font-heading text-2xl text-primary-dark mb-4 text-center">
            Exclusive Use
          </h3>
          <p className="text-gray-medium text-center mb-6">
            Book the entire lodge for ultimate privacy
          </p>

          <div className="text-center mb-6">
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span className="text-5xl font-heading text-primary-gold">
                {formatZAR(rates.exclusiveUse.rate)}
              </span>
              <span className="text-gray-medium">per night</span>
            </div>
            <p className="text-sm text-gray-medium">
              Up to {rates.exclusiveUse.capacity} guests sharing
            </p>
          </div>

          <div className="bg-white rounded p-4 text-sm text-gray-medium text-center">
            <p className="font-medium text-primary-dark mb-2">Perfect for:</p>
            <p>Corporate retreats, family celebrations, private gatherings</p>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="max-w-3xl mx-auto">
        <h3 className="font-heading text-xl text-primary-dark mb-4">Important Information</h3>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <ul className="space-y-2 text-sm text-gray-medium">
            {rates.notes.map((note, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary-gold mt-1">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* SADC Enquiry Note */}
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-primary-cream/60 border border-primary-gold/20 rounded-lg p-6">
          <p className="text-primary-dark font-medium mb-2">SADC Residents</p>
          <p className="text-sm text-gray-medium mb-4">
            Special rates and a Stay 2 Nights, Pay for 1 offer are available for SADC residents (valid ID/passport required).
          </p>
          <a
            href="/contact"
            className="inline-block text-primary-gold text-sm font-medium hover:underline"
          >
            Enquire for SADC rates →
          </a>
        </div>
      </div>

      {/* Currency Note */}
      <div className="text-center text-sm text-gray-medium">
        <p>
          All rates displayed in {rates.currency} ({rates.currencySymbol})
        </p>
        <p className="mt-2">
          Rates subject to change. Please contact us for a confirmed quote.
        </p>
      </div>
    </div>
  );
}
