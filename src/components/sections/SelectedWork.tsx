'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectModal } from '@/components/ui/ProjectModal';
import { projects } from '@/data/projects';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SelectedWorkProps {
  reducedMotion?: boolean;
}

export function SelectedWork({ reducedMotion = false }: SelectedWorkProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[number] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      gsap.set(galleryRef.current!, { opacity: 0, x: 0 });

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

      // Gallery container
      tl.to(galleryRef.current!, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.5');

      return tl;
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleOpenProject = (project: typeof projects[number]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isModalOpen) {
      handleCloseModal();
    }
  }, [isModalOpen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isModalOpen]);

  return (
    <>
      <section
        ref={sectionRef}
        id="work"
        className="relative py-24 md:py-32 lg:py-40"
        aria-labelledby="work-heading"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-16">
            <h2 id="work-heading" className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-stone-900 mb-6">
              Selected work
            </h2>
            <p className="text-stone-600 text-lg max-w-xl">
              A curated selection of recent projects showcasing our approach to residential and hospitality interiors.
            </p>
          </div>

          {/* Horizontal Gallery (Desktop) */}
          <div
            ref={galleryRef}
            className="relative overflow-hidden mb-12"
            aria-label="Project gallery"
          >
            {/* Progress Indicator */}
            <div ref={progressRef} className="absolute top-0 left-0 h-0.5 bg-stone-300/50" />
            
            {/* Project Track */}
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`absolute inset-0 flex items-end pt-6 pb-4 pl-6 pr-4 ${index === 0 ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-1000 ease-in-out`}
                  style={{ zIndex: projects.length - index }}
                  onClick={() => handleOpenProject(project)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Explore ${project.title}`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={project.heroImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33.333vw"
                      className="object-cover group-hover:opacity-90 transition-opacity"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/0 via-stone-900/40 to-stone-900/60" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="font-serif text-2xl md:text-3xl font-light tracking-tight text-stone-50 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-stone-400 text-sm md:text-base">
                        {project.location} • {project.type} • {project.year}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Gallery Stack */}
          <div className="space-y-12 md:hidden">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleOpenProject(project)}
                className="relative overflow-hidden rounded-lg border border-stone-200"
                role="button"
                tabIndex={0}
                aria-label={`Explore ${project.title}`}
              >
                <div className="relative h-[400px]">
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="object-cover group-hover:opacity-90 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/0 via-stone-900/40 to-stone-900/60" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-serif text-2xl font-light tracking-tight text-stone-50 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-stone-400 text-sm">
                      {project.location} • {project.type} • {project.year}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {isModalOpen && selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </>
  );
}

// Import Image from next/image (placed here to avoid linting issues with client component)
import Image from 'next/image';