'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Studio', href: '#studio' },
  { label: 'Services', href: '#services' },
  { label: 'Journal', href: '#journal' },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenuAnimating, setIsMobileMenuAnimating] = useState(false);

  // Header scroll effect
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: 'main',
        start: 'top top',
        end: 'bottom top',
        onToggle: (self) => {
          setIsScrolled(self.isActive);
        },
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    const ctx = gsap.context(() => {
      const menu = mobileMenuRef.current!;
      const links = menu.querySelectorAll('[data-mobile-link]');

      if (isMobileMenuOpen) {
        gsap.set(menu, { display: 'flex' });
        gsap.fromTo(
          menu,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0 0 0 0)',
            duration: 0.8,
            ease: 'power3.inOut',
            onComplete: () => setIsMobileMenuAnimating(false),
          }
        );

        gsap.fromTo(
          links,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            delay: 0.2,
          }
        );
      } else {
        setIsMobileMenuAnimating(true);
        gsap.to(links, {
          y: -20,
          opacity: 0,
          duration: 0.3,
          stagger: 0.04,
          ease: 'power3.in',
        });
        gsap.to(menu, {
          clipPath: 'inset(100% 0 0 0)',
          duration: 0.6,
          ease: 'power3.inOut',
          delay: 0.2,
          onComplete: () => {
            gsap.set(menu, { display: 'none' });
            setIsMobileMenuAnimating(false);
          },
        });
      }
    }, mobileMenuRef);

    return () => ctx.revert();
  }, [isMobileMenuOpen]);

  const handleMobileMenuToggle = () => {
    if (isMobileMenuAnimating) return;
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-stone-50/95 backdrop-blur-sm border-b border-stone-200 py-4'
            : 'bg-transparent py-6'
        )}
        role="banner"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link
            href="/"
            className="font-serif text-2xl md:text-3xl font-light tracking-tight text-stone-900 hover:opacity-80 transition-opacity"
            aria-label="Morrow House - Home"
          >
            MORROW HOUSE
          </Link>

          <nav className="hidden md:flex items-center gap-10" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-stone-900 hover:after:w-full after:transition-width"
              >
                {item.label}
              </Link>
            ))}
            <Button variant="outline" size="sm" asChild>
              <Link href="#contact">Enquire</Link>
            </Button>
          </nav>

          <button
            className="md:hidden p-2 text-stone-900"
            onClick={handleMobileMenuToggle}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className="fixed inset-0 z-40 bg-stone-50 flex flex-col items-center justify-center gap-8 md:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        style={{ display: isMobileMenuOpen || isMobileMenuAnimating ? 'flex' : 'none' }}
      >
        <div className="flex flex-col items-center gap-6 text-center" data-mobile-links>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={handleMobileNavClick}
              className="font-serif text-3xl font-light text-stone-900 hover:text-stone-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Button variant="primary" size="lg" onClick={handleMobileNavClick} asChild>
            <Link href="#contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </>
  );
}