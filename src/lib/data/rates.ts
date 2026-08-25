export interface RateData {
  currency: string;
  currencySymbol: string;
  oneBedroom: {
    perPersonSharing: number;
    singleSupplement: number;
  };
  twoBedroom: {
    perPerson: number;
    minAdults: number;
  };
  honeymoon: {
    perPersonSharing: number;
    singleSupplement: number;
  };
  exclusiveUse: {
    rate: number;
    capacity: number;
  };
  notes: string[];
}

export const rates: RateData = {
  currency: 'ZAR',
  currencySymbol: 'R',
  oneBedroom: {
    perPersonSharing: 11500,
    singleSupplement: 17250,
  },
  twoBedroom: {
    perPerson: 11500,
    minAdults: 3,
  },
  honeymoon: {
    perPersonSharing: 12500,
    singleSupplement: 18750,
  },
  exclusiveUse: {
    rate: 210000,
    capacity: 24,
  },
  notes: [
    'All rates are per night, quoted in ZAR and include 15% VAT',
    'Based on a minimum stay of two consecutive nights',
    'All-inclusive: accommodation, meals, selected beverages, two daily game drives',
    'Two-Bedroom Villa: minimum charge of 3 adults per villa; up to 2 additional children at 50%',
    'Children up to 5 stay free · ages 6–11 pay 50% · 12 and older pay the full adult rate',
    'Conservation levy: R200 per adult per night, R100 per child (under 13) per night',
    'Excludes premium beverages, road transfers, spa treatments, and gratuities',
  ],
};
