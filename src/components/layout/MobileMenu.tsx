'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, CONTACT, SOCIAL_LINKS, SITE_CONFIG } from '@/lib/constants';
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
            className="fixed inset-0 bg-black/60 z-50 lg:hidden"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-primary-dark z-50 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col min-h-full p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-10">
                <span className="font-heading text-2xl text-white font-semibold">
                  {SITE_CONFIG.name}
                </span>
                <button
                  onClick={onClose}
                  className="p-2 text-white hover:text-primary-gold transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1">
                <ul className="space-y-1">
                  {NAV_LINKS.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="block py-3 text-lg text-white hover:text-primary-gold transition-colors border-b border-white/10"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8"
                >
                  <Button href="/contact" onClick={onClose} className="w-full">
                    Enquire Now
                  </Button>
                </motion.div>
              </nav>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10 pt-6 border-t border-white/10"
              >
                <div className="space-y-4">
                  <a
                    href={CONTACT.phoneLink}
                    className="flex items-center gap-3 text-white hover:text-primary-gold transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>{CONTACT.phone}</span>
                  </a>
                  <a
                    href={CONTACT.emailLink}
                    className="flex items-center gap-3 text-white hover:text-primary-gold transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span className="text-sm">{CONTACT.email}</span>
                  </a>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4 mt-6">
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-white hover:text-primary-gold transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-white hover:text-primary-gold transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
