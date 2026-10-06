'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/Button';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface StudioIntroProps {
  reducedMotion?: boolean;
}

export function StudioIntro({ reducedMotion = false }: StudioIntroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  if (reducedMotion) {
    gsap.set([headlineRef.current!, copyRef.current!, ctaRef.current!, imageRef.current!], { opacity: 1, y: 0, clipPath: 'inset(0%)' });
    return;
  }

    const ctx = gsap.context(() => {
      gsap.set([headlineRef.current!, copyRef.current!, ctaRef.current!], { opacity: 0, y: 40 });
      gsap.set(imageRef.current!, { opacity: 0, clipPath: 'inset(100% 0 0 0)' });

      const tl = gsap.timeline({
         scrollTrigger: {
           trigger: sectionRef.current!,
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
          stagger: 0.1,
          ease: 'power3.out',
        });
      } else {
        tl.to(headlineRef.current!, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      // Copy
      tl.to(copyRef.current!, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.3');

      // CTA
      tl.to(ctaRef.current!, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.2');

      // Image reveal
      tl.to(imageRef.current!, {
        opacity: 1,
        clipPath: 'inset(0%)',
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
      className="relative py-24 md:py-32 lg:py-40 bg-stone-50"
      aria-labelledby="studio-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Text content */}
          <div className="lg:pt-12">
            <h2
              ref={headlineRef}
              id="studio-heading"
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-stone-900 mb-8"
            >
              <span className="reveal-line block">Spaces designed</span>
              <span className="reveal-line block">around the way</span>
              <span className="reveal-line block">you live.</span>
            </h2>

            <p
              ref={copyRef}
              className="text-stone-600 text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
            >
              We believe the best interiors are felt before they are seen. Our approach begins with listening—understanding the rhythms of your days, the light that moves through your rooms, the objects you have gathered, the life you want to lead. From this understanding, we shape spaces that are both beautiful and deeply functional. Natural materials, considered proportions, and details that reward attention. No two projects are the same because no two lives are the same.
            </p>

            <div ref={ctaRef} className="flex gap-4">
              <Button size="lg" asChild>
                <a href="#work">View selected work</a>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div
            ref={imageRef}
            className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden"
            aria-hidden="true"
          >
            <Image
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80"
              alt="Morrow House studio interior showing natural materials and considered details"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              quality={85}
            />
          </div>
        </div>
      </div>
    </section>
  );
}