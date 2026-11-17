import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { weddingAudio } from '../utils/audio';

interface GrandCardRevealProps {
  onOpenComplete: () => void;
}

export const GrandCardReveal: React.FC<GrandCardRevealProps> = ({ onOpenComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenCard = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    // Audio chime
    weddingAudio.playCelebrationChime();

    // Trigger double blast of rose gold & golden petal confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.55 },
      colors: ['#E29578', '#F7D6CB', '#C48B79', '#D4AF37', '#FFFFFF']
    });

    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 60,
        origin: { x: 0.1, y: 0.6 },
        colors: ['#E29578', '#F8C8DC', '#D4AF37']
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 60,
        origin: { x: 0.9, y: 0.6 },
        colors: ['#E29578', '#F8C8DC', '#D4AF37']
      });
    }, 350);

    // Transition after 3D card unfolds
    setTimeout(() => {
      setIsOpen(true);
      setTimeout(() => {
        onOpenComplete();
      }, 700);
    }, 1200);
  };

  return (
    <div
      className={`card-reveal-overlay ${isOpen ? 'card-reveal-fade-out' : ''}`}
      aria-modal="true"
      role="dialog"
    >
      {/* Background ambient glow */}
      <div className="card-reveal-backdrop" />

      {/* Floating Sparkles in the backdrop */}
      <div className="card-reveal-sparkles">
        <span className="sparkle-dot dot-1" />
        <span className="sparkle-dot dot-2" />
        <span className="sparkle-dot dot-3" />
        <span className="sparkle-dot dot-4" />
      </div>

      <div className="envelope-scene">
        {/* 3D Royal Envelope Container */}
        <div
          className={`royal-envelope ${isOpening ? 'envelope-open' : ''}`}
          onClick={handleOpenCard}
        >
          {/* Top Flap with 3D Fold */}
          <div className="envelope-flap" />

          {/* Envelope Pocket Front */}
          <div className="envelope-pocket">
            {/* Ornate Indian Floral Border Filigree */}
            <div className="pocket-filigree-border" />

            {/* Sacred Invocation */}
            <div className="sacred-invocation">
              <span>॥ శ్రీ విఘ్నేశ్వరాయ నమః ॥</span>
              <div className="small-latin">Śrī Gaṇēśāya Namaḥ</div>
            </div>

            {/* Couple Monogram on Envelope */}
            <div className="envelope-header-text">
              <div className="envelope-invitation-tag">Royal Wedding Invitation</div>
              <h2 className="envelope-names">Sai &amp; Saraswathi</h2>
              <div className="envelope-date-location">
                <span>13th December 2026</span>
                <span className="dot-sep">•</span>
                <span>Kadiam, India</span>
              </div>
            </div>

            {/* Silk Ribbon */}
            <div className="envelope-ribbon">
              <div className="ribbon-shine" />
            </div>

            {/* 3D Wax Seal with S & S monogram */}
            <div className={`royal-wax-seal ${isOpening ? 'seal-break' : 'seal-pulse'}`}>
              <div className="seal-ring">
                <div className="seal-inner">
                  <span className="seal-monogram">S &amp; S</span>
                  <Heart size={10} fill="#fcedc5" className="seal-heart" />
                </div>
              </div>
            </div>

            {/* Tap to open hint */}
            <div className="envelope-tap-cta">
              <div className="cta-pill">
                <Sparkles size={14} className="text-warning animate-bounce" />
                <span>Tap Seal To Open Invitation</span>
                <Sparkles size={14} className="text-warning animate-bounce" />
              </div>
            </div>
          </div>

          {/* Letter / Card sliding up from inside */}
          <div className="inner-wedding-card">
            <div className="inner-card-border">
              <div className="inner-card-monogram">S &amp; S</div>
              <div className="inner-card-sub">Together With Their Families</div>
              <h3 className="inner-card-title">Sai &amp; Saraswathi</h3>
              <p className="inner-card-desc">
                Request the pleasure of your gracious company at their wedding ceremony
              </p>
              <div className="inner-card-date">Sunday, 13th December 2026</div>
              <div className="inner-card-time">Sumuhurtham: Night 8:15 PM Onwards</div>
              <div className="inner-card-venue">Kadiam, Andhra Pradesh</div>
            </div>
          </div>
        </div>

        {/* Quick Skip Button for accessibility */}
        <div className="text-center mt-4">
          <button
            onClick={onOpenComplete}
            className="btn btn-sm btn-link text-white-50 text-decoration-none small"
            style={{ fontSize: '0.8rem', letterSpacing: '1px' }}
          >
            Skip directly to website &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
