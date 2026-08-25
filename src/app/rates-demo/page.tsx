import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Check, X, Sparkles } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Accordion } from '@/components/ui/Accordion';
import { cn } from '@/lib/utils';
import {
  formatZAR,
  parseTier,
  parseYear,
  ratesDemo,
  type RatesTier,
  type RatesYear,
} from '@/lib/rates-demo';
import { TierYearToggle } from './TierYearToggle';

export const metadata: Metadata = {
  title: 'Rates (Client Demo) — Manyoni Ridge',
  description:
    'Working demo of Manyoni Ridge Safari Lodge rates for client sign-off. Not for public distribution.',
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: '/rates-demo' },
};

type PageSearchParams = {
  tier?: string | string[];
  year?: string | string[];
  debug?: string | string[];
};

interface RatesDemoPageProps {
  searchParams: Promise<PageSearchParams>;
}

export default async function RatesDemoPage({
  searchParams,
}: RatesDemoPageProps) {
  const params = await searchParams;
  const tier: RatesTier = parseTier(params.tier);
  const year: RatesYear = parseYear(params.year);
  const showReviewNotes =
    (Array.isArray(params.debug) ? params.debug[0] : params.debug) === '1';

  const active = ratesDemo.tiers[tier][year];

  return (
    <>
      {/* Demo banner */}
      <div className="bg-primary-dark text-white text-xs uppercase tracking-widest text-center py-2 px-4 border-b border-primary-gold/40">
        Client demo · not for public distribution
      </div>

      {/* Intro banner */}
      <section className="relative w-full h-[55vh] min-h-[420px] max-h-[640px] flex items-end">
        <Image
          src="/images/offers-banner.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/85 via-primary-dark/45 to-primary-dark/20" />
        <div className="relative z-10 w-full container-narrow pb-16 md:pb-20 text-center text-white">
          <p className="text-xs uppercase tracking-widest text-primary-gold mb-3">
            Rates &amp; Specials
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight">
            Safari Rates
          </h1>
          <p className="mt-6 text-lg text-white/85 max-w-2xl mx-auto">
            An intimate 9-villa lodge in Manyoni Private Game Reserve, KZN.
            All-inclusive luxury from February 2027.
          </p>
        </div>
      </section>

      {/* Rates + Specials */}
      <Section background="cream" id="rates">
        <Heading
          as="h2"
          subtitle={`All rates are per night and quoted in ZAR, VAT-inclusive at ${ratesDemo.vatRate}%.`}
          centered
        >
          Rates
        </Heading>

        <div className="mt-8 mb-12">
          <TierYearToggle tier={tier} year={year} />
        </div>

        {/* Rate cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {active.rates.map((rate) => (
            <Card key={rate.villaTitle} hover={false} className="border border-primary-dark/10 h-full">
              <CardContent className="flex flex-col h-full">
                <h3 className="font-heading text-lg font-medium text-primary-dark mb-4 min-h-[3rem]">
                  {rate.villaTitle}
                </h3>

                <div>
                  <div className="font-heading text-3xl md:text-4xl text-primary-dark tracking-tight">
                    {formatZAR(rate.price)}
                  </div>
                  <p className="text-[11px] uppercase tracking-wider text-gray-medium mt-1">
                    {rate.priceLabel}
                  </p>
                </div>

                {rate.singleSupplement !== undefined && (
                  <div className="mt-4 pt-4 border-t border-gray-light">
                    <p className="text-[11px] uppercase tracking-wider text-gray-medium">
                      Single supplement
                    </p>
                    <p className="text-base font-semibold text-primary-dark mt-0.5">
                      {formatZAR(rate.singleSupplement)}
                    </p>
                  </div>
                )}

                {rate.note && (
                  <p className="mt-4 text-sm text-gray-medium italic">
                    {rate.note}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Specials */}
        <div className="mt-14">
          <div className="text-center mb-8">
            <h3 className="font-heading text-2xl md:text-3xl text-primary-dark font-medium">
              {tier === 'sadc' ? 'SADC Resident Specials' : 'International Specials'}
            </h3>
            <p className="text-sm text-gray-medium mt-2">
              Applies to {year} bookings.
            </p>
          </div>

          {active.specials.length === 0 ? (
            <div className="max-w-lg mx-auto text-center py-10 border border-dashed border-primary-dark/15 bg-white/40 rounded">
              <Sparkles className="w-5 h-5 text-primary-gold/70 mx-auto mb-2" aria-hidden />
              <p className="text-sm text-gray-medium">
                No current specials for the {year} season.
              </p>
            </div>
          ) : (
            <div
              className={cn(
                active.specials.length === 1
                  ? 'flex justify-center'
                  : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'
              )}
            >
              {active.specials.map((s) => (
                <Card
                  key={s.headline}
                  hover={false}
                  className={cn(
                    'border border-primary-gold/40 h-full',
                    active.specials.length === 1 && 'w-full max-w-md'
                  )}
                >
                  <CardContent className="flex flex-col h-full">
                    <span className="inline-flex items-center self-start bg-primary-gold text-primary-dark text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded mb-4">
                      Launch Special
                    </span>
                    <h4 className="font-heading text-xl font-medium text-primary-dark mb-2">
                      {s.headline}
                    </h4>
                    <p className="text-sm text-gray-dark leading-relaxed">
                      {s.explanation}
                    </p>
                    {s.conditions && (
                      <p className="mt-4 pt-4 border-t border-gray-light text-xs text-gray-medium leading-relaxed">
                        {s.conditions}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {tier === 'sadc' && active.specials.length > 0 && (
            <p className="mt-6 text-xs text-center text-gray-medium max-w-2xl mx-auto">
              SADC specials require a valid SADC passport or ID (submitted
              prior to booking). See the T&amp;Cs below for full conditions.
            </p>
          )}
        </div>
      </Section>

      {/* Inclusions / Exclusions */}
      <Section background="white">
        <Heading as="h2" centered subtitle="What's included in every stay and what isn't.">
          Inclusions &amp; Exclusions
        </Heading>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          <div className="border border-primary-gold/40 bg-white p-6 md:p-8">
            <h3 className="font-heading text-xl font-medium text-primary-dark mb-5 flex items-center gap-2">
              <Check className="w-5 h-5 text-primary-gold" aria-hidden />
              Included
            </h3>
            <ul className="space-y-3">
              {ratesDemo.inclusions.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-dark leading-relaxed">
                  <Check className="w-4 h-4 mt-0.5 text-primary-gold shrink-0" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-gray-light bg-off-white p-6 md:p-8">
            <h3 className="font-heading text-xl font-medium text-primary-dark mb-5 flex items-center gap-2">
              <X className="w-5 h-5 text-gray-medium" aria-hidden />
              Not included
            </h3>
            <ul className="space-y-3">
              {ratesDemo.exclusions.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-dark leading-relaxed">
                  <X className="w-4 h-4 mt-0.5 text-gray-medium shrink-0" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Conservation levies callout */}
        <div className="mt-10 border-l-4 border-primary-gold bg-primary-cream/40 p-5 md:p-6 max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-primary-gold font-semibold mb-2">
            Conservation Levies ({ratesDemo.conservationLevies.year})
          </p>
          <p className="text-sm md:text-base text-primary-dark">
            <span className="font-semibold">
              {formatZAR(ratesDemo.conservationLevies.adult)}
            </span>{' '}
            per adult per night ·{' '}
            <span className="font-semibold">
              {formatZAR(ratesDemo.conservationLevies.child)}
            </span>{' '}
            per child under 13 per night. {ratesDemo.conservationLevies.note}
          </p>
        </div>
      </Section>

      {/* T&Cs */}
      <Section background="cream" size="narrow">
        <Heading
          as="h2"
          centered
          subtitle="Full booking terms, cancellation policies, and payment conditions."
        >
          Terms &amp; Conditions
        </Heading>

        <div className="mt-10">
          <Accordion
            type="single"
            items={ratesDemo.terms.map((section) => ({
              id: section.id,
              title: section.title,
              content: (
                <div className="space-y-3">
                  {section.intro && (
                    <p className="text-sm text-gray-dark leading-relaxed">
                      {section.intro}
                    </p>
                  )}
                  <ul className="space-y-2">
                    {section.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 text-sm text-gray-dark leading-relaxed"
                      >
                        <span
                          className="mt-1.5 h-1 w-1 rounded-full bg-primary-gold shrink-0"
                          aria-hidden
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            }))}
          />
        </div>

        <p className="mt-8 text-xs text-center text-gray-medium">
          Rates quoted in ZAR ({ratesDemo.currency}). International guests are
          charged the ZAR amount.
        </p>
      </Section>

      {/* Inline enquire CTA */}
      <section className="relative section-padding text-white overflow-hidden">
        <Image
          src="/images/reserve-cta.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary-dark/75" />
        <div className="relative z-10 container-max">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-medium mb-4">
              Ready to plan your stay?
            </h2>
            <p className="text-white/85 mb-8">
              Send us the dates you have in mind and we&apos;ll come back with
              availability, a quote, and any tailoring we can offer.
            </p>
            <Button href="/contact" variant="primary" size="lg">
              Make an Enquiry
            </Button>
          </div>
        </div>
      </section>

      {/* Sticky mobile enquire bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-primary-dark/95 backdrop-blur border-t border-primary-gold/40 p-3 shadow-[0_-4px_16px_rgba(0,0,0,0.15)]">
        <Link
          href="/contact"
          className="block w-full text-center bg-primary-gold text-primary-dark font-semibold uppercase tracking-wider text-sm py-3 rounded shadow-sm hover:bg-primary-gold/90 transition-colors"
        >
          Enquire
        </Link>
      </div>
      {/* spacer so the sticky bar doesn't cover the footer edge */}
      <div className="h-20 md:hidden" aria-hidden />

      {showReviewNotes && <ReviewNotesBlock />}
    </>
  );
}

/**
 * Dev-only ambiguities log — surface with ?debug=1
 * Sits outside the page design deliberately.
 */
function ReviewNotesBlock() {
  const items: Array<{ q: string; note: string }> = [
    {
      q: 'International and SADC 2027 prices are identical',
      note:
        'Only the specials differ. Data is modelled with two tier keys so pricing can diverge later — but confirm with the client whether SADC should really have its own pricing tier or only its own specials.',
    },
    {
      q: '2028 and 2029 specials',
      note:
        'Brief specifies none. The empty state now says "No current specials for the {year} season" — confirm wording, and whether the same 2027 specials should carry through to 2028 as a default.',
    },
    {
      q: 'Honeymoon Villa capacity',
      note:
        'Brief says king bed + all the usual amenities but never states capacity. Assumed "couples only" (2 guests). Confirm — could impact triples policy.',
    },
    {
      q: 'Two-Bedroom Villa exclusive-use overlap',
      note:
        'Exclusive Use is R275 000 per night up to 24 pax. 9 villas × up to 4 pax = 36 pax capacity. Confirm the 24 pax figure — is that a stated cap, or the practical safari-vehicle cap?',
    },
    {
      q: 'Spa treatment on Honeymoon Villa',
      note:
        'Brief phrases it as "includes a spa treatment at 50% off". Assumed one treatment per couple per stay — confirm frequency and whether per-person or per-stay.',
    },
    {
      q: 'Orphanage visit specifics',
      note:
        'Brief: "Complimentary Orphanage Visit, valued at R2 000 per person (subject to availability)." Which orphanage? Per booking or per stay night? Card currently reads once per stay.',
    },
    {
      q: 'SADC ID timing',
      note:
        'Brief says "prior to booking" — clarified in both the special card and a dedicated T&Cs accordion section. Verify this is the right timing (some lodges want at check-in).',
    },
    {
      q: 'AMIPOD placement',
      note:
        'Labelled explicitly as the third image slot on the One-Bedroom and Honeymoon cards. Two-Bedroom villa doesn\'t list Amipod in the brief — currently shows a plunge pool slot instead. Confirm.',
    },
    {
      q: 'Private game vehicle rate',
      note:
        'R10 000 per night listed under exclusions. Same for all years? Should it appear in a separate "add-ons" section rather than buried in exclusions?',
    },
    {
      q: 'Conservation levies for 2028 / 2029',
      note:
        'Brief only gives 2027 figures. Callout year-tagged as (2027) so it\'s clear it may change — need levy figures for 2028 and 2029 before we drop the year tag.',
    },
    {
      q: '"Group buyout" rate',
      note:
        'Full lodge buyout mentioned in payment terms with special deposit rules, but the Exclusive Use rate card is the buyout price. Confirm the two are the same thing (or add a distinct "buyout" price).',
    },
    {
      q: 'Currency footnote',
      note:
        'Brief said no converter widget. Included a plain footnote only. Confirm the wording ("International guests are charged the ZAR amount.").',
    },
    {
      q: 'Enquiry destination',
      note:
        'Both the inline CTA and sticky mobile bar link to /contact. No booking / enquiry form component was found on the site to embed.',
    },
    {
      q: 'How to view these notes',
      note:
        'Append ?debug=1 to the URL. Not visible on the default preview link.',
    },
  ];

  return (
    <div className="border-t-4 border-yellow-500 bg-yellow-50 text-gray-900 py-10">
      <div className="container-narrow">
        <div className="border-2 border-yellow-500 bg-white p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest bg-yellow-500 text-black px-2 py-1 rounded">
              Review Notes
            </span>
            <span className="text-xs text-gray-600">
              Dev-only · not visible in the default demo URL
            </span>
          </div>
          <p className="text-sm text-gray-700 mb-6">
            Ambiguities, assumptions, and open questions hit while building.
            Take these back to the client.
          </p>
          <ol className="space-y-4 list-decimal list-inside">
            {items.map((it) => (
              <li key={it.q} className="text-sm">
                <span className="font-semibold text-gray-900">{it.q}. </span>
                <span className="text-gray-700">{it.note}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
