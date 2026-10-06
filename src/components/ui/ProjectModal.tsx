'use client';

import { useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin();
}

interface ProjectModalProps {
  project: {
    id: string;
    title: string;
    location: string;
    type: string;
    year: string;
    description: string;
    images: string[];
    heroImage: string;
  };
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Project details: ${project.title}`}
    >
      <div className="relative max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 w-full">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-stone-400 hover:text-stone-50 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div className="relative bg-stone-50 rounded-xl overflow-hidden shadow-2xl">
          {/* Image Carousel */}
          <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
            {project.images.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 opacity-${index === 0 ? '100' : '0'} transition-opacity duration-1000 ease-in-out`}
              >
                <Image
                  src={img}
                  alt={`${project.title} - image ${index + 1}`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/0 via-stone-900/30 to-stone-900/60" />
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="pt-10 md:pt-16 lg:pt-20 px-6 md:px-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-2 h-2 bg-stone-900 rounded-full" />
              <span className="text-stone-600 text-sm uppercase tracking-wider">
                {project.location}
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-stone-900 mb-4">
              {project.title}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-stone-500 text-sm">
              <div>
                <p className="font-medium text-stone-700">Type</p>
                <p>{project.type}</p>
              </div>
              <div>
                <p className="font-medium text-stone-700">Year</p>
                <p>{project.year}</p>
              </div>
              <div>
                <p className="font-medium text-stone-700">Location</p>
                <p>{project.location}</p>
              </div>
            </div>

            <p className="text-stone-600 text-lg md:text-xl leading-relaxed mb-8">
              {project.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" size="lg" onClick={onClose} asChild>
                <span>Close</span>
              </Button>
              <Button variant="primary" size="lg" onClick={onClose} asChild>
                <span>Explore more projects</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}