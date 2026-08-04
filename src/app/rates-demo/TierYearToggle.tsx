'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { cn } from '@/lib/utils';
import {
  RATES_TIERS,
  RATES_YEARS,
  type RatesTier,
  type RatesYear,
} from '@/lib/rates-demo';

interface TierYearToggleProps {
  tier: RatesTier;
  year: RatesYear;
}

const tierLabel: Record<RatesTier, string> = {
  international: 'International',
  sadc: 'SADC Residents',
};

export function TierYearToggle({ tier, year }: TierYearToggleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function update(next: { tier?: RatesTier; year?: RatesYear }) {
    const sp = new URLSearchParams(params.toString());
    if (next.tier) sp.set('tier', next.tier);
    if (next.year) sp.set('year', next.year);
    startTransition(() => {
      router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
    });
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-6',
        isPending && 'opacity-70 transition-opacity'
      )}
    >
      {/* Tier segmented control */}
      <div
        role="tablist"
        aria-label="Guest residency"
        className="inline-flex bg-primary-cream/60 border border-primary-cream p-1 rounded-full shadow-sm"
      >
        {RATES_TIERS.map((t) => {
          const active = tier === t;
          return (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => update({ tier: t })}
              className={cn(
                'px-5 sm:px-7 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold focus-visible:ring-offset-2',
                active
                  ? 'bg-primary-dark text-white shadow-sm'
                  : 'text-primary-dark hover:bg-white/70'
              )}
            >
              {tierLabel[t]}
            </button>
          );
        })}
      </div>

      {/* Year selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs uppercase tracking-wider text-gray-medium mr-1 hidden sm:inline">
          Year
        </span>
        <div
          role="tablist"
          aria-label="Rate year"
          className="inline-flex border border-primary-dark/15 rounded-full overflow-hidden"
        >
          {RATES_YEARS.map((y) => {
            const active = year === y;
            return (
              <button
                key={y}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => update({ year: y })}
                className={cn(
                  'px-5 sm:px-6 py-2 text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold focus-visible:ring-inset',
                  active
                    ? 'bg-primary-gold text-primary-dark'
                    : 'bg-white text-primary-dark hover:bg-primary-cream/40'
                )}
              >
                {y}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
