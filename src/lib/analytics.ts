type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: 'event' | 'config' | 'js', target: string | Date, params?: GtagParams) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: string, params?: GtagParams) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

export const analytics = {
  formSubmit(formName: string, extra?: GtagParams) {
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
