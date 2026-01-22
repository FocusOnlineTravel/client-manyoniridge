'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Phone } from 'lucide-react';
import { NAV_LINKS, CONTACT, SITE_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { MobileMenu } from './MobileMenu';
import { Button } from '@/components/ui/Button';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="container-max flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              'font-heading text-2xl md:text-3xl font-semibold tracking-wide transition-colors',
              isScrolled ? 'text-primary-dark' : 'text-white'
            )}
          >
            {SITE_CONFIG.name}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium uppercase tracking-wider transition-colors hover:text-primary-gold',
                  isScrolled ? 'text-primary-dark' : 'text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href={CONTACT.phoneLink}
              className={cn(
                'flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary-gold',
                isScrolled ? 'text-primary-dark' : 'text-white'
              )}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">{CONTACT.phone}</span>
            </a>
            <Button href="/contact" size="sm">
              Enquire Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={cn(
              'lg:hidden p-2 transition-colors',
              isScrolled ? 'text-primary-dark' : 'text-white'
            )}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
