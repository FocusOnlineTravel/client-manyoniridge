type EventParams = Record<string, string | number | boolean | undefined>;

type ClarityFn = (command: 'set' | 'event' | 'identify' | 'consent' | 'upgrade', ...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    clarity?: ClarityFn;
  }
}

export function trackEvent(name: string, params?: EventParams) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });

  if (typeof window.clarity === 'function') {
    window.clarity('event', name);
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) window.clarity('set', key, String(value));
      }
    }
  }
}

export const analytics = {
  formSubmit(formName: string, extra?: EventParams) {
    trackEvent('generate_lead', { form_name: formName, ...extra });
  },
  newsletterSignup(location: string) {
    trackEvent('newsletter_signup', { location });
  },
  emailClick(location: string) {
    trackEvent('email_click', { location });
  },
  phoneClick(location: string) {
    trackEvent('phone_click', { location });
  },
  reserveClick(location: string) {
    trackEvent('reserve_click', { location });
  },
  socialClick(network: string, location: string) {
    trackEvent('social_click', { network, location });
  },
};
