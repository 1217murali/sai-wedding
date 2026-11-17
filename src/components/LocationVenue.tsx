import React from 'react';
import { MapPin, Building, Phone } from 'lucide-react';

export const LocationVenue: React.FC = () => {
  return (
    <section id="venue" className="py-4 py-md-5 position-relative">
      <div className="container px-3 px-md-4">
        {/* Section Heading */}
        <div className="text-center mb-4 mb-md-5 reveal-on-scroll">
          <div className="badge-rose mb-2 d-inline-flex align-items-center gap-2">
            <MapPin size={13} /> The Auspicious Venue <MapPin size={13} />
          </div>
          <h2 className="font-playfair display-5 mb-2">Venue &amp; Location</h2>
          <div className="ornate-divider">
            <span className="ornate-line"></span>
            <span className="ornate-icon">❦</span>
            <span className="ornate-line"></span>
          </div>
          <p className="text-muted mx-auto px-2" style={{ maxWidth: '580px', fontSize: '0.9rem' }}>
            We warmly invite you to witness our wedding vows amidst the fragrant nursery gardens and regal pavilions of <strong>Kadiam, Andhra Pradesh</strong>.
          </p>
        </div>

        <div className="row g-4 align-items-stretch">
          {/* Left Column: Venue Info Card (Without Copy Address or Open in Maps buttons) */}
          <div className="col-12 col-lg-5 reveal-on-scroll">
            <div className="glass-card-rose p-3 p-sm-4 p-md-5 h-100 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex align-items-center gap-3 mb-3 mb-md-4">
                  <div
                    className="p-3 rounded-circle"
                    style={{ background: 'linear-gradient(135deg, #fae5de, #e29578)', color: '#4a251e' }}
                  >
                    <Building size={24} />
                  </div>
                  <div>
                    <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1 rounded-pill small" style={{ fontSize: '0.72rem' }}>
                      Wedding Sanctuary
                    </span>
                    <h3 className="font-playfair fs-4 mb-0 mt-1">
                      GNR Convention Hall Mini
                    </h3>
                  </div>
                </div>

                <div className="border-start border-3 border-danger ps-3 my-3">
                  <p className="text-muted small mb-1 fw-semibold text-uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>
                    Full Address
                  </p>
                  <p className="mb-0 text-dark fw-medium" style={{ lineHeight: '1.6', fontSize: '0.92rem' }}>
                    GNR Convention Hall Mini,<br />
                    Veeravaram Rd, Kadiam,<br />
                    Andhra Pradesh - 533126
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-top border-danger border-opacity-25 text-center">
                <span className="small text-muted d-inline-flex align-items-center justify-content-center gap-2" style={{ fontSize: '0.82rem' }}>
                  <Phone size={14} className="text-rose-gold" />
                  <span>
                    Need directions or assistance? Call{' '}
                    <strong className="text-dark">+91 9398515968</strong>
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Interactive Map (Without How to Reach toggle) */}
          <div className="col-12 col-lg-7 reveal-on-scroll">
            <div className="glass-card-rose p-3 p-md-4 h-100 d-flex flex-column">
              <div
                className="rounded-4 overflow-hidden position-relative flex-grow-1 border border-rose-gold shadow-sm"
                style={{ minHeight: '320px' }}
              >
                <iframe
                  title="GNR Convention Hall Mini, Kadiam Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3817.518990659168!2d81.81867507519952!3d16.89967278390655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37bce3caa12d87%3A0xe2defad012db947b!2sGNR%20Convention%20Hall!5e0!3m2!1sen!2sin!4v1794918802568!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '320px' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div
                  className="position-absolute bottom-0 start-0 m-2 m-sm-3 p-2 p-sm-3 rounded-3 shadow-lg"
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    maxWidth: '300px',
                    border: '1px solid #e29578'
                  }}
                >
                  <div className="small fw-bold text-dark d-flex align-items-center gap-1" style={{ fontSize: '0.82rem' }}>
                    <MapPin size={13} className="text-danger flex-shrink-0" /> GNR Convention Hall Mini
                  </div>
                  <div className="text-muted" style={{ fontSize: '0.74rem' }}>
                    Veeravaram Rd, Kadiam, Andhra Pradesh
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
