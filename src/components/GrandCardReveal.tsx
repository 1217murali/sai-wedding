import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, ArrowRight, X } from 'lucide-react';
import { weddingAudio } from '../utils/audio';

interface GrandCardRevealProps {
  onOpenComplete: () => void;
}

export const GrandCardReveal: React.FC<GrandCardRevealProps> = ({ onOpenComplete }) => {
  // Phase: 'cover' (outer sealed card) -> 'unfolded' (inside letter revealed) -> 'exiting' (fade out)
  const [phase, setPhase] = useState<'cover' | 'unfolded' | 'exiting'>('cover');

  const handleOpenEnvelope = () => {
    if (phase !== 'cover') return;

    // Play celebration audio chime
    weddingAudio.playCelebrationChime();

    // Delicate celebratory sprinkle
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    confetti({
      particleCount: isMobile ? 28 : 50,
      spread: isMobile ? 50 : 70,
      origin: { y: 0.5 },
      colors: ['#E29578', '#F7D6CB', '#D4AF37', '#FFFFFF', '#F8C8DC'],
      disableForReducedMotion: true
    });

    setPhase('unfolded');
  };

  const handleEnterWebsite = () => {
    setPhase('exiting');
    setTimeout(() => {
      onOpenComplete();
    }, 600);
  };

  return (
    <div
      className={`fullscreen-card-overlay ${phase === 'exiting' ? 'fade-out-overlay' : ''}`}
      role="dialog"
      aria-modal="true"
    >
      {/* Background ambient lighting */}
      <div className="card-ambient-bg" />

      {/* Discrete skip button */}
      <button
        onClick={handleEnterWebsite}
        className="btn-skip-invitation"
        aria-label="Skip to website"
      >
        <span>Skip to site</span>
        <X size={14} />
      </button>

      {/* ========================================================
          PHASE 1: OUTER ENVELOPE / ROYAL COVER (FULL SCREEN)
          ======================================================== */}
      {phase === 'cover' && (
        <div className="outer-cover-container" onClick={handleOpenEnvelope}>
          {/* Ornate Indian Toran / Arch at Top */}
          <div className="royal-arch-decoration">
            <span className="arch-flourish">❦ ❧</span>
          </div>

          <div className="cover-inner-content">
            {/* Sacred Invocation */}
            <div className="telugu-invocation">
              <span className="telugu-text">॥ శ్రీ విఘ్నేశ్వరాయ నమః ॥</span>
              <span className="latin-sub">Śrī Gaṇēśāya Namaḥ</span>
            </div>

            {/* Monogram Badge */}
            <div className="royal-cover-monogram">
              <span className="monogram-text">S &amp; S</span>
            </div>

            <p className="cover-invitation-subtitle">Royal Wedding Invitation</p>

            <h1 className="cover-couple-names">
              Sai <span className="cover-amp">&amp;</span> Saraswathi
            </h1>

            <div className="cover-meta-badge">
              <span>Sunday, 13th December 2026</span>
              <span className="meta-sep">•</span>
              <span>Kadiam, Andhra Pradesh</span>
            </div>

            {/* Shimmering Silk Ribbon Sash */}
            <div className="cover-silk-ribbon">
              <div className="ribbon-line" />
            </div>

            {/* 3D Wax Seal with pulsating touch glow */}
            <div className="cover-wax-seal-wrapper">
              <div className="wax-seal-glow-ring" />
              <button
                type="button"
                className="cover-wax-seal"
                aria-label="Tap to open wedding invitation"
              >
                <div className="wax-seal-ring">
                  <span className="wax-seal-monogram">S &amp; S</span>
                  <Heart size={10} fill="#fcedc5" className="wax-seal-heart" />
                </div>
              </button>
            </div>

            {/* Touch to Open CTA */}
            <div className="cover-tap-cta">
              <div className="tap-cta-bubble">
                <Sparkles size={14} className="text-warning animate-bounce" />
                <span>Tap Seal to Open Wedding Card</span>
                <Sparkles size={14} className="text-warning animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          PHASE 2: UNFOLDED ROYAL WEDDING CARD / LETTER (FULL SCREEN)
          ======================================================== */}
      {phase === 'unfolded' && (
        <div className="unfolded-card-container">
          <div className="unfolded-scroll-wrapper">
            <div className="royal-letter-sheet">
              {/* Ornate corner borders */}
              <div className="letter-corner corner-tl">❧</div>
              <div className="letter-corner corner-tr">❧</div>
              <div className="letter-corner corner-bl">❧</div>
              <div className="letter-corner corner-br">❧</div>

              {/* Inner content */}
              <div className="letter-body text-center">
                {/* Traditional Telugu Shloka */}
                <div className="sacred-shloka">
                  <div className="shloka-main">
                    ॥ కల్యాణాద్భుతగాత్రాయ కామితార్థప్రదాయినే ।<br />
                    శ్రీమద్వేంకటనాథాయ శ్రీనివాసాయ తే నమః ॥
                  </div>
                  <div className="shloka-sub">
                    With the divine blessings of Lord Venkateswara &amp; our respected elders
                  </div>
                </div>

                <div className="letter-invitation-lead">
                  Together with their families, cordially invite you to celebrate the holy matrimony of
                </div>

                {/* Couple Names */}
                <h2 className="letter-couple-names">
                  Sai <span className="amp">&amp;</span> Saraswathi
                </h2>

                <div className="letter-ornament-divider">
                  <span className="line" />
                  <span className="icon">❦</span>
                  <span className="line" />
                </div>

                {/* Sacred Muhurtham Card */}
                <div className="letter-date-box">
                  <div className="date-label">Auspicious Sumuhurtham</div>
                  <div className="date-value">Sunday, 13th December 2026</div>
                  <div className="time-value">Night 8:15 PM Onwards</div>
                </div>

                {/* Venue Details */}
                <div className="letter-venue-box">
                  <div className="venue-title">Sri Venkateswara Royal Convention</div>
                  <div className="venue-desc">
                    Main Road, Garden Lawns, Kadiam<br />
                    East Godavari District, Andhra Pradesh 533126
                  </div>
                </div>

                <p className="letter-closing-note">
                  &quot;Your gracious presence, warm prayers, and heartfelt blessings are the greatest gifts as we embark on this sacred journey of togetherness.&quot;
                </p>

                {/* Primary Button to enter website */}
                <div className="letter-action-container">
                  <button
                    onClick={handleEnterWebsite}
                    className="btn btn-enter-celebration"
                  >
                    <span>Enter Wedding Celebration</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
