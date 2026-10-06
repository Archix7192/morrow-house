'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { journalArticles } from '@/data/journal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface JournalProps {
  reducedMotion?: boolean;
}

export function Journal({ reducedMotion = false }: JournalProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion) {
      gsap.set([sectionRef.current!.querySelector('h2'), sectionRef.current!.querySelector('p'), sectionRef.current!.querySelectorAll('.article-card')], {
        opacity: 1,
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set([sectionRef.current!.querySelector('h2'), sectionRef.current!.querySelector('p')], {
        opacity: 0,
        y: 40,
      });
      gsap.set(sectionRef.current!.querySelectorAll('.article-card'), { opacity: 0, y: 40 });

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

      // Article cards
      tl.to(sectionRef.current!.querySelectorAll('.article-card'), {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      }, '-=0.5');
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="journal"
      className="relative py-24 md:py-32 lg:py-40"
      aria-labelledby="journal-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 id="journal-heading" className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-stone-900 mb-6">
            Journal
          </h2>
          <p className="text-stone-600 text-lg max-w-xl">
            Insights, reflections, and ideas from our studio.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {journalArticles.map((article) => (
            <div
              key={article.id}
              className="article-card bg-white rounded-xl border border-stone-200 overflow-hidden hover:border-stone-300 transition-border"
            >
              <div className="relative h-[300px] md:h-[350px]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33.333vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/0 via-stone-900/40 to-stone-900/60" />
                <div className="absolute bottom-4 left-4 right-4 text-stone-50 text-sm">
                  {article.category} • {article.date}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-serif text-xl md:text-2xl font-light tracking-tight text-stone-900 mb-3">
                  {article.title}
                </h3>
                <p className="text-stone-600 leading-relaxed mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-3 text-stone-500 text-sm">
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Import Image from next/image (placed here to avoid linting issues with client component)
import Image from 'next/image';