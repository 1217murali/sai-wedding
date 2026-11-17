import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, Palette } from 'lucide-react';

interface NavbarProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
  petalsEnabled: boolean;
  onTogglePetals: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTheme,
  onThemeChange,
  petalsEnabled,
  onTogglePetals
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top navbar-wedding transition-all ${
        isScrolled ? 'py-2 shadow-sm' : 'py-3'
      }`}
      style={{ transition: 'all 0.3s ease' }}
    >
      <div className="container">
        {/* Brand Monogram */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="navbar-brand d-flex align-items-center gap-2 text-decoration-none"
        >
          <span
            className="rounded-circle d-inline-flex align-items-center justify-content-center border border-warning shadow-sm"
            style={{
              width: '38px',
              height: '38px',
              background: 'linear-gradient(135deg, #fffdf8, #f5ebd3)'
            }}
          >
            <span className="font-cinzel text-warning fw-bold fs-6 gold-text">A&M</span>
          </span>
          <span className="font-playfair fs-5 fw-bold text-dark d-none d-sm-inline">
            Aarav <span className="gold-text">&amp;</span> Meera
          </span>
        </a>

        {/* Mobile menu toggle & theme pill */}
        <div className="d-flex align-items-center gap-2 d-lg-none">
          <button
            onClick={() => {
              const themes = ['gold', 'rose', 'emerald'];
              const next = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
              onThemeChange(next);
            }}
            className="btn btn-sm btn-outline-warning rounded-circle p-1"
            title="Switch color theme"
          >
            <Palette size={16} />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-sm btn-light border p-2 rounded-3"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Desktop Navbar Links */}
        <div
          className={`collapse navbar-collapse justify-content-center ${
            mobileMenuOpen ? 'show d-block mt-3 bg-white p-3 rounded-4 shadow-lg border border-warning' : ''
          }`}
        >
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 text-center gap-1">
            <li className="nav-item">
              <button
                onClick={() => scrollToSection('scratch')}
                className="btn btn-link nav-link-wedding text-decoration-none"
              >
                Date Reveal
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={() => scrollToSection('countdown')}
                className="btn btn-link nav-link-wedding text-decoration-none"
              >
                Countdown
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={() => scrollToSection('venue')}
                className="btn btn-link nav-link-wedding text-decoration-none"
              >
                Venue &amp; Location
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={() => scrollToSection('schedule')}
                className="btn btn-link nav-link-wedding text-decoration-none"
              >
                Celebrations
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={() => scrollToSection('story')}
                className="btn btn-link nav-link-wedding text-decoration-none"
              >
                Our Story
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={() => scrollToSection('gallery')}
                className="btn btn-link nav-link-wedding text-decoration-none"
              >
                Gallery
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={() => scrollToSection('rsvp')}
                className="btn btn-link nav-link-wedding text-decoration-none fw-bold text-dark"
              >
                RSVP
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={() => scrollToSection('wishes')}
                className="btn btn-link nav-link-wedding text-decoration-none"
              >
                Wishes
              </button>
            </li>
          </ul>

          {/* Theme switcher & Petals Toggle on Desktop */}
          <div className="d-none d-lg-flex align-items-center gap-2">
            {/* Petals Toggle */}
            <button
              onClick={onTogglePetals}
              className={`btn btn-sm rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1 ${
                petalsEnabled ? 'btn-outline-warning text-dark' : 'btn-outline-secondary'
              }`}
              style={{ fontSize: '0.78rem' }}
              title="Toggle floating rose petals"
            >
              <Sparkles size={13} className={petalsEnabled ? 'text-warning' : 'text-muted'} />
              <span>{petalsEnabled ? 'Petals: On' : 'Petals: Off'}</span>
            </button>

            {/* Theme switcher */}
            <div className="dropdown">
              <button
                className="btn btn-sm btn-outline-gold rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1 dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ fontSize: '0.78rem' }}
                onClick={() => {
                  const themes = ['gold', 'rose', 'emerald'];
                  const next = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
                  onThemeChange(next);
                }}
              >
                <Palette size={13} />
                <span className="text-capitalize">{currentTheme} Theme</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
