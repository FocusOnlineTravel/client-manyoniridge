'use client';

import { AnchorHTMLAttributes, ReactNode } from 'react';
import { analytics } from '@/lib/analytics';

type EventKind = 'email' | 'phone' | 'reserve' | 'social';

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  event: EventKind;
  location: string;
  network?: string;
  children: ReactNode;
}

export function TrackedLink({
  event,
  location,
  network,
  onClick,
  children,
  ...props
}: TrackedLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    switch (event) {
      case 'email':
        analytics.emailClick(location);
        break;
      case 'phone':
        analytics.phoneClick(location);
        break;
      case 'reserve':
        analytics.reserveClick(location);
        break;
      case 'social':
        analytics.socialClick(network || 'unknown', location);
        break;
    }
    onClick?.(e);
  };

  return (
    <a {...props} onClick={handleClick}>
      {children}
    </a>
  );
}
