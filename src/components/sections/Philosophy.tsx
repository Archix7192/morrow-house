'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PhilosophyProps {
  reducedMotion?: boolean;
}

export function Philosophy({ reducedMotion = false }: PhilosophyProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) {
      gsap.set([headlineRef, ruleRef], { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set([headlineRef.current, ruleRef.current], { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      // Headline lines
      const headlineLines = headlineRef.current?.querySelectorAll('.reveal-line');
      if (headlineLines?.length) {
        tl.to(headlineLines, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        });
      } else {
        tl.to(headlineRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      // Animated rule
      tl.to(ruleRef.current, {
        opacity: 1,
        width: '100%',
        duration: 1.2,
        ease: 'power3.out',
      }, '-=0.6');
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="studio"
      className="relative py-24 md:py-32 lg:py-40 text-center"
      aria-labelledby="philosophy-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <h2
          ref={headlineRef}
          id="philosophy-heading"
          className="font-serif text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-stone-900 mb-10"
        >
          <span className="reveal-line block">Good spaces are not simply decorated.</span>
          <span className="reveal-line block">They are understood.</span>
        </h2>

        <div
          ref={ruleRef}
          className="h-[1px] w-0 bg-stone-300 mx-auto mt-4"
        />
      </div>
    </section>
  );
}