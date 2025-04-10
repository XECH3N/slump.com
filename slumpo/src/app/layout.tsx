import './globals.css';
import '../styles/fonts.css';
import type { Metadata } from 'next';
import { OrbitalNavigation } from '../components/navigation/OrbitalNavigation';
import { NoiseLayer } from '../components/ui/NoiseLayer';
import { Footer } from '../components/layout/Footer';

const navigationItems = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'music', label: 'Music', path: '#music' },
  { id: 'about', label: 'About', path: '#about' },
  { id: 'contact', label: 'Contact', path: '#contact' },
];

export const metadata: Metadata = {
  title: 'MAJOR SLUMP | Disrupting The Norm',
  description: 'Cape Town trap hip hop artist with a unique sound',
  keywords: ['major slump', 'music', 'trap', 'hip hop', 'cape town', 'artist'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Rock+Salt&family=Space+Grotesk:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-black text-white min-h-screen">
        <OrbitalNavigation items={navigationItems} />
        <main>
          {children}
        </main>
        <Footer />
        <NoiseLayer />
      </body>
    </html>
  );
}