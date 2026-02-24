'use client';

import { useState, useEffect } from 'react';
import { detectUserRegion, type UserRegion } from '@/lib/geo';
import { getRatesForRegion, calculateSingleRate, type RateData } from '@/lib/data/rates';
import { Check } from 'lucide-react';

export function RatesDisplay() {
  const [region, setRegion] = useState<UserRegion | null>(null);
  const [rates, setRates] = useState<RateData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRates() {
      try {
        const detectedRegion = await detectUserRegion();
        setRegion(detectedRegion);
        setRates(getRatesForRegion(detectedRegion));
      } catch (error) {
        console.error('Error loading rates:', error);
        // Default to INTERNATIONAL if detection fails
        const defaultRegion: UserRegion = 'INTERNATIONAL';
        setRegion(defaultRegion);
        setRates(getRatesForRegion(defaultRegion));
      } finally {
        setLoading(false);
      }
    }

    loadRates();
  }, []);

  if (loading || !rates) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-gold"></div>
      </div>
    );
  }

  const singleRate = calculateSingleRate(rates);

  return (
    <div className="space-y-12">
      {/* Villa Rates */}
      <div>
        <h2 className="font-heading text-3xl text-primary-dark mb-8 text-center">
          Villa Rates
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* One Bedroom Villa */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <h3 className="font-heading text-2xl text-primary-dark mb-2">Villa</h3>
            <p className="text-gray-medium text-sm mb-6">One Bedroom</p>

            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-heading text-primary-gold">
                  {rates.currencySymbol}{rates.perPersonSharing.toLocaleString()}
                </span>
                <span className="text-gray-medium text-sm">per person sharing</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-heading text-primary-dark">
                  {rates.currencySymbol}{singleRate.toLocaleString()}
                </span>
                <span className="text-gray-medium text-sm">single occupancy</span>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-medium">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary-gold flex-shrink-0" />
                <span>All inclusive</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary-gold flex-shrink-0" />
                <span>Two game drives daily</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary-gold flex-shrink-0" />
                <span>All meals included</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary-gold flex-shrink-0" />
                <span>Selected beverages</span>
              </div>
            </div>
          </div>

          {/* Two Bedroom Lux Villa */}
          <div className="bg-white border-2 border-primary-gold rounded-lg p-8 shadow-md relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-gold text-white px-4 py-1 rounded-full text-sm font-medium">
              Family Choice
            </div>

            <h3 className="font-heading text-2xl text-primary-dark mb-2">Lux Villa</h3>
            <p className="text-gray-medium text-sm mb-6">Two Bedroom</p>

            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-heading text-primary-gold">
                  {rates.currencySymbol}{rates.luxVillaUnit.toLocaleString()}
                </span>
                <span className="text-gray-medium text-sm">per unit</span>
              </div>
              <p className="text-sm text-gray-medium">Sleeps up to 4 guests</p>
            </div>

            <div className="space-y-2 text-sm text-gray-medium">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary-gold flex-shrink-0" />
                <span>All inclusive</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary-gold flex-shrink-0" />
                <span>Two game drives daily</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary-gold flex-shrink-0" />
                <span>All meals included</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary-gold flex-shrink-0" />
                <span>Private heated plunge pool</span>
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
                {rates.currencySymbol}{rates.exclusiveUse.rate.toLocaleString()}
              </span>
              <span className="text-gray-medium">per night</span>
            </div>
            <p className="text-sm text-gray-medium">
              Accommodates up to {rates.exclusiveUse.capacity} guests
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
