'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { processSteps } from '@/data/process';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProcessProps {
  reducedMotion?: boolean;
}

export function Process({ reducedMotion = false }: ProcessProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const progressMarkersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) {
      gsap.set([sectionRef.current!.querySelector('h2'), sectionRef.current!.querySelector('p'), stepsRef.current!], {
        opacity: 1,
      });
      // Show all steps and markers immediately for reduced motion
      processSteps.forEach((step) => {
        const markerInner = document.querySelector(`[data-step-inner="${step.id}"]`) as HTMLElement;
        const marker = document.querySelector(`[data-step="${step.id}"]`) as HTMLElement;
        if (markerInner) markerInner.style.opacity = '1';
        if (marker) {
          marker.style.opacity = '1';
          marker.style.transform = 'scale(1)';
        }
      });
      if (progressLineRef.current) {
        progressLineRef.current.style.width = '100%';
      }
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set([sectionRef.current!.querySelector('h2'), sectionRef.current!.querySelector('p')], {
        opacity: 0,
        y: 40,
      });
      gsap.set(stepsRef.current!, { opacity: 0, y: 20 });
      gsap.set(progressLineRef.current!, { width: '0%' });
      gsap.set(progressMarkersRef.current!.querySelectorAll('.progress-marker'), { opacity: 0, scale: 0 });

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

      // Steps container
      tl.to(stepsRef.current!, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.5');

      // Initialize progress line and markers
      return tl;
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Individual step animations
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (reducedMotion) {
      // Already set in the first useEffect, but we can set again to be safe
      processSteps.forEach((step) => {
        const markerInner = document.querySelector(`[data-step-inner="${step.id}"]`) as HTMLElement;
        const marker = document.querySelector(`[data-step="${step.id}"]`) as HTMLElement;
        if (markerInner) markerInner.style.opacity = '1';
        if (marker) {
          marker.style.opacity = '1';
          marker.style.transform = 'scale(1)';
        }
      });
      if (progressLineRef.current) {
        progressLineRef.current.style.width = '100%';
      }
      return;
    }

    processSteps.forEach((step, index) => {
      const stepContainer = document.querySelector(`[data-step-container="${step.id}"]`) as HTMLElement;
      const markerInner = document.querySelector(`[data-step-inner="${step.id}"]`) as HTMLElement;
      const marker = document.querySelector(`[data-step="${step.id}"]`) as HTMLElement;

      if (!stepContainer || !markerInner || !marker) return;

      gsap.to(markerInner, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stepContainer,
          start: 'top 70%',
          once: true,
        },
      });

      gsap.to(marker, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stepContainer,
          start: 'top 70%',
          once: true,
        },
      });

      // Update progress line width
      gsap.to(progressLineRef.current, {
        width: `${((index + 1) / processSteps.length) * 100}%`,
        duration: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stepContainer,
          start: 'top 70%',
          once: true,
        },
      });
    });
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-24 md:py-32 lg:py-40"
      aria-labelledby="process-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 id="process-heading" className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-stone-900 mb-6">
            Our process
          </h2>
          <p className="text-stone-600 text-lg max-w-xl">
            A collaborative journey from discovery to delivery, ensuring every detail aligns with your vision.
          </p>
        </div>

        <div className="relative">
          {/* Progress Line */}
          <div
            ref={progressLineRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-0 bg-stone-300/50"
          />

          {/* Progress Markers */}
          <div ref={progressMarkersRef} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 flex space-x-12">
            {processSteps.map((step) => (
              <div
                key={step.id}
                className="progress-marker flex items-center justify-center w-10 h-10 rounded-full bg-stone-900/10 text-stone-900/50 transition-all duration-500"
                data-step={step.id}
              >
                <div className="w-4 h-4 bg-stone-900 rounded-full opacity-0" data-step-inner={step.id} />
              </div>
            ))}
          </div>

          {/* Steps Container */}
          <div ref={stepsRef} className="relative pt-20 md:pt-24 lg:pt-32">
            <div className="gap-8 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step) => (
                <div
                  key={step.id}
                  className="text-center"
                  data-step-container={step.id}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-8 h-8 flex items-center justify-center bg-stone-900/10 text-stone-900 rounded-md">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl font-light tracking-tight text-stone-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-stone-600 text-sm max-w-xs">
                    {step.shortDescription}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}