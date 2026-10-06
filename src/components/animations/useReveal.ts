'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseRevealOptions {
  trigger?: Element | string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  once?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

interface RevealTarget {
  element: Element;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  opacity?: number;
  stagger?: number;
  ease?: string;
}

export function useReveal(targets: RevealTarget[], options: UseRevealOptions = {}) {
  const ctxRef = useRef<gsap.Context | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: options.trigger || containerRef.current,
          start: options.start || 'top 80%',
          end: options.end || 'bottom 20%',
          scrub: options.scrub || false,
          once: options.once ?? true,
          onEnter: options.onEnter,
          onLeave: options.onLeave,
          onEnterBack: options.onEnterBack,
          onLeaveBack: options.onLeaveBack,
        },
      });

      targets.forEach((target) => {
        tl.to(
          target.element,
          {
            y: target.y ?? 0,
            x: target.x ?? 0,
            opacity: target.opacity ?? 1,
            duration: target.duration ?? 0.8,
            ease: target.ease || 'power3.out',
            delay: target.delay ?? 0,
          },
          target.stagger ? '<' : undefined
        );
      });

      return tl;
    }, containerRef);

    ctxRef.current = ctx;

    return () => {
      ctx.revert();
    };
  }, [targets, options.trigger, options.start, options.end, options.scrub, options.once, options.onEnter, options.onLeave, options.onEnterBack, options.onLeaveBack]);

  // Handle reduced motion preference
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return { containerRef, prefersReduced };
}

export function useScrollReveal(
  selector: string,
  options: {
    y?: number;
    duration?: number;
    stagger?: number;
    ease?: string;
    start?: string;
    once?: boolean;
  } = {}
) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = containerRef.current?.querySelectorAll(selector);
      if (!elements?.length) return;

      gsap.set(elements, { opacity: 0, y: options.y ?? 40 });

      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: options.duration ?? 0.8,
        ease: options.ease || 'power3.out',
        stagger: options.stagger ?? 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: options.start || 'top 80%',
          once: options.once ?? true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [selector, options.y, options.duration, options.stagger, options.ease, options.start, options.once]);

  return containerRef;
}

export function useParallax(speed: number = 0.3) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!elementRef.current) return;

      gsap.to(elementRef.current, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, elementRef);

    return () => ctx.revert();
  }, [speed]);

  return elementRef;
}

