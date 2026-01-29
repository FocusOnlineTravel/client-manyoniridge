'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Phone } from 'lucide-react';
import { NAV_LINKS, CONTACT } from '@/lib/constants';
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
            ? 'bg-primary-dark/95 backdrop-blur-md shadow-md py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="container-max">
          {/* Single Row: Logo, Navigation, and Actions */}
          <div className={cn(
            "flex items-center justify-between",
            isScrolled ? "" : "pt-4"
          )}>
            {/* Logo */}
            <Link
              href="/"
              className="transition-all duration-300 hover:opacity-80"
            >
              <Image
                src={isScrolled ? "/images/manyoni-logo-dark-icon.png" : "/images/manyoni-logo-dark.png"}
                alt="Manyoni Ridge Safari Lodge"
                width={540}
                height={180}
                className={cn(
                  "w-auto brightness-0 invert transition-all duration-300",
                  isScrolled ? "h-12 md:h-14" : "h-36 md:h-42"
                )}
                priority
              />
            </Link>

            {/* Desktop Navigation - Center aligned */}
            <nav className="hidden lg:flex items-center justify-center gap-8 flex-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium uppercase tracking-wider transition-colors hover:text-primary-gold"
                  style={{ color: 'white' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions + Menu - Center aligned */}
            <div className="flex items-center gap-6">
              <a
                href={CONTACT.phoneLink}
                className="hidden lg:flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary-gold"
                style={{ color: 'white' }}
              >
                <Phone className="w-4 h-4" />
                <span className="hidden xl:inline">{CONTACT.phone}</span>
              </a>
              <Button href="/contact" size="sm" className="hidden lg:inline-flex">
                Enquire Now
              </Button>

              {/* Menu Button - Always visible */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -m-2 transition-colors hover:text-primary-gold"
                style={{ color: 'white' }}
                aria-label="Open menu"
              >
                <Menu className="w-8 h-8" strokeWidth={2} style={{ color: 'white' }} />
              </button>
            </div>
          </div>
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
