import React from 'react';
import { Calendar, MapPin, Sparkles, ChevronDown, Clock, RotateCcw } from 'lucide-react';

interface HeroProps {
  onScrollToScratch: () => void;
  onScrollToVenue: () => void;
  onReplayCard?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToScratch,
  onScrollToVenue,
  onReplayCard
}) => {
  return (
    <section className="hero-section min-vh-100 d-flex align-items-center justify-content-center position-relative text-center pt-4 pb-5">
      {/* Background radial glow with Rose Gold tint */}
      <div
        className="position-absolute top-50 start-50 translate-middle w-75 h-75 rounded-circle pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(226, 149, 120, 0.18) 0%, transparent 70%)',
          filter: 'blur(70px)',
          zIndex: 0
        }}
      />

      <div className="container position-relative px-3 px-md-4" style={{ zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-9 col-xl-8">
            {/* Ornate Monogram */}
            <div className="mb-3 mb-md-4">
              <div
                className="d-inline-flex align-items-center justify-content-center p-3 rounded-circle shadow-sm border border-rose-gold animate-float"
                style={{
                  width: '92px',
                  height: '92px',
                  background: 'linear-gradient(135deg, #fffaf7 0%, #fcedea 100%)'
                }}
              >
                <span className="font-cinzel fs-2 fw-bold rose-gold-text">
                  S &amp; S
                </span>
              </div>
            </div>

            {/* Sacred Telugu & Sanskrit Invocation */}
            <div className="badge-rose mb-3 d-inline-flex align-items-center gap-2">
              <Sparkles size={13} />
              <span>॥ శ్రీ విఘ్నేశ్వరాయ నమః ॥ In The Name of Eternal Love</span>
              <Sparkles size={13} />
            </div>

            <p
              className="text-muted text-uppercase tracking-widest small mb-2 fw-semibold"
              style={{ letterSpacing: '4px', fontSize: '0.75rem' }}
            >
              We Are Getting Married
            </p>

            {/* Couple's Names */}
            <h1
              className="font-script display-1 my-2 rose-gold-text"
              style={{ fontSize: 'clamp(3rem, 9vw, 5.8rem)', lineHeight: 1.15 }}
            >
              Sai <span className="text-secondary opacity-75 font-serif">&amp;</span> Saraswathi
            </h1>

            {/* Formal Invitation Text */}
            <p
              className="font-cormorant fs-4 text-muted fst-italic mx-auto my-3 px-2"
              style={{ maxWidth: '620px', lineHeight: 1.6 }}
            >
              &quot;Two lives, two hearts, joined together in friendship, united forever in love. With the blessings of our parents and elders, we invite you to celebrate our wedding union.&quot;
            </p>

            {/* Date & Location Ribbons */}
            <div className="my-3 d-flex flex-wrap justify-content-center gap-2">
              <div
                className="px-3 py-2 rounded-pill shadow-sm d-inline-flex align-items-center gap-2 border border-rose-gold"
                style={{ background: 'rgba(255, 255, 255, 0.95)' }}
              >
                <Calendar size={16} className="text-rose-gold" />
                <span className="font-cinzel fw-bold small text-dark">
                  13th December 2026
                </span>
              </div>

              <div
                className="px-3 py-2 rounded-pill shadow-sm d-inline-flex align-items-center gap-2 border border-rose-gold"
                style={{ background: 'rgba(255, 255, 255, 0.95)' }}
              >
                <Clock size={16} className="text-rose-gold" />
                <span className="small fw-semibold text-dark">
                  Sumuhurtham: Night 8:15 PM Onwards
                </span>
              </div>

              <div
                className="px-3 py-2 rounded-pill shadow-sm d-inline-flex align-items-center gap-2 border border-rose-gold"
                style={{ background: 'rgba(255, 255, 255, 0.95)' }}
              >
                <MapPin size={16} className="text-rose-gold" />
                <span className="small fw-semibold text-dark">Kadiam, India</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
              <button
                onClick={onScrollToScratch}
                className="btn btn-rose-gold d-inline-flex align-items-center gap-2 shadow"
              >
                <Sparkles size={16} />
                <span>Scratch Card Date Reveal</span>
              </button>

              <button
                onClick={onScrollToVenue}
                className="btn btn-outline-rose-gold d-inline-flex align-items-center gap-2"
              >
                <MapPin size={16} />
                <span>Venue &amp; Location</span>
              </button>

              {onReplayCard && (
                <button
                  onClick={onReplayCard}
                  className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-2 d-inline-flex align-items-center gap-1 text-dark"
                  title="Re-open the 3D wedding card animation"
                >
                  <RotateCcw size={14} />
                  <span>Replay Card</span>
                </button>
              )}
            </div>

            {/* Scroll Indicator */}
            <div className="mt-5 pt-2">
              <button
                onClick={onScrollToScratch}
                className="btn btn-link text-muted p-0 text-decoration-none animate-float"
                aria-label="Scroll down to scratch card"
              >
                <span
                  className="small d-block mb-1 text-uppercase"
                  style={{ letterSpacing: '2px', fontSize: '0.68rem' }}
                >
                  Scroll To Scratch Card
                </span>
                <ChevronDown size={22} className="text-rose-gold" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
