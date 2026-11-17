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
    <section className="hero-section min-vh-100 d-flex align-items-center justify-content-center position-relative text-center pt-3 pt-md-4 pb-4">
      {/* Background radial glow */}
      <div
        className="position-absolute top-50 start-50 translate-middle w-75 h-75 rounded-circle pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(226, 149, 120, 0.16) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0
        }}
      />

      <div className="container position-relative px-3" style={{ zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-9 col-xl-8">
            {/* Monogram - Perfectly Centered, Never Wraps, S & S Always Fits Inside Round */}
            <div className="mb-3 reveal-on-scroll">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle shadow-sm border border-rose-gold animate-float"
                style={{
                  width: '92px',
                  height: '92px',
                  minWidth: '92px',
                  minHeight: '92px',
                  background: 'linear-gradient(135deg, #fffaf7 0%, #fcedea 100%)',
                  padding: 0
                }}
              >
                <span
                  className="font-cinzel fw-bold"
                  style={{
                    fontSize: '1.25rem',
                    letterSpacing: '1px',
                    whiteSpace: 'nowrap',
                    lineHeight: 1,
                    color: '#8c3a48'
                  }}
                >
                  S &amp; S
                </span>
              </div>
            </div>

            {/* Sacred Invocation */}
            <div className="badge-rose mb-3 d-inline-flex align-items-center gap-2 reveal-on-scroll">
              <Sparkles size={12} />
              <span>॥ శ్రీ విఘ్నేశ్వరాయ నమః ॥ In The Name of Divine Love</span>
              <Sparkles size={12} />
            </div>

            <p
              className="text-muted text-uppercase tracking-widest small mb-1 fw-semibold reveal-on-scroll"
              style={{ letterSpacing: '3px', fontSize: '0.72rem' }}
            >
              We Are Getting Married
            </p>

            {/* Couple's Names - Bold, Rich High-Contrast Color so 'Sai' (and 'ai') is 100% Crisp and Clear! */}
            <h1
              className="font-script display-1 my-1 hero-couple-title reveal-on-scroll"
              style={{
                fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
                
              }}
            >
              Sai <span className="font-serif text-secondary opacity-75" style={{ fontSize: '0.8em' }}>&amp;</span> Saraswathi
            </h1>

            {/* Couple Photo Teaser in Hero */}
            <div className="my-3 reveal-on-scroll">
              <div
                className="d-inline-block rounded-circle p-1 border border-2 border-rose-gold shadow-sm"
                style={{ width: '110px', height: '110px', overflow: 'hidden' }}
              >
                <img
                  src="/images/marriage.jpg"
                  alt="Sai & Saraswathi"
                  className="w-100 h-100 rounded-circle"
                  style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
                />
              </div>
            </div>

            {/* Invitation Text */}
            <p
              className="font-cormorant fs-4 text-muted fst-italic mx-auto my-3 px-2 reveal-on-scroll"
              style={{ maxWidth: '580px', lineHeight: 1.5, fontSize: 'clamp(1.15rem, 3.5vw, 1.45rem)' }}
            >
              &quot;Two lives, two hearts, joined together in friendship, united forever in love. With the blessings of our parents and elders, we invite you to celebrate our wedding union.&quot;
            </p>

            {/* Date & Location Badges */}
            <div className="my-3 d-flex flex-wrap justify-content-center gap-2 reveal-on-scroll">
              <div
                className="px-3 py-1 py-md-2 rounded-pill shadow-sm d-inline-flex align-items-center gap-2 border border-rose-gold"
                style={{ background: 'rgba(255, 255, 255, 0.95)' }}
              >
                <Calendar size={14} className="text-rose-gold" />
                <span className="font-cinzel fw-bold small text-dark" style={{ fontSize: '0.8rem' }}>
                  13th December 2026
                </span>
              </div>

              <div
                className="px-3 py-1 py-md-2 rounded-pill shadow-sm d-inline-flex align-items-center gap-2 border border-rose-gold"
                style={{ background: 'rgba(255, 255, 255, 0.95)' }}
              >
                <Clock size={14} className="text-rose-gold" />
                <span className="small fw-semibold text-dark" style={{ fontSize: '0.8rem' }}>
                  Muhurtham: Night 8:15 PM
                </span>
              </div>

              <div
                className="px-3 py-1 py-md-2 rounded-pill shadow-sm d-inline-flex align-items-center gap-2 border border-rose-gold"
                style={{ background: 'rgba(255, 255, 255, 0.95)' }}
              >
                <MapPin size={14} className="text-rose-gold" />
                <span className="small fw-semibold text-dark" style={{ fontSize: '0.8rem' }}>
                  Kadiam, India
                </span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="d-flex flex-wrap justify-content-center gap-2 gap-sm-3 mt-3 mt-md-4 reveal-on-scroll">
              <button
                onClick={onScrollToScratch}
                className="btn btn-rose-gold d-inline-flex align-items-center gap-2 shadow"
              >
                <Sparkles size={15} />
                <span>Scratch Card Date Reveal</span>
              </button>

              <button
                onClick={onScrollToVenue}
                className="btn btn-outline-rose-gold d-inline-flex align-items-center gap-2"
              >
                <MapPin size={15} />
                <span>Venue &amp; Location</span>
              </button>

              {onReplayCard && (
                <button
                  onClick={onReplayCard}
                  className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-2 d-inline-flex align-items-center gap-1 text-dark"
                  title="Re-open the full wedding card"
                  style={{ fontSize: '0.78rem' }}
                >
                  <RotateCcw size={13} />
                  <span>Replay Card</span>
                </button>
              )}
            </div>

            {/* Scroll Indicator */}
            <div className="mt-4 pt-2 reveal-on-scroll">
              <button
                onClick={onScrollToScratch}
                className="btn btn-link text-muted p-0 text-decoration-none animate-float"
                aria-label="Scroll down to scratch card"
              >
                <span
                  className="small d-block mb-1 text-uppercase"
                  style={{ letterSpacing: '2px', fontSize: '0.65rem' }}
                >
                  Scroll To Explore
                </span>
                <ChevronDown size={20} className="text-rose-gold" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
