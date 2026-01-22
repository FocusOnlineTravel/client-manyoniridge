import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import { SITE_CONFIG, CONTACT, SOCIAL_LINKS, FOOTER_LINKS } from '@/lib/constants';
import { NewsletterForm } from '@/components/forms/NewsletterForm';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white">
      {/* Main Footer */}
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-block font-heading text-2xl font-semibold tracking-wide mb-4"
            >
              {SITE_CONFIG.name}
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {SITE_CONFIG.tagline}. Experience the magic of the African bush at
              our intimate luxury lodge in Manyoni Private Game Reserve.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-primary-gold hover:text-primary-dark transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-primary-gold hover:text-primary-dark transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-primary-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Information</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.information.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-primary-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 mb-6">
              <li>
                <a
                  href={CONTACT.phoneLink}
                  className="flex items-start gap-3 text-gray-400 text-sm hover:text-primary-gold transition-colors"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{CONTACT.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.emailLink}
                  className="flex items-start gap-3 text-gray-400 text-sm hover:text-primary-gold transition-colors"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{CONTACT.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{CONTACT.location}</span>
                </div>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="pt-4 border-t border-white/10">
              <h4 className="text-sm font-medium mb-3">Stay Updated</h4>
              <NewsletterForm variant="footer" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-max py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {FOOTER_LINKS.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 text-sm hover:text-primary-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
