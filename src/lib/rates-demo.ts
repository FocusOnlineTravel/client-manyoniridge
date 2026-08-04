/**
 * Rates demo data — CLIENT DEMO ONLY
 *
 * This file backs the /rates-demo route while the client signs off on
 * pricing, specials, and T&Cs. Once approved, this shape should be
 * mapped directly onto ACF fields in WordPress and this file removed.
 *
 * Structure: rates + specials are keyed by tier then year so each cell
 * can diverge independently later. Everything else is shared.
 */

export type RatesTier = 'international' | 'sadc';
export type RatesYear = '2027' | '2028' | '2029';

export const RATES_TIERS: RatesTier[] = ['international', 'sadc'];
export const RATES_YEARS: RatesYear[] = ['2027', '2028', '2029'];

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

/**
 * NOTE: 2027 rate figures for International and SADC are identical for
 * every villa. The specials are what actually differ. Keeping the two
 * tiers as separate keys so pricing can diverge later without a
 * refactor — but flag with the client whether SADC should have its own
 * pricing tier at all, or only the specials.
 */
const rates2027: RateEntry[] = [
  {
    villaTitle: 'One-Bedroom Lux Villa',
    price: 15000,
    priceLabel: 'per person per night sharing',
    singleSupplement: 22500,
  },
  {
    villaTitle: 'Two-Bedroom Lux Villa',
    price: 60000,
    priceLabel: 'per unit per night',
    note: 'Sleeps up to 4',
  },
  {
    villaTitle: 'Honeymoon Villa',
    price: 16000,
    priceLabel: 'per person per night sharing',
    singleSupplement: 24000,
    note: 'Includes a spa treatment at 50% off',
  },
  {
    villaTitle: 'Exclusive Use',
    price: 275000,
    priceLabel: 'per night',
    note: 'Up to 24 pax sharing',
  },
];

const rates2028: RateEntry[] = [
  {
    villaTitle: 'One-Bedroom Lux Villa',
    price: 16500,
    priceLabel: 'per person per night sharing',
    singleSupplement: 24750,
  },
  {
    villaTitle: 'Two-Bedroom Lux Villa',
    price: 66000,
    priceLabel: 'per unit per night',
    note: 'Sleeps up to 4',
  },
  {
    villaTitle: 'Honeymoon Villa',
    price: 17500,
    priceLabel: 'per person per night sharing',
    singleSupplement: 26250,
    note: 'Includes a spa treatment at 50% off',
  },
  {
    villaTitle: 'Exclusive Use',
    price: 300000,
    priceLabel: 'per night',
    note: 'Up to 24 pax sharing',
  },
];

const rates2029: RateEntry[] = [
  {
    villaTitle: 'One-Bedroom Lux Villa',
    price: 18500,
    priceLabel: 'per person per night sharing',
    singleSupplement: 27750,
  },
  {
    villaTitle: 'Two-Bedroom Lux Villa',
    price: 74000,
    priceLabel: 'per unit per night',
    note: 'Sleeps up to 4',
  },
  {
    villaTitle: 'Honeymoon Villa',
    price: 19500,
    priceLabel: 'per person per night sharing',
    singleSupplement: 29250,
    note: 'Includes a spa treatment at 50% off',
  },
  {
    villaTitle: 'Exclusive Use',
    price: 330000,
    priceLabel: 'per night',
    note: 'Up to 24 pax sharing',
  },
];

const internationalSpecials2027: Special[] = [
  {
    headline: 'Stay 3, Pay 2',
    explanation: 'Book three consecutive nights and only pay for two.',
    conditions: 'Valid until 15 December 2027 · excludes beverages',
  },
  {
    headline: 'Stay 4, Pay 3',
    explanation: 'Book four consecutive nights and only pay for three.',
    conditions: 'Valid until 15 December 2027 · excludes beverages',
  },
  {
    headline: 'Complimentary Orphanage Visit',
    explanation:
      'A guided visit to a local wildlife orphanage, complimentary for guests staying with us.',
    conditions:
      'Valued at R2 000 per person · subject to availability',
  },
];

const sadcSpecials2027: Special[] = [
  {
    headline: 'Stay 2, Pay 1',
    explanation:
      'SADC residents pay for one night and stay for two.',
    conditions:
      'Limited to 3 uses per booking · valid until 15 December 2027 · excludes beverages · copy of SADC passport or ID required prior to booking',
  },
];

