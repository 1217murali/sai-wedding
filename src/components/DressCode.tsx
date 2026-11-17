import React from 'react';
import { Palette, Sparkles, Check } from 'lucide-react';
import { WeddingPalette } from '../types';

export const DressCode: React.FC = () => {
  const palettes: WeddingPalette[] = [
    {
      name: 'Royal Heritage Gold',
      hex: '#D4AF37',
      description: 'Prosperity, regal warmth & auspicious beginnings',
      textDark: true
    },
    {
      name: 'Champagne Ivory',
      hex: '#F7E7CE',
      description: 'Understated grandeur & serene elegance',
      textDark: true
    },
    {
      name: 'Blush & Dusty Rose',
      hex: '#E29578',
      description: 'Soft romance & blooming floral hues',
      textDark: false
    },
    {
      name: 'Deep Emerald Green',
      hex: '#1B4934',
      description: 'Lush heritage gardens & eternal youth',
      textDark: false
    },
    {
      name: 'Royal Wine & Burgundy',
      hex: '#6B1724',
      description: 'Celebratory joy, rich velvet & majesty',
      textDark: false
    }
  ];

  return (
    <section className="py-5 position-relative">
      <div className="container">
        <div className="text-center mb-5">
          <div className="badge-gold mb-2 d-inline-flex align-items-center gap-2">
            <Palette size={14} /> Attire & Aesthetics <Palette size={14} />
          </div>
          <h2 className="font-playfair display-5 mb-2">Color Palette & Dress Code</h2>
          <div className="ornate-divider">
            <span className="ornate-line"></span>
            <span className="ornate-icon">❦</span>
            <span className="ornate-line"></span>
          </div>
          <p className="text-muted mx-auto" style={{ maxWidth: '580px' }}>
            We invite our cherished guests to coordinate with our wedding color symphony to create unforgettable photographs together.
          </p>
        </div>

        {/* Color Palette Swatches */}
        <div className="row g-3 justify-content-center mb-5">
          {palettes.map((item, idx) => (
            <div key={idx} className="col-6 col-md-4 col-lg-2">
              <div className="glass-card text-center p-3 h-100 d-flex flex-column align-items-center">
                <div
                  className="rounded-circle shadow-sm mb-3 position-relative"
                  style={{
                    width: '65px',
                    height: '65px',
                    backgroundColor: item.hex,
                    border: '3px solid #ffffff'
                  }}
                />
                <h5 className="font-playfair fs-6 mb-1">{item.name}</h5>
                <div className="badge bg-light text-secondary border small mb-2">{item.hex}</div>
                <p className="text-muted small mb-0" style={{ fontSize: '0.74rem', lineHeight: '1.4' }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Style Inspiration Tips */}
        <div className="row g-4 justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="glass-card p-4 h-100">
              <div className="d-flex align-items-center gap-2 mb-3">
                <Sparkles size={20} className="text-warning" />
                <h4 className="font-playfair fs-5 mb-0">For Ladies</h4>
              </div>
              <ul className="list-unstyled text-muted small d-flex flex-column gap-2 mb-0">
                <li className="d-flex align-items-start gap-2">
                  <Check size={16} className="text-success mt-1 flex-shrink-0" />
                  <span>Lehengas, Anarkalis, Banarasi / Kanjivaram Sarees, or Indo-Western fusion gowns.</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <Check size={16} className="text-success mt-1 flex-shrink-0" />
                  <span>Jewelry accents: Kundan, Polki, Pearls, or delicate floral accessories.</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <Check size={16} className="text-success mt-1 flex-shrink-0" />
                  <span>Footwear: Block heels, embellished juttis, or festive wedges recommended for garden walkways.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-6 col-lg-5">
            <div className="glass-card p-4 h-100">
              <div className="d-flex align-items-center gap-2 mb-3">
                <Sparkles size={20} className="text-warning" />
                <h4 className="font-playfair fs-5 mb-0">For Gentlemen</h4>
              </div>
              <ul className="list-unstyled text-muted small d-flex flex-column gap-2 mb-0">
                <li className="d-flex align-items-start gap-2">
                  <Check size={16} className="text-success mt-1 flex-shrink-0" />
                  <span>Classic Bandhgala, Achkan, Kurta Pajama with Nehru jacket, or tailored suits for the reception.</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <Check size={16} className="text-success mt-1 flex-shrink-0" />
                  <span>Pocket squares, brooch pins, or elegant silk safas (turbans will be provided at the entrance!).</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <Check size={16} className="text-success mt-1 flex-shrink-0" />
                  <span>Footwear: Traditional mojris, loafers, or formal oxford dress shoes.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
