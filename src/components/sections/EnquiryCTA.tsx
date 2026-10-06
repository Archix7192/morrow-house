'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface EnquiryCTAProps {
  reducedMotion?: boolean;
}

export function EnquiryCTA({ reducedMotion = false }: EnquiryCTAProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  if (reducedMotion) {
    gsap.set([titleRef.current!, ctaRef.current!, imageRef.current!], { opacity: 1 });
    return;
  }

    const ctx = gsap.context(() => {
     gsap.set([titleRef.current!, ctaRef.current!], { opacity: 0, y: 40 });
      gsap.set(imageRef.current!, { opacity: 0, scale: 1.05 });

      const tl = gsap.timeline({
         scrollTrigger: {
           trigger: sectionRef.current!,
           start: 'top 80%',
           once: true,
         },
       });

      // Image reveal
      tl.to(imageRef.current!, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
      });

      // Title reveal
      tl.to(titleRef.current!, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.8');

      // CTA reveal
      tl.to(ctaRef.current!, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.4');
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 md:py-32 lg:py-40"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <div
            ref={imageRef}
            className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-xl border border-stone-200"
            aria-hidden="true"
          >
            <Image
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"
              alt="Morrow House interior showing considered design details"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/0 via-stone-900/40 to-stone-900/60" />
          </div>

          {/* Content */}
          <div>
            <h2
              ref={titleRef}
              id="contact-heading"
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-stone-900 mb-6"
            >
              Let&apos;s make room for something meaningful.
            </h2>

            <div ref={ctaRef} className="flex gap-4 md:gap-6">
              <Button size="lg" asChild>
                <a href="mailto:hello@morrowhouse.com">Get in Touch</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#work">View our work</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}