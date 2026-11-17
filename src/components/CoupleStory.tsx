import React from 'react';
import { Heart, Coffee, Compass, Gem } from 'lucide-react';
import { StoryMilestone } from '../types';

export const CoupleStory: React.FC = () => {
  const milestones: (StoryMilestone & { icon: React.ReactNode })[] = [
    {
      year: '2021',
      dateStr: 'August 14, 2021',
      title: 'A Serendipitous Coffee',
      description: 'A rain-soaked afternoon at an old heritage book cafe. One shared table, a spilled latte, and a four-hour conversation that felt like five minutes.',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
      icon: <Coffee size={18} className="text-warning" />
    },
    {
      year: '2023',
      dateStr: 'November 22, 2023',
      title: 'Under Himalayan Stars',
      description: 'Our first big expedition together into the tranquil valleys of Ladakh. Shivering around a campfire under a galaxy of stars, we knew we had found our forever home in each other.',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&auto=format&fit=crop&q=80',
      icon: <Compass size={18} className="text-warning" />
    },
    {
      year: '2025',
      dateStr: 'February 14, 2025',
      title: 'She Said YES!',
      description: 'At golden hour on the tranquil cliffs of South Goa, with gentle waves serenading in the backdrop, Aarav went down on one knee. Through happy tears, Meera said YES!',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&auto=format&fit=crop&q=80',
      icon: <Gem size={18} className="text-warning" />
    },
    {
      year: '2026',
      dateStr: 'December 13, 2026',
      title: 'The Sacred Vows',
      description: 'Tying the eternal knot surrounded by our cherished family, blessings, and lifelong companions at The Royal Heritage Palace, Jaipur.',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&auto=format&fit=crop&q=80',
      icon: <Heart size={18} className="text-danger" fill="#e63946" />
    }
  ];

  return (
    <section id="story" className="py-5 position-relative">
      <div className="container">
        {/* Section Heading */}
        <div className="text-center mb-5">
          <div className="badge-gold mb-2 d-inline-flex align-items-center gap-2">
            <Heart size={14} fill="#D4AF37" /> The Happy Couple <Heart size={14} fill="#D4AF37" />
          </div>
          <h2 className="font-playfair display-5 mb-2">Meet The Bride & Groom</h2>
          <div className="ornate-divider">
            <span className="ornate-line"></span>
            <span className="ornate-icon">❦</span>
            <span className="ornate-line"></span>
          </div>
          <p className="text-muted mx-auto" style={{ maxWidth: '540px' }}>
            Two souls with a single thought, two hearts that beat as one.
          </p>
        </div>

        {/* Groom & Bride Cards */}
        <div className="row g-4 justify-content-center mb-5">
          {/* Groom */}
          <div className="col-md-5 col-lg-4">
            <div className="glass-card text-center p-4 h-100">
              <div className="ornate-img-frame mx-auto mb-4" style={{ maxWidth: '240px', height: '280px' }}>
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80"
                  alt="Aarav Sharma - The Groom"
                  className="w-100 h-100 object-fit-cover rounded-4"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <span className="badge-gold">The Groom</span>
              <h3 className="font-playfair fs-3 mt-2 mb-1">Aarav Sharma</h3>
              <p className="text-warning small fw-semibold mb-2">Architect & Acoustic Guitarist</p>
              <p className="text-muted small fst-italic px-2">
                &quot;The moment I saw Meera laughing with her eyes sparkling, I knew my search for true home had ended.&quot;
              </p>
            </div>
          </div>

          {/* Central Heart Intersect */}
          <div className="col-12 col-md-2 d-flex flex-column align-items-center justify-content-center text-center my-3 my-md-0">
            <div
              className="p-3 rounded-circle border border-warning shadow-sm pulse-glow"
              style={{ background: 'linear-gradient(135deg, #fffaf0, #f7e6ca)' }}
            >
              <Heart size={34} fill="#D4AF37" className="text-warning" />
            </div>
            <div className="font-script fs-2 gold-text mt-2">&amp;</div>
          </div>

          {/* Bride */}
          <div className="col-md-5 col-lg-4">
            <div className="glass-card text-center p-4 h-100">
              <div className="ornate-img-frame mx-auto mb-4" style={{ maxWidth: '240px', height: '280px' }}>
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80"
                  alt="Meera Kapoor - The Bride"
                  className="w-100 h-100 object-fit-cover rounded-4"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <span className="badge-gold">The Bride</span>
              <h3 className="font-playfair fs-3 mt-2 mb-1">Meera Kapoor</h3>
              <p className="text-warning small fw-semibold mb-2">Botanical Designer & Author</p>
              <p className="text-muted small fst-italic px-2">
                &quot;Aarav brings calm to my chaos and laughter to my ordinary days. Loving him is as natural as breathing.&quot;
              </p>
            </div>
          </div>
        </div>

        {/* Love Story Roadmap / Milestones */}
        <div className="mt-5 pt-3">
          <div className="text-center mb-4">
            <span className="badge-gold">Our Journey</span>
            <h3 className="font-playfair fs-2 mt-2">How Our Story Unfolded</h3>
          </div>

          <div className="row g-4 justify-content-center">
            {milestones.map((item, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="glass-card glass-card-hover p-4 h-100 position-relative text-center d-flex flex-column justify-content-between">
                  <div>
                    <div
                      className="d-inline-flex p-3 rounded-circle shadow-sm border border-warning mb-3"
                      style={{ background: '#fff9ed' }}
                    >
                      {item.icon}
                    </div>
                    <div className="badge bg-warning-subtle text-warning-emphasis rounded-pill small px-3 py-1 mb-2 fw-bold">
                      {item.year}
                    </div>
                    <h4 className="font-playfair fs-5 mb-2">{item.title}</h4>
                    <p className="text-muted small mb-0" style={{ lineHeight: '1.6' }}>
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-top border-warning border-opacity-25 small text-secondary">
                    {item.dateStr}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
