import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { weddingAudio } from '../utils/audio';

interface GrandCardRevealProps {
  onOpenComplete: () => void;
}

export const GrandCardReveal: React.FC<GrandCardRevealProps> = ({ onOpenComplete }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Audio chime
    weddingAudio.playCelebrationChime();

    // Delicate celebratory sprinkle
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    confetti({
      particleCount: isMobile ? 24 : 45,
      spread: isMobile ? 45 : 65,
      origin: { y: 0.55 },
      scalar: isMobile ? 0.8 : 0.9,
      colors: ['#E29578', '#F7D6CB', '#D4AF37', '#FFFFFF', '#F8C8DC'],
      disableForReducedMotion: true
    });

    // Smooth transition directly to website home (no second card!)
    setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        onOpenComplete();
      }, 650);
    }, 750);
  };

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onOpenComplete();
    }, 300);
  };

  return (
    <div
      className={`luxury-entry-overlay ${isFadingOut ? 'entry-fade-out' : ''}`}
      role="dialog"
      aria-modal="true"
    >
      {/* Ambient background glow */}
      <div className="entry-ambient-backdrop" />

      {/* Discrete skip option */}
      <button
        onClick={handleSkip}
        className="entry-skip-btn"
        aria-label="Skip to website home"
      >
        Skip directly &rarr;
      </button>

      {/* Luxury Royal Envelope Card */}
      <div className="entry-wrapper">
        <div
          className={`luxury-envelope ${isOpening ? 'envelope-opening' : ''}`}
          onClick={handleOpen}
        >
          {/* Envelope 3D Triangular Flap */}
          <div className="luxury-envelope-flap" />

          {/* Envelope Body */}
          <div className="luxury-envelope-body">
            {/* Top Invocation */}
            <div className="entry-invocation">
              <span className="invocation-sanskrit">॥ శ్రీ విఘ్నేశ్వరాయ నమః ॥</span>
              <span className="invocation-tag">Wedding Invitation</span>
            </div>

            {/* Couple Calligraphy */}
            <div className="entry-couple-block">
              <h1 className="entry-couple-names">Sai &amp; Saraswathi</h1>
              <div className="entry-date-place">
                <span>13th December 2026</span>
                <span className="sep">•</span>
                <span>Kadiam, Andhra Pradesh</span>
              </div>
            </div>

            {/* Silk Ribbon */}
            <div className="luxury-envelope-ribbon">
              <div className="ribbon-glow" />
            </div>

            {/* 3D Rose-Gold Wax Seal */}
            <div className="luxury-wax-seal-container">
              <div className={`luxury-wax-seal ${isOpening ? 'seal-break' : 'seal-pulse'}`}>
                <div className="wax-seal-border">
                  <span className="wax-seal-initials">S &amp; S</span>
                  <Heart size={9} fill="#fcedc5" className="wax-seal-mini-heart" />
                </div>
              </div>
            </div>

            {/* Tap Button */}
            <div className="entry-tap-action">
              <button
                type="button"
                className="btn-open-envelope"
                onClick={handleOpen}
                disabled={isOpening}
              >
                <Sparkles size={14} className="text-warning" />
                <span>{isOpening ? 'Opening Invitation...' : 'Tap To Open Invitation'}</span>
                <Sparkles size={14} className="text-warning" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
