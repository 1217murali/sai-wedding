import React from 'react';
import { Sparkles } from 'lucide-react';

interface HeroProps {
  onScrollToScratch?: () => void;
  onScrollToVenue?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section className="hero-section min-vh-80 min-vh-lg-100 d-flex align-items-center justify-content-center position-relative text-center">
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
            {/* Monogram / Logo - Perfectly Centered, Never Wraps, S & S Always Fits Inside Round */}
            <div className="mb-2 reveal-on-scroll">
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

            {/* Telugu Title directly after Logo */}
            <div className="my-2 reveal-on-scroll">
              <h2
                className="fw-bold m-0"
                style={{
                  fontFamily: "'Noto Sans Telugu', 'Gautami', 'Telugu Sangam MN', sans-serif",
                  fontSize: 'clamp(1.18rem, 4vw, 1.6rem)',
                  background: 'linear-gradient(135deg, #881337 0%, #b84656 40%, #c46243 75%, #881337 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: '#9e2a3b',
                  letterSpacing: '0.5px',
                  lineHeight: 1.4,
                  display: 'inline-block',
                  textShadow: '0 1px 2px rgba(226, 149, 120, 0.25)'
                }}
              >
                శెట్టి వారి వివాహ ఆహ్వానము
              </h2>
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
                fontSize: 'clamp(2.8rem, 8vw, 5.5rem)'
              }}
            >
              Sai <span className="font-serif text-secondary opacity-75" style={{ fontSize: '0.8em' }}>&amp;</span> Saraswathi
            </h1>

            {/* Couple Photo Teaser in Hero */}
            <div className="my-3 reveal-on-scroll">
              <div
                className="d-inline-block p-1 border border-2 border-rose-gold shadow-sm"
                style={{ width: '110px', height: '110px', overflow: 'hidden' }}
              >
                <img
                  src="/images/home.avif"
                  alt="Sai & Saraswathi"
                  className="w-100 h-100"
                  style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
                />
              </div>
            </div>

            {/* Invitation Text */}
            <p
              className="font-cormorant fs-4 text-muted fst-italic mx-auto my-3 px-2 reveal-on-scroll"
              style={{ maxWidth: '580px', lineHeight: 1.5, fontSize: 'clamp(1.15rem, 3.5vw, 1.45rem)' }}
            >
              &quot;Two families united by destiny, two souls brought together by tradition, beginning a sacred lifelong journey of companionship. With the blessings of our parents and elders, we cordially invite you to celebrate our wedding union.&quot;
            </p>
            <p
              className="text-muted mx-auto mb-3 px-2 reveal-on-scroll"
              style={{
                fontFamily: "'Noto Sans Telugu', 'Gautami', 'Telugu Sangam MN', sans-serif",
                maxWidth: '560px',
                lineHeight: 1.6,
                fontSize: 'clamp(0.88rem, 2.5vw, 1.05rem)',
                color: '#6b5550'
              }}
            >
              &quot;పెద్దల నిశ్చయంతో, దైవ సంకల్పంతో... రెండు కుటుంబాలు ఒక్కటై, నూతన జీవిత ప్రయాణాన్ని ప్రారంభిస్తున్న శుభవేళ... తల్లిదండ్రులు మరియు పెద్దల ఆశీస్సులతో జరుగనున్న మా వివాహ మహోత్సవానికి మిమ్ములను సాదరంగా ఆహ్వానిస్తున్నాము.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
