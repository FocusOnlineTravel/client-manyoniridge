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

export const rates: RateData = {
  currency: 'ZAR',
  currencySymbol: 'R',
  perPersonSharing: 15000,
  singleSupplement: 50,
  luxVillaUnit: 55000,
  exclusiveUse: {
    rate: 300000,
    capacity: 24,
  },
  notes: [
    'All rates are per night',
    'All inclusive (accommodation, meals, selected beverages, two game drives daily)',
    'Premium alcohol excluded',
    'Children under 6 permitted on a private vehicle only. (Private vehicle rates on request)',
    'Exclusive use rate applies to corporate bookings',
  ],
};

export function calculateSingleRate(rate: RateData): number {
  return Math.round(rate.perPersonSharing * (1 + rate.singleSupplement / 100));
}
