'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '@/data/services';
import { Button } from '@/components/ui/Button';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServicesProps {
  reducedMotion?: boolean;
}

export function Services({ reducedMotion = false }: ServicesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [expandedService, setExpandedService] = useState<string | null>(null);

  useEffect(() => {
  if (reducedMotion) {
    gsap.set(sectionRef.current!, { opacity: 1 });
    return;
  }

    const ctx = gsap.context(() => {
     gsap.set([sectionRef.current!.querySelector('h2'), sectionRef.current!.querySelector('p')], {
       opacity: 0,
       y: 40,
     });
      gsap.set(sectionRef.current!.querySelectorAll('.service-card'), { opacity: 0, y: 40 });

      const tl = gsap.timeline({
         scrollTrigger: {
           trigger: sectionRef.current!,
           start: 'top 80%',
           once: true,
         },
       });

      // Section header
      tl.to(sectionRef.current!.querySelector('h2'), {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Section intro
      tl.to(sectionRef.current!.querySelector('p'), {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.3');

      // Service cards
      tl.to(sectionRef.current!.querySelectorAll('.service-card'), {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      }, '-=0.5');
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleServiceClick = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 md:py-32 lg:py-40 bg-stone-50"
      aria-labelledby="services-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 id="services-heading" className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-stone-900 mb-6">
            Our services
          </h2>
          <p className="text-stone-600 text-lg max-w-xl">
            Comprehensive interior design services tailored to your unique needs and vision.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className={`service-card relative bg-white rounded-xl border border-stone-200 p-8 hover:border-stone-300 transition-border cursor-pointer ${expandedService === service.id ? 'expanded' : ''}`}
              onClick={() => handleServiceClick(service.id)}
              role="button"
              tabIndex={0}
              aria-expanded={expandedService === service.id}
              aria-label={`${service.title}${expandedService === service.id ? ', expanded' : ', click to expand details'}`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 flex items-center justify-center bg-stone-900/10 text-stone-900 rounded-md">
                  {service.number}
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-light tracking-tight text-stone-900">
                  {service.title}
                </h3>
              </div>

              <p className="text-stone-600 mb-4 line-clamp-3">
                {service.description}
              </p>

              {expandedService === service.id && (
                <div className="mt-6 pt-4 border-t border-stone-200">
                  <p className="text-stone-600 leading-relaxed mb-4">
                    {service.longDescription}
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="#contact">Get started</a>
                  </Button>
                </div>
              )}

              {!expandedService && (
                <Button variant="ghost" size="sm" className="mt-auto text-stone-600 hover:text-stone-900" asChild>
                  <a href="#contact">Learn more</a>
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}