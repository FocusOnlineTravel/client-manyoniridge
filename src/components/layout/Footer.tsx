import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import { SITE_CONFIG, CONTACT, SOCIAL_LINKS, FOOTER_LINKS } from '@/lib/constants';
import { NewsletterForm } from '@/components/forms/NewsletterForm';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="w-full px-6 md:px-12 lg:px-16 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-heading text-2xl font-semibold mb-3">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-6">
              Subscribe to receive exclusive offers, news from the bush, and updates on our opening.
            </p>
            <NewsletterForm variant="footer" />
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="w-full px-6 md:px-12 lg:px-16 section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-block mb-6"
            >
              <Image
                src="/images/manyoni-logo-dark.png"
                alt={SITE_CONFIG.name}
                width={280}
                height={93}
                className="w-auto h-24 brightness-0 invert"
              />
            </Link>
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

          {/* Experience Links */}
          <div>
            <h3 className="font-heading text-base font-semibold mb-4 pb-2 border-b border-primary-gold/30 text-primary-gold uppercase tracking-wider">
              Experience
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.experience.map((link) => (
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

          {/* Discover Links */}
          <div>
            <h3 className="font-heading text-base font-semibold mb-4 pb-2 border-b border-primary-gold/30 text-primary-gold uppercase tracking-wider">
              Discover
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.discover.map((link) => (
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

          {/* Plan Links */}
          <div>
            <h3 className="font-heading text-base font-semibold mb-4 pb-2 border-b border-primary-gold/30 text-primary-gold uppercase tracking-wider">
              Plan
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.plan.map((link) => (
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

          {/* Contact */}
          <div>
            <h3 className="font-heading text-base font-semibold mb-4 pb-2 border-b border-primary-gold/30 text-primary-gold uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-3">
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
                  <span className="leading-snug">{CONTACT.location}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="w-full px-6 md:px-12 lg:px-16 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col items-center md:items-start gap-1">
              <p className="text-gray-400 text-sm text-center md:text-left">
                &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs">
                Website by{' '}
                <a
                  href="https://focusonlinetravel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-gold transition-colors"
                >
                  Focus Online Travel
                </a>
              </p>
            </div>
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
