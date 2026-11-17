import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Copy,
  Check,
  ExternalLink,
  Car,
  Plane,
  Train,
  Sun,
  ShieldCheck,
  Building
} from 'lucide-react';

export const LocationVenue: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'map' | 'travel'>('map');

  const venueAddress = 'GNR Convention Hall Mini, Veeravaram Rd, Kadiam, Andhra Pradesh 533126';
  const googleMapsUrl = 'https://maps.app.goo.gl/LcTajYuYoSqxoDq79';

  const handleCopy = () => {
    navigator.clipboard.writeText(venueAddress).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

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
          {/* Left Column: Venue Info Card */}
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
                      Sri Venkateswara Royal Convention
                    </h3>
                  </div>
                </div>

                <div className="border-start border-3 border-danger ps-3 my-3">
                  <p className="text-muted small mb-1 fw-semibold text-uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>
                    Full Address
                  </p>
                  <p className="mb-0 text-dark" style={{ lineHeight: '1.5', fontSize: '0.88rem' }}>
                    {venueAddress}
                  </p>
                </div>

                <div className="d-flex flex-wrap gap-2 my-3 my-md-4">
                  <button
                    onClick={handleCopy}
                    className="btn btn-sm btn-outline-rose-gold d-inline-flex align-items-center gap-2"
                  >
                    {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                    <span>{copied ? 'Address Copied!' : 'Copy Address'}</span>
                  </button>

                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-rose-gold d-inline-flex align-items-center gap-2"
                  >
                    <Navigation size={14} />
                    <span>Open in Maps</span>
                    <ExternalLink size={12} />
                  </a>
                </div>

                <hr className="my-3 my-md-4 opacity-25" />

                {/* Quick Highlights */}
                <div className="row g-2 g-sm-3 text-start">
                  <div className="col-6">
                    <div className="d-flex align-items-start gap-2">
                      <Sun size={16} className="text-rose-gold mt-1 flex-shrink-0" />
                      <div>
                        <div className="small fw-bold" style={{ fontSize: '0.82rem' }}>Kadiam Climate</div>
                        <div className="text-muted" style={{ fontSize: '0.74rem' }}>
                          24°C Pleasant Day, Cool Breezy Night
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="d-flex align-items-start gap-2">
                      <Car size={16} className="text-rose-gold mt-1 flex-shrink-0" />
                      <div>
                        <div className="small fw-bold" style={{ fontSize: '0.82rem' }}>Valet Parking</div>
                        <div className="text-muted" style={{ fontSize: '0.74rem' }}>
                          Dedicated guest parking on premises
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="d-flex align-items-start gap-2">
                      <Plane size={16} className="text-rose-gold mt-1 flex-shrink-0" />
                      <div>
                        <div className="small fw-bold" style={{ fontSize: '0.82rem' }}>Nearest Airport</div>
                        <div className="text-muted" style={{ fontSize: '0.74rem' }}>
                          Rajahmundry Airport (RJA) ~ 30 mins
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="d-flex align-items-start gap-2">
                      <ShieldCheck size={16} className="text-rose-gold mt-1 flex-shrink-0" />
                      <div>
                        <div className="small fw-bold" style={{ fontSize: '0.82rem' }}>Hospitality Desk</div>
                        <div className="text-muted" style={{ fontSize: '0.74rem' }}>
                          Family reception team at entrance
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 mt-md-4 pt-2 border-top border-danger border-opacity-25 text-center">
                <span className="small text-muted" style={{ fontSize: '0.78rem' }}>
                  Need directions or assistance? Call our coordination team at{' '}
                  <strong className="text-dark">+91 98765 43210</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Map & Travel Guide */}
          <div className="col-12 col-lg-7 reveal-on-scroll">
            <div className="glass-card-rose p-3 p-md-4 h-100 d-flex flex-column">
              {/* Tab selector */}
              <div className="d-flex gap-2 mb-3 border-bottom border-danger border-opacity-25 pb-2">
                <button
                  onClick={() => setActiveTab('map')}
                  className={`btn btn-sm rounded-pill px-3 py-1 fw-semibold ${
                    activeTab === 'map' ? 'btn-rose-gold' : 'btn-outline-secondary'
                  }`}
                  style={{ fontSize: '0.8rem' }}
                >
                  <MapPin size={13} className="me-1" /> Interactive Venue Map
                </button>
                <button
                  onClick={() => setActiveTab('travel')}
                  className={`btn btn-sm rounded-pill px-3 py-1 fw-semibold ${
                    activeTab === 'travel' ? 'btn-rose-gold' : 'btn-outline-secondary'
                  }`}
                  style={{ fontSize: '0.8rem' }}
                >
                  <Navigation size={13} className="me-1" /> How To Reach Kadiam
                </button>
              </div>

              {/* Tab Contents */}
              {activeTab === 'map' ? (
                <div
                  className="rounded-4 overflow-hidden position-relative flex-grow-1 border border-rose-gold shadow-sm"
                  style={{ minHeight: '300px' }}
                >
                  <iframe
                    title="Kadiam Wedding Venue Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61109.81533425026!2d81.80806497214957!3d16.920448206899126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37a1f592209d13%3A0xe54e60155b5d8487!2sKadiam%2C%20Andhra%20Pradesh%20533126!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '300px' }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div
                    className="position-absolute bottom-0 start-0 m-2 m-sm-3 p-2 p-sm-3 rounded-3 shadow-lg"
                    style={{
                      background: 'rgba(255, 255, 255, 0.94)',
                      backdropFilter: 'blur(8px)',
                      maxWidth: '280px',
                      border: '1px solid #e29578'
                    }}
                  >
                    <div className="small fw-bold text-dark d-flex align-items-center gap-1" style={{ fontSize: '0.8rem' }}>
                      <MapPin size={13} className="text-danger" /> Sri Venkateswara Royal Convention
                    </div>
                    <div className="text-muted" style={{ fontSize: '0.72rem' }}>
                      Main Lawns &amp; Mandap • Kadiam, Andhra Pradesh
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-2 p-sm-3 flex-grow-1">
                  <h4 className="font-playfair fs-5 mb-3">Travel &amp; Transit Guidelines</h4>
                  <div className="list-group list-group-flush gap-2 gap-sm-3">
                    <div className="list-group-item bg-transparent border-danger border-opacity-25 rounded-3 p-2 p-sm-3">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <Plane size={16} className="text-rose-gold" />
                        <span className="fw-bold small">By Air (Flight)</span>
                      </div>
                      <p className="text-muted small mb-0" style={{ fontSize: '0.8rem' }}>
                        Rajahmundry Domestic Airport (RJA) has direct connections from Hyderabad, Bengaluru, and Chennai. Taxis and pre-arranged guest vehicles are available outside the terminal.
                      </p>
                    </div>

                    <div className="list-group-item bg-transparent border-danger border-opacity-25 rounded-3 p-2 p-sm-3">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <Train size={16} className="text-rose-gold" />
                        <span className="fw-bold small">By Train</span>
                      </div>
                      <p className="text-muted small mb-0" style={{ fontSize: '0.8rem' }}>
                        Rajahmundry Railway Station (RJY) is a major junction on the Howrah-Chennai main line, 12 km from venue. Kadiam local station (KYM) is 2 km away.
                      </p>
                    </div>

                    <div className="list-group-item bg-transparent border-danger border-opacity-25 rounded-3 p-2 p-sm-3">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <Car size={16} className="text-rose-gold" />
                        <span className="fw-bold small">By Road / Car</span>
                      </div>
                      <p className="text-muted small mb-0" style={{ fontSize: '0.8rem' }}>
                        Located smoothly off the Vijayawada - Visakhapatnam National Highway (NH-16). Follow the floral arches leading directly to convention entrance.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
