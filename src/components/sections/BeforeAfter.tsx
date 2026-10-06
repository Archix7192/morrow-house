'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface BeforeAfterProps {
  reducedMotion?: boolean;
}

export function BeforeAfter({ reducedMotion = false }: BeforeAfterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState(false);
  const [position, setPosition] = useState(50); // percentage

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
      gsap.set(sliderRef.current!, { opacity: 0, y: 20 });

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

      // Slider container
      tl.to(sliderRef.current!, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.5');
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Mouse events
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setDrag(true);
    const rect = sliderRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percent);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!drag) return;
    const rect = sliderRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percent);
  }, [drag]);

  const handleMouseUp = useCallback(() => {
    setDrag(false);
  }, []);

  // Touch events
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setDrag(true);
    const rect = sliderRef.current!.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percent);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!drag) return;
    const rect = sliderRef.current!.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percent);
  }, [drag]);

  const handleTouchEnd = useCallback(() => {
    setDrag(false);
  }, []);

  // Keyboard events
  const handleKeyDownSlider = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPosition(Math.min(100, position + 5));
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPosition(Math.max(0, position - 5));
    }
    if (e.key === 'Home') {
      e.preventDefault();
      setPosition(0);
    }
    if (e.key === 'End') {
      e.preventDefault();
      setPosition(100);
    }
  }, [position]);

  const handleKeyDownWindow = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPosition(Math.min(100, position + 5));
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPosition(Math.max(0, position - 5));
    }
    if (e.key === 'Home') {
      e.preventDefault();
      setPosition(0);
    }
    if (e.key === 'End') {
      e.preventDefault();
      setPosition(100);
    }
  }, [position]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDownWindow);
    return () => window.removeEventListener('keydown', handleKeyDownWindow);
  }, [handleKeyDownWindow]);

  return (
    <section
      ref={sectionRef}
      id="beforeafter"
      className="relative py-24 md:py-32 lg:py-40"
      aria-labelledby="beforeafter-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 id="beforeafter-heading" className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-stone-900 mb-6">
            Transformation
          </h2>
          <p className="text-stone-600 text-lg max-w-xl">
            See how considered design transforms spaces from ordinary to extraordinary.
          </p>
        </div>

        <div
          ref={sliderRef}
          className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-xl border border-stone-200"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onKeyDown={handleKeyDownSlider}
          tabIndex={0}
          role="slider"
          aria-label="Before and after comparison"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={position}
          aria-orientation="horizontal"
        >
          {/* Before Image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-63a8b1d0d9c5?w=1600&q=80"
              alt="Before renovation"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-900/0 via-stone-900/20 to-stone-900/40" />
          </div>

          {/* After Image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80"
              alt="After renovation"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-l from-stone-900/0 via-stone-900/20 to-stone-900/40" />
          </div>

          {/* Mask for after image */}
          <div
            className={`absolute inset-0 w-[${position}%] bg-stone-50 overflow-hidden`}
          >
            <Image
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80"
              alt="After renovation (visible portion)"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Divider */}
          <div className={`absolute left-[${position}%] top-0 h-full w-0.5 bg-stone-300/50`} />
          
          {/* Handle */}
          <div className={`absolute left-[${position}%] top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-6 h-6 rounded-full bg-stone-900/90 backdrop-blur-sm ring-2 ring-stone-900/20 hover:bg-stone-900 transition-all`} />
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center text-stone-500 text-sm">
          Drag the divider or use ← → keys to compare
        </div>
      </div>
    </section>
  );
}

// Import Image from next/image (placed here to avoid linting issues with client component)
import Image from 'next/image';