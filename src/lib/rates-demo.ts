/**
 * Rates demo data — CLIENT DEMO ONLY
 *
 * Reflects the finalised 2027 Rate Sheet PDF (public/2027 Rate Sheet
 * Manyoni Ridge.pdf). International and SADC 2027 pricing is identical
 * for every villa except the Honeymoon single supplement, which differs
 * by R500 in the PDF (Int'l R18 750 vs SADC R18 250) — retained as
 * printed pending client confirmation.
 *
 * Only 2027 pricing has been provided; the year toggle is a single-year
 * type and the UI hides the selector when RATES_YEARS has one entry.
 */

export type RatesTier = 'international' | 'sadc';
export type RatesYear = '2027';

export const RATES_TIERS: RatesTier[] = ['international', 'sadc'];
export const RATES_YEARS: RatesYear[] = ['2027'];

export interface RateEntry {
  villaTitle: string;
  price: number;
  priceLabel: string;
  singleSupplement?: number;
  note?: string;
}

export interface Special {
  headline: string;
  explanation: string;
  conditions?: string;
}

export interface TierYearData {
  rates: RateEntry[];
  specials: Special[];
}

export interface VillaSpec {
  slug: string;
  title: string;
  count: string;
  capacity: string;
  features: string[];
  imageSlots: Array<{ label: string; isAmipod?: boolean }>;
  placeholderClass: string;
}

export interface TermsSection {
  id: string;
  title: string;
  intro?: string;
  bullets: string[];
}

const rates2027International: RateEntry[] = [
  {
    villaTitle: 'One-Bedroom Luxury Villa',
    price: 11500,
    priceLabel: 'per person sharing per night',
    singleSupplement: 17250,
  },
  {
    villaTitle: 'Two-Bedroom Luxury Villa',
    price: 11500,
    priceLabel: 'per person per night',
    note: 'Minimum charge of 3 adults per villa · up to 2 additional children at 50% of the adult rate',
  },
  {
    villaTitle: 'Honeymoon Villa',
    price: 12500,
    priceLabel: 'per person sharing per night',
    singleSupplement: 18750,
  },
  {
    villaTitle: 'Exclusive Use',
    price: 210000,
    priceLabel: 'per night',
    note: 'Up to 24 guests sharing',
  },
];

const rates2027SADC: RateEntry[] = [
  {
    villaTitle: 'One-Bedroom Luxury Villa',
    price: 11500,
    priceLabel: 'per person sharing per night',
    singleSupplement: 17250,
  },
  {
    villaTitle: 'Two-Bedroom Luxury Villa',
    price: 11500,
    priceLabel: 'per person per night',
    note: 'Minimum charge of 3 adults per villa · up to 2 additional children at 50% of the adult rate',
  },
  {
    villaTitle: 'Honeymoon Villa',
    price: 12500,
    priceLabel: 'per person sharing per night',
    singleSupplement: 18250,
  },
  {
    villaTitle: 'Exclusive Use',
    price: 210000,
    priceLabel: 'per night',
    note: 'Up to 24 guests sharing',
  },
];

const internationalSpecials2027: Special[] = [
  {
    headline: 'Stay 3 Nights, Pay for 2',
    explanation:
      'Book three consecutive nights and only pay for two.',
    conditions:
      'Valid for travel from opening through 31 December 2027 · subject to availability',
  },
  {
    headline: 'Complimentary Rhino Orphanage Visit',
    explanation:
      'A guided visit to a local rhino orphanage, complimentary for guests staying with us.',
    conditions: 'Valued at R2 000 per guest · subject to availability',
  },
];

const sadcSpecials2027: Special[] = [
  {
    headline: 'Stay 2 Nights, Pay for 1',
    explanation:
      'SADC residents pay for one night and stay for two.',
    conditions:
      'Can be used for consecutive nights and repeat bookings · valid South African or SADC ID/passport required prior to confirmation · alcoholic beverage package excluded from special SADC promotional rates',
  },
];

