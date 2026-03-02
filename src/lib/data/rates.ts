import { UserRegion } from '@/lib/geo';

/**
 * Rate structure for different user regions
 */
export interface RateData {
  currency: string;
  currencySymbol: string;
  perPersonSharing: number;
  singleSupplement: number; // percentage
  luxVillaUnit: number;
  exclusiveUse: {
    rate: number;
    capacity: number;
  };
  notes: string[];
}

export const rates: Record<UserRegion, RateData> = {
  SADC: {
    currency: 'ZAR',
    currencySymbol: 'R',
    perPersonSharing: 7500,
    singleSupplement: 30, // 30% increase
    luxVillaUnit: 30000,
    exclusiveUse: {
      rate: 150000,
      capacity: 24,
    },
    notes: [
      'All rates are per night',
      'All inclusive (accommodation, meals, selected beverages, two game drives daily)',
      'Premium alcohol excluded',
      'Children under 6 permitted on a private vehicle only. (Private vehicle rates on request)',
      'Exclusive use rate applies to corporate bookings',
    ],
  },
  INTERNATIONAL: {
    currency: 'USD',
    currencySymbol: '$',
    perPersonSharing: 1000,
    singleSupplement: 30, // 30% increase
    luxVillaUnit: 4000, // Approximate USD equivalent for 2-bed
    exclusiveUse: {
      rate: 20000, // Approximate USD equivalent
      capacity: 24,
    },
    notes: [
      'All rates are per night',
      'All inclusive (accommodation, meals, selected beverages, two game drives daily)',
      'Premium alcohol excluded',
      'Children under 6 permitted on a private vehicle only. (Private vehicle rates on request)',
      'Exclusive use rate applies to corporate bookings',
    ],
  },
};

/**
 * Get rates for a specific region
 */
export function getRatesForRegion(region: UserRegion): RateData {
  return rates[region];
}

/**
 * Calculate single person rate
 */
export function calculateSingleRate(rate: RateData): number {
  return Math.round(rate.perPersonSharing * (1 + rate.singleSupplement / 100));
}
