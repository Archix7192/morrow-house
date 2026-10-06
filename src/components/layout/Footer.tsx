'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, Camera, Link as LucideLink, Mail, MapPin, Phone } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const footerNav = [
  { label: 'Work', href: '#work' },
  { label: 'Studio', href: '#studio' },
  { label: 'Services', href: '#services' },
  { label: 'Journal', href: '#journal' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com', icon: Camera },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: LucideLink },
  { label: 'Email', href: 'mailto:hello@morrowhouse.com', icon: Mail },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            once: true,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-stone-900 text-stone-100" role="contentinfo">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-serif text-3xl md:text-4xl font-light tracking-tight mb-6 block"
              aria-label="Morrow House - Home"
            >
              MORROW HOUSE
            </Link>
            <p className="text-stone-400 text-base md:text-lg leading-relaxed max-w-xs mb-8">
              Interiors that make room for life. Considered spaces, natural materials, and thoughtful details for the way we live.
            </p>
            <div className="flex flex-wrap gap-6 text-stone-400 text-sm">
              <a
                href="mailto:hello@morrowhouse.com"
                className="flex items-center gap-2 hover:text-stone-100 transition-colors"
              >
                <Mail size={16} />
                hello@morrowhouse.com
              </a>
              <a
                href="tel:+442071234567"
                className="flex items-center gap-2 hover:text-stone-100 transition-colors"
              >
                <Phone size={16} />
                +44 20 7123 4567
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={16} />
                London, UK
              </span>
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="font-medium text-sm uppercase tracking-wider mb-6">Navigate</h3>
            <ul className="space-y-3">
              {footerNav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-stone-400 hover:text-stone-100 transition-colors text-base relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:w-0 after:bg-stone-400 hover:after:w-full after:transition-width"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider mb-6">Connect</h3>
            <ul className="space-y-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="flex items-center gap-3 text-stone-400 hover:text-stone-100 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                    <span>{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone-500 text-sm">
            © {currentYear} Morrow House. All rights reserved.
          </p>
          <button
            className="p-2 rounded-full bg-stone-800 hover:bg-stone-700 transition-colors text-stone-300 hover:text-stone-100"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}