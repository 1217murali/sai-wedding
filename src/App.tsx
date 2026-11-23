import React from 'react';
import { FallingPetals } from './components/FallingPetals';
import { Hero } from './components/Hero';
import { ScratchCard } from './components/ScratchCard';
import { CountdownTimer } from './components/CountdownTimer';
import { CoupleSpotlight } from './components/CoupleSpotlight';
import { PhotoGallery } from './components/PhotoGallery';
import { LocationVenue } from './components/LocationVenue';
import { Footer } from './components/Footer';
import { useScrollReveal } from './utils/useScrollReveal';

export const App: React.FC = () => {
  // Initialize smooth scroll-triggered reveal animations
  useScrollReveal();

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="wedding-app min-vh-100 position-relative">
      {/* Floating Rose Petals Canvas */}
      <FallingPetals enabled={true} />

      {/* Main Wedding Invitation Page */}
      <main id="top">
        {/* Hero Section */}
        <Hero
          onScrollToScratch={() => scrollToSection('scratch')}
          onScrollToVenue={() => scrollToSection('venue')}
        />

        {/* Interactive Scratch Card Section */}
        <section id="scratch" className="py-4 py-md-5">
          <div className="container px-3">
            <div className="glass-card-rose p-3 p-md-5 reveal-on-scroll">
              <ScratchCard />
            </div>
          </div>
        </section>

        {/* Real-time Countdown Timer */}
        <CountdownTimer />

        {/* Couple Portrait Spotlight (Sai & Saraswathi) */}
        <CoupleSpotlight />

        {/* Cherished Moments Photo Gallery */}
        <PhotoGallery />

        {/* Grand Venue & Location Spotlight (Kadiam, Andhra Pradesh, India) */}
        <LocationVenue />
      </main>

      {/* Royal Wedding Footer */}
      <Footer />
    </div>
  );
};

export default App;
