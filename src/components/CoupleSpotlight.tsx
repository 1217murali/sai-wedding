import React from 'react';
import { Heart } from 'lucide-react';

export const CoupleSpotlight: React.FC = () => {
  return (
    <section className="py-5 position-relative">
      <div className="container px-3">
        <div className="text-center mb-5">
          <div className="badge-rose mb-2 d-inline-flex align-items-center gap-2">
            <Heart size={14} fill="#E29578" /> The Blessed Couple <Heart size={14} fill="#E29578" />
          </div>
          <h2 className="font-playfair display-5 mb-2">Sai &amp; Saraswathi</h2>
          <div className="ornate-divider">
            <span className="ornate-line"></span>
            <span className="ornate-icon">❦</span>
            <span className="ornate-line"></span>
          </div>
          <p className="font-cormorant fs-4 text-muted fst-italic mx-auto px-2" style={{ maxWidth: '580px' }}>
            &quot;May our sacred union be blessed with happiness, harmony, and eternal companionship.&quot;
          </p>
        </div>

        {/* Groom & Bride Cards */}
        <div className="row g-4 justify-content-center align-items-center mb-4">
          {/* Groom: Sai */}
          <div className="col-11 col-sm-8 col-md-5 col-lg-4">
            <div className="glass-card-rose text-center p-4 h-100">
              <div
                className="ornate-img-frame-rose mx-auto mb-3"
                style={{ maxWidth: '240px', height: '280px' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80"
                  alt="Sai - The Groom"
                  className="w-100 h-100 rounded-4"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <span className="badge-rose">The Groom</span>
              <h3 className="font-playfair fs-3 mt-2 mb-1">Sai</h3>
              <p className="text-secondary small fst-italic px-2 mb-0">
                &quot;With every heartbeat, I promise to walk beside you in joy and devotion.&quot;
              </p>
            </div>
          </div>

          {/* Central Heart */}
          <div className="col-12 col-md-2 d-flex flex-column align-items-center justify-content-center text-center my-2 my-md-0">
            <div
              className="p-3 rounded-circle border border-rose-gold shadow-sm pulse-glow-rose"
              style={{ background: 'linear-gradient(135deg, #fff7f4, #fcece8)' }}
            >
              <Heart size={32} fill="#E29578" className="text-rose-gold" />
            </div>
            <div className="font-script fs-2 rose-gold-text mt-2">&amp;</div>
          </div>

          {/* Bride: Saraswathi */}
          <div className="col-11 col-sm-8 col-md-5 col-lg-4">
            <div className="glass-card-rose text-center p-4 h-100">
              <div
                className="ornate-img-frame-rose mx-auto mb-3"
                style={{ maxWidth: '240px', height: '280px' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80"
                  alt="Saraswathi - The Bride"
                  className="w-100 h-100 rounded-4"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <span className="badge-rose">The Bride</span>
              <h3 className="font-playfair fs-3 mt-2 mb-1">Saraswathi</h3>
              <p className="text-secondary small fst-italic px-2 mb-0">
                &quot;In your smile, I see my forever. Here is to our sacred journey together.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
