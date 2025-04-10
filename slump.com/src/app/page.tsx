import { HeroSection } from '@/components/sections/HeroSection';
import { MusicSection } from '@/components/sections/MusicSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <MusicSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}