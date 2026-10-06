import '@/app/globals.css';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { StudioIntro } from '@/components/sections/StudioIntro';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { Philosophy } from '@/components/sections/Philosophy';
import { Services } from '@/components/sections/Services';
import { BeforeAfter } from '@/components/sections/BeforeAfter';
import { Process } from '@/components/sections/Process';
import { Journal } from '@/components/sections/Journal';
import { EnquiryCTA } from '@/components/sections/EnquiryCTA';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Morrow House | Interior Design Studio',
  description: 'Award-winning interior design studio creating considered spaces that make room for life.',
  applicationName: 'Morrow House',
  themeColor: '#F4F1EA',
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StudioIntro />
        <SelectedWork />
        <Philosophy />
        <Services />
        <BeforeAfter />
        <Process />
        <Journal />
        <EnquiryCTA />
      </main>
      <Footer />
    </>
  );
}