import React from 'react';
import { Heart, ArrowUp, Phone, Share2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Sai & Saraswathi Wedding Invitation',
        text: 'You are cordially invited to celebrate the royal wedding of Sai & Saraswathi on 13th December 2026 at Kadiam!',
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Invitation link copied to clipboard!');
    }
  };

  return (
    <footer
      className="footer-section py-4 py-md-5 position-relative border-top border-rose-gold"
      style={{
        background: 'linear-gradient(180deg, rgba(254, 248, 246, 0.6) 0%, #fae8e2 100%)'
      }}
    >
      <div className="container text-center px-3 reveal-on-scroll">
        {/* Monogram */}
        <div className="mb-2 mb-md-3">
          <div
            className="d-inline-flex align-items-center justify-content-center p-3 rounded-circle shadow-sm border border-rose-gold"
            style={{ width: '66px', height: '66px', background: '#ffffff' }}
          >
            <span className="font-cinzel fs-4 fw-bold rose-gold-text">S&amp;S</span>
          </div>
        </div>

        <h3 className="font-script fs-1 text-dark mb-1">Sai &amp; Saraswathi</h3>
        <p className="font-cinzel small text-rose-gold fw-semibold mb-1" style={{ fontSize: '0.8rem' }}>13 • DECEMBER • 2026</p>
        <p className="text-muted small fw-medium mb-3" style={{ fontSize: '0.8rem' }}>Kadiam, Andhra Pradesh, India</p>

        <p className="text-muted small mx-auto mb-3 mb-md-4 px-2" style={{ maxWidth: '460px', fontSize: '0.82rem' }}>
          With joyful hearts and the blessings of our elders, our families eagerly look forward to welcoming you to shower your gracious blessings upon Sai &amp; Saraswathi.
        </p>

        <div className="d-flex flex-wrap justify-content-center gap-2 gap-sm-3 mb-3 mb-md-4">
          <button
            onClick={handleShare}
            className="btn btn-sm btn-rose-gold d-inline-flex align-items-center gap-2"
          >
            <Share2 size={13} /> Share Invitation
          </button>
          <a
            href="tel:+919876543210"
            className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1 d-inline-flex align-items-center gap-2 text-dark"
            style={{ fontSize: '0.8rem' }}
          >
            <Phone size={13} className="text-rose-gold" /> Wedding Helpline
          </a>
        </div>

        <hr className="my-3 opacity-25 mx-auto" style={{ maxWidth: '500px' }} />

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2 text-muted small" style={{ fontSize: '0.78rem' }}>
          <div>
            Crafted with <Heart size={13} fill="#e63946" className="text-danger mx-1" /> for Sai &amp; Saraswathi
          </div>
          <button
            onClick={scrollToTop}
            className="btn btn-sm btn-light border rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1 text-dark"
            style={{ fontSize: '0.75rem' }}
          >
            <span>Back to Top</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
};