export const ratesDemo = {
  currency: 'ZAR',
  vatRate: 15,
  tiers: {
    international: {
      '2027': { rates: rates2027, specials: internationalSpecials2027 },
      '2028': { rates: rates2028, specials: [] },
      '2029': { rates: rates2029, specials: [] },
    },
    sadc: {
      '2027': { rates: rates2027, specials: sadcSpecials2027 },
      '2028': { rates: rates2028, specials: [] },
      '2029': { rates: rates2029, specials: [] },
    },
  } satisfies Record<RatesTier, Record<RatesYear, TierYearData>>,

  villas: [
    {
      slug: 'lux-two-bedroom-villa',
      title: 'Lux Two-Bedroom Villa',
      count: '×3',
      capacity: 'Up to 4 guests',
      features: [
        'King beds',
        'Indoor / outdoor shower',
        'Bath',
        'Mini bar',
        'Private boma',
        'Heated plunge pool',
        'Outdoor terrace with swing bed',
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
      capacity: 'Up to 2 guests',
      features: [
        'King bed',
        'Indoor / outdoor shower',
        'Bath',
        'Mini bar',
        'Private boma',
        'Outdoor hot tub / Amipod',
        'Terrace with swing bed',
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
      capacity: 'Couples only',
      features: [
        'King bed',
        'Indoor / outdoor shower',
        'Bath',
        'Mini bar',
        'Private boma',
        'Outdoor hot tub / Amipod',
        'Terrace with swing bed',
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
    'Twin beds and triples available on request.',

  inclusions: [
    'Fully serviced luxury accommodation',
    'Two game drives daily in an open safari vehicle',
    'Walking safari with experienced guides (subject to availability)',
    'Game drive drinks and snacks',
    'All meals',
    'Laundry',
    'WiFi in villas and main lodge',
    'All beverages excluding premium brands (onsite consumption only)',
  ],

  exclusions: [
    'Personal travel insurance',
    'Premium beverage brands and cellar reserve wines',
    'Lodge transfers to and from the reserve',
    'Conservation levies',
    'Wellness / spa treatments',
    'Curio shop purchases',
    'Gratuities',
    'Private game vehicle (R10 000 per night, subject to availability)',
    'Any other items of a personal nature',
  ],

  conservationLevies: {
    year: '2027',
    adult: 200,
    child: 100,
    note: 'Payable at the lodge.',
  },

  terms: [
    {
      id: 'rates',
      title: 'Rates',
      bullets: [
        'VAT-inclusive at 15%',
        'Quoted in ZAR',
        'Subject to availability',
        'Based on a minimum two-night stay',
        'Subject to change without notice; confirmed bookings will be honoured at the confirmed rate',
      ],
    },
    {
      id: 'children',
      title: 'Children',
      bullets: [
        'All ages welcome',
        'Infants under 3 are free of charge, but a private vehicle must be booked for the full stay (subject to availability)',
        'Children in their own villa attract the full adult rate',
        'If two-bedroom villas are unavailable, an additional guest may be accommodated as a triple on request — an additional room must be booked and a minimum charge of 3 adults applies',
        'Participation of children in game activities is at the discretion of the guide and management',
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
        'A copy of a valid SADC passport or ID must be provided prior to booking',
        'SADC specials are limited to 3 uses per booking',
        'Not combinable with other specials',
      ],
    },
    {
      id: 'payment-methods',
      title: 'Payment Methods',
      bullets: [
        'Visa',
        'MasterCard',
        'American Express',
        'Direct bank transfer',
        'Payfast',
        'Travellers cheques are not accepted',
      ],
    },
  ] satisfies TermsSection[],
};

/**
 * Format a ZAR amount using the SA convention — a narrow no-break
 * space as the thousands separator (e.g. R15 000, not R15,000).
 */
export function formatZAR(amount: number): string {
  const withSep = String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `R${withSep}`;
}

export function parseTier(value: string | string[] | undefined): RatesTier {
  return value === 'sadc' ? 'sadc' : 'international';
}

export function parseYear(value: string | string[] | undefined): RatesYear {
  const v = Array.isArray(value) ? value[0] : value;
  if (v === '2028' || v === '2029') return v;
  return '2027';
}