export const ratesDemo = {
  currency: 'ZAR',
  vatRate: 15,
  tiers: {
    international: {
      '2027': { rates: rates2027International, specials: internationalSpecials2027 },
    },
    sadc: {
      '2027': { rates: rates2027SADC, specials: sadcSpecials2027 },
    },
  } satisfies Record<RatesTier, Record<RatesYear, TierYearData>>,

  villas: [
    {
      slug: 'lux-two-bedroom-villa',
      title: 'Lux Two-Bedroom Villa',
      count: '×3',
      capacity: 'Up to 4 adults + 2 children',
      features: [
        'Two king-size bedrooms with en-suites',
        'Indoor and outdoor showers',
        'Freestanding bathtub',
        'Mini bar & coffee station',
        'Private boma',
        'Heated private plunge pool',
        'Covered patio with swing bed',
        'Air conditioning',
        'In-room safe',
      ],
      imageSlots: [
        { label: 'Interior — living / main bedroom' },
        { label: 'Bathroom / indoor + outdoor shower' },
        { label: 'Plunge pool + outdoor terrace with swing bed' },
      ],
      placeholderClass: 'placeholder-room',
    },
    {
      slug: 'lux-one-bedroom-villa',
      title: 'Lux One-Bedroom Villa',
      count: '×5',
      capacity: 'Up to 2 adults + 1 child',
      features: [
        'Extra-length king-size bed',
        'Indoor and outdoor showers',
        'Freestanding bathtub',
        'Mini bar & coffee station',
        'Private boma',
        'Private outdoor hot tub',
        'Covered patio with swing bed',
        'Air conditioning & ceiling fans',
        'In-room safe',
      ],
      imageSlots: [
        { label: 'Interior — bedroom + lounge' },
        { label: 'Bath + indoor / outdoor shower' },
        { label: 'AMIPOD — outdoor hot tub on deck', isAmipod: true },
      ],
      placeholderClass: 'placeholder-room',
    },
    {
      slug: 'honeymoon-villa',
      title: 'Honeymoon Villa',
      count: '×1',
      capacity: 'Up to 2 adults + 1 child',
      features: [
        'Premium views overlooking the waterhole',
        'Extra-length king-size bed',
        'Indoor and outdoor showers',
        'Freestanding bathtub',
        'Mini bar & coffee station',
        'Private boma',
        'Private outdoor hot tub & spa bath',
        'Covered patio with swing bed',
        'Air conditioning & ceiling fans',
        'In-room safe',
      ],
      imageSlots: [
        { label: 'Interior — bedroom + lounge' },
        { label: 'Bath + indoor / outdoor shower' },
        { label: 'AMIPOD — outdoor hot tub on deck', isAmipod: true },
      ],
      placeholderClass: 'placeholder-room',
    },
  ] satisfies VillaSpec[],

  villasFootnote:
    'Twin-bed configuration available on request. Triple occupancy available on request and subject to availability.',

  inclusions: [
    'Luxury fully serviced accommodation',
    'Two scheduled game drives daily in an open safari vehicle',
    'Guided walking safaris (subject to availability and guide discretion)',
    'Game drive refreshments, including drinks and snacks',
    'All meals',
    'Complimentary laundry service',
    'Complimentary Wi-Fi in all guest villas and the Main Lodge',
    'All beverages excluding premium brands and reserve wines (for on-site consumption only)',
  ],

  exclusions: [
    'Personal travel insurance (compulsory)',
    'Premium beverages and cellar reserve wines',
    'Road transfers to and from Manyoni Private Game Reserve',
    'Conservation levies',
    'Wellness spa treatments (bookings recommended)',
    'Curio shop purchases',
    'Gratuities',
    'Any additional items of a personal nature not specifically included above',
  ],

  conservationLevies: {
    year: '2027',
    adult: 200,
    child: 100,
    note: 'Applicable for 2027 and subject to change.',
  },

  terms: [
    {
      id: 'rates',
      title: 'Rates',
      bullets: [
        'Include 15% Value Added Tax (VAT)',
        'Quoted in South African Rand (ZAR)',
        'Subject to availability at the time of booking',
        'Based on a minimum stay of two consecutive nights',
        'Published rates are subject to change without prior notice',
        'Confirmed reservations will be honoured at the contracted rate',
      ],
    },
    {
      id: 'children',
      title: 'Children',
      intro: 'Children of all ages are welcome.',
      bullets: [
        'Children up to 5 years stay free of charge',
        'Children aged 6–11 pay 50% of the adult rate',
        'Children 12 years and older are charged the full adult rate',
        'Participation of children in safari activities is at the discretion of lodge management and the assigned guide, with the safety and enjoyment of all guests being our priority',
        'For safety reasons, children under the age of 5 are not permitted to join standard game drives. A child-friendly "Bumble" safari experience will be arranged following the morning game drive, allowing younger guests to enjoy an age-appropriate introduction to the safari environment',
        'Professional childcare services are available on request, subject to availability',
      ],
    },
    {
      id: 'payments',
      title: 'Payments & Deposits',
      bullets: [
        '30% deposit to confirm a booking, balance due 60 days prior to arrival',
        'Groups of 3 or more rooms: 30% non-refundable deposit, balance due 90 days prior to arrival',
        'Full lodge buyout: 50% non-refundable deposit, or a 120-day lead time',
        'Bookings made within 60 days of travel require full pre-payment',
        'Bank charges are payable by the guest',
        '5% admin fee on credit card payments for commissionable bookings and on all Amex payments',
        'Extras to be settled at the lodge before departure',
        'Provisional bookings are held for 7 days',
      ],
    },
    {
      id: 'cancellations-standard',
      title: 'Cancellations (Standard)',
      bullets: [
        'Cancellation or part-cancellation of a confirmed reservation — including reducing rooms, guests or nights, or changing travel dates — forfeits the 30% deposit',
        '59–31 days before arrival: 50% penalty',
        '30–0 days before arrival: 100% penalty',
        'The lodge reserves the right to cancel a booking if full payment has not been received 60 days prior to arrival',
      ],
    },
    {
      id: 'cancellations-groups',
      title: 'Cancellations (Groups of 3+ Rooms)',
      intro:
        'As a small, exclusive property that mostly takes single bookings, group bookings carry disproportionate risk for us — so group cancellation terms are firmer than the standard policy.',
      bullets: [
        'Deposit forfeiture applies as per the standard policy',
        '90–60 days before arrival: 50% penalty',
        '60–0 days before arrival: 100% penalty',
      ],
    },
    {
      id: 'sadc-conditions',
      title: 'SADC Rate Conditions',
      bullets: [
        'Valid South African or SADC ID/passport required prior to booking confirmation',
        'Stay 2 Nights, Pay for 1 — can be used for consecutive nights and repeat bookings',
        'Alcoholic beverage package excluded from special SADC promotional rates',
      ],
    },
    {
      id: 'payment-methods',
      title: 'Payment Methods',
      bullets: [
        'Visa',
        'Mastercard',
        'American Express',
        'Direct Bank Transfer',
        'PayFast',
        "Traveller's Cheques are not accepted",
      ],
    },
  ] satisfies TermsSection[],
};

/**
 * Format a ZAR amount using the SA convention — a narrow no-break
 * space as the thousands separator (e.g. R15 000, not R15,000).
 */
export function formatZAR(amount: number): string {
  const withSep = String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `R${withSep}`;
}

export function parseTier(value: string | string[] | undefined): RatesTier {
  return value === 'sadc' ? 'sadc' : 'international';
}

export function parseYear(_value: string | string[] | undefined): RatesYear {
  return '2027';
}
