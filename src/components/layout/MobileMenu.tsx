'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOBILE_NAV_LINKS, CONTACT, SOCIAL_LINKS, SITE_CONFIG } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 z-[100]"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 left-0 bottom-0 w-[75%] sm:w-[60%] md:w-[40%] lg:w-[25%] bg-primary-dark z-[101] overflow-y-auto shadow-2xl"
          >
            <div className="flex flex-col min-h-full p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                <span className="font-heading text-xl lg:text-2xl text-white font-semibold">
                  {SITE_CONFIG.name}
                </span>
                <button
                  onClick={onClose}
                  className="p-2 -m-2 text-white hover:text-primary-gold transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-1">
                  {MOBILE_NAV_LINKS.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="block py-3 text-base font-medium text-white hover:text-primary-gold transition-colors border-b border-white/10"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6"
                >
                  <Button href="/contact" onClick={onClose} className="w-full text-sm">
                    Enquire Now
                  </Button>
                </motion.div>
              </nav>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-auto pt-6 border-t border-white/10"
              >
                <div className="space-y-3 mb-6">
                  <a
                    href={CONTACT.phoneLink}
                    className="flex items-center gap-3 text-white hover:text-primary-gold transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span className="text-white">{CONTACT.phone}</span>
                  </a>
                  <a
                    href={CONTACT.emailLink}
                    className="flex items-center gap-3 text-white hover:text-primary-gold transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span className="text-white break-all">{CONTACT.email}</span>
                  </a>
                </div>

                {/* Social Links */}
                <div className="border-t border-white/10 pt-4">
                  <p className="text-white text-xs uppercase tracking-wider mb-3 font-medium">
                    Follow Us
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href={SOCIAL_LINKS.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/10 rounded-full text-white hover:bg-primary-gold hover:text-primary-dark transition-all"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href={SOCIAL_LINKS.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/10 rounded-full text-white hover:bg-primary-gold hover:text-primary-dark transition-all"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
