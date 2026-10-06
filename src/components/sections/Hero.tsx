'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroProps {
  reducedMotion?: boolean;
}

export function Hero({ reducedMotion = false }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  if (reducedMotion) {
    gsap.set([eyebrowRef.current!, headlineRef.current!, copyRef.current!, ctaRef.current!, scrollCueRef.current!], { opacity: 1, y: 0 });
    if (imageRef.current) gsap.set(imageRef.current, { opacity: 1, scale: 1, clipPath: 'inset(0%)' });
    return;
  }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

    // Set initial states
    gsap.set([eyebrowRef.current!, headlineRef.current!, copyRef.current!, ctaRef.current!, scrollCueRef.current!], {
      opacity: 0,
      y: 30,
    });
      gsap.set(imageRef.current!, {
        opacity: 0,
        scale: 1.08,
        clipPath: 'inset(100% 0 0 0)',
      });

      // Logo/wordmark reveal (if exists in hero)
      // Image reveal with clip-path and scale
      tl.to(imageRef.current!, {
        opacity: 1,
        scale: 1,
        clipPath: 'inset(0%)',
        duration: 1.4,
        ease: 'power3.out',
      });

      // Eyebrow
      tl.to(eyebrowRef.current!, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, '-=0.6');

      // Headline - split lines if needed
      const headlineLines = headlineRef.current?.querySelectorAll('.reveal-line');
      if (headlineLines?.length) {
        tl.to(headlineLines, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
        }, '-=0.4');
      } else {
        tl.to(headlineRef.current!, {
          opacity: 1,
          y: 0,
          duration: 0.8,
        }, '-=0.4');
      }

      // Supporting copy
      tl.to(copyRef.current!, {
        opacity: 1,
        y: 0,
        duration: 0.7,
      }, '-=0.3');

      // CTA
      tl.to(ctaRef.current!, {
        opacity: 1,
        y: 0,
        duration: 0.7,
      }, '-=0.2');

      // Scroll cue
      tl.to(scrollCueRef.current!, {
        opacity: 1,
        y: 0,
        duration: 0.7,
      }, '-=0.1');
    }, heroRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      >
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-20 text-center md:text-left">
        <div className="max-w-3xl">
          <p
            ref={eyebrowRef}
            className="text-stone-100/80 text-sm md:text-base uppercase tracking-widest font-medium mb-6"
            id="hero-eyebrow"
          >
            INDEPENDENT INTERIOR DESIGN STUDIO
          </p>

          <h1
            ref={headlineRef}
            id="hero-heading"
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-stone-50 leading-[1.1] mb-8"
          >
            <span className="reveal-line block">Interiors that make</span>
            <span className="reveal-line block">room for life.</span>
          </h1>

          <p
            ref={copyRef}
            className="text-stone-100/90 text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
          >
            Considered spaces, natural materials, and thoughtful details for the way we live.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button size="lg" asChild>
              <a href="#work">Explore our work</a>
            </Button>
            <Button variant="ghost" size="lg" className="text-stone-50 hover:bg-stone-900/20" asChild>
              <a href="#studio">Our studio</a>
            </Button>
          </div>

          <div ref={scrollCueRef} className="flex items-center justify-center md:justify-start gap-2 text-stone-100/60 text-sm uppercase tracking-wider">
            <span>Scroll to discover</span>
            <ChevronDown size={16} className="animate-bounce" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Project metadata */}
      <div className="absolute bottom-8 left-6 md:left-12 right-6 md:right-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 text-stone-100/70 text-sm z-10">
        <div className="grid grid-cols-3 gap-4 md:gap-8">
          <div>
            <p className="font-serif text-2xl font-light">12+</p>
            <p className="uppercase tracking-wider text-xs">Years Established</p>
          </div>
          <div>
            <p className="font-serif text-2xl font-light">40+</p>
            <p className="uppercase tracking-wider text-xs">Projects Completed</p>
          </div>
          <div>
            <p className="font-serif text-2xl font-light">8</p>
            <p className="uppercase tracking-wider text-xs">Team Members</p>
          </div>
        </div>
        <div className="border-t border-stone-300/20 w-full md:w-auto md:border-t-0 md:border-l md:pl-8 md:mt-0 mt-4 pt-4 md:pt-0">
          <p className="uppercase tracking-wider">London, UK</p>
        </div>
      </div>
    </section>
  );
}