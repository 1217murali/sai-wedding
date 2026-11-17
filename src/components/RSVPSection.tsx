import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Heart,
  CheckCircle2,
  Users,
  Utensils,
  Music,
  Send,
  Sparkles,
  QrCode,
  Download,
  CalendarCheck
} from 'lucide-react';
import { weddingAudio } from '../utils/audio';
import { RSVPData } from '../types';

export const RSVPSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    attending: 'attending' as 'attending' | 'not-attending',
    guestCount: 2,
    dietaryPreference: 'vegetarian',
    eventsAttending: ['wedding', 'reception', 'sangeet', 'haldi'],
    songRequest: '',
    message: ''
  });

  const [submittedPass, setSubmittedPass] = useState<RSVPData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckboxChange = (eventId: string) => {
    setFormData((prev) => {
      const exists = prev.eventsAttending.includes(eventId);
      return {
        ...prev,
        eventsAttending: exists
          ? prev.eventsAttending.filter((id) => id !== eventId)
          : [...prev.eventsAttending, eventId]
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const passCode = `WED-${Math.floor(100000 + Math.random() * 900000)}`;
      const newRSVP: RSVPData = {
        id: Date.now().toString(),
        ...formData,
        submittedAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        passCode
      };

      // Save to localStorage
      try {
        const stored = localStorage.getItem('wedding_rsvps');
        const list = stored ? JSON.parse(stored) : [];
        list.push(newRSVP);
        localStorage.setItem('wedding_rsvps', JSON.stringify(list));
      } catch {
        // ignore storage errors
      }

      setSubmittedPass(newRSVP);
      setIsSubmitting(false);

      // Play audio chime and blast confetti
      weddingAudio.playCelebrationChime();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FCF6BA', '#E29578', '#5B1425', '#FFFFFF']
      });
    }, 600);
  };

  return (
    <section id="rsvp" className="py-5 position-relative">
      <div className="container">
        {/* Section Heading */}
        <div className="text-center mb-5">
          <div className="badge-gold mb-2 d-inline-flex align-items-center gap-2">
            <Heart size={14} fill="#D4AF37" /> Be Our Guest <Heart size={14} fill="#D4AF37" />
          </div>
          <h2 className="font-playfair display-5 mb-2">RSVP &amp; Save Your Seat</h2>
          <div className="ornate-divider">
            <span className="ornate-line"></span>
            <span className="ornate-icon">❦</span>
            <span className="ornate-line"></span>
          </div>
          <p className="text-muted mx-auto" style={{ maxWidth: '560px' }}>
            Kindly respond by <strong>15th November 2026</strong> so we can ensure personalized hospitality and seating arrangements for you and your family.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            {submittedPass ? (
              /* Success Digital Invitation Pass */
              <div className="glass-card p-4 p-md-5 text-center position-relative pulse-glow border border-warning">
                <div
                  className="d-inline-flex p-3 rounded-circle shadow-sm border border-warning mb-3"
                  style={{ background: '#fcf6ba', color: '#4a3307' }}
                >
                  <CheckCircle2 size={40} className="text-success" />
                </div>

                <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-1 rounded-pill small">
                  RSVP Confirmed
                </span>

                <h3 className="font-playfair fs-2 mt-2 mb-1">
                  Thank You, {submittedPass.fullName}!
                </h3>
                <p className="text-muted small mx-auto mb-4" style={{ maxWidth: '440px' }}>
                  Your presence is the greatest gift. We have reserved your seat and cannot wait to celebrate together!
                </p>

                {/* VIP Digital Pass Card */}
                <div
                  className="p-4 rounded-4 mx-auto my-3 text-start shadow-sm position-relative overflow-hidden"
                  style={{
                    maxWidth: '460px',
                    background: 'linear-gradient(135deg, #fffaf2 0%, #fff 50%, #fef8ec 100%)',
                    border: '2px dashed #d4af37'
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center border-bottom border-warning border-opacity-50 pb-3 mb-3">
                    <div>
                      <div className="font-cinzel fw-bold gold-text fs-5">AARAV &amp; MEERA</div>
                      <div className="text-muted small">Wedding Guest Pass</div>
                    </div>
                    <div className="text-end">
                      <div className="badge bg-warning text-dark font-monospace">
                        {submittedPass.passCode}
                      </div>
                      <div className="text-secondary" style={{ fontSize: '0.7rem' }}>
                        13th Dec 2026
                      </div>
                    </div>
                  </div>

                  <div className="row g-2 mb-3 small">
                    <div className="col-6">
                      <span className="text-muted d-block">Primary Guest:</span>
                      <strong className="text-dark">{submittedPass.fullName}</strong>
                    </div>
                    <div className="col-6">
                      <span className="text-muted d-block">Total Guests:</span>
                      <strong className="text-dark">{submittedPass.guestCount} Attending</strong>
                    </div>
                    <div className="col-6">
                      <span className="text-muted d-block">Dining Choice:</span>
                      <strong className="text-dark text-capitalize">
                        {submittedPass.dietaryPreference}
                      </strong>
                    </div>
                    <div className="col-6">
                      <span className="text-muted d-block">Venue:</span>
                      <strong className="text-dark">The Royal Heritage Palace, Jaipur</strong>
                    </div>
                  </div>

                  {submittedPass.songRequest && (
                    <div className="bg-light p-2 rounded small text-muted mb-3 d-flex align-items-center gap-2">
                      <Music size={14} className="text-warning flex-shrink-0" />
                      <span>
                        DJ Request: <em>&quot;{submittedPass.songRequest}&quot;</em>
                      </span>
                    </div>
                  )}

                  <div className="d-flex align-items-center justify-content-between pt-2 border-top border-warning border-opacity-25">
                    <div className="d-flex align-items-center gap-2">
                      <QrCode size={36} className="text-dark" />
                      <span className="text-muted" style={{ fontSize: '0.72rem' }}>
                        Scan at reception desk on arrival
                      </span>
                    </div>
                    <span className="badge-gold">VIP Entry</span>
                  </div>
                </div>

                <div className="d-flex justify-content-center gap-3 mt-4">
                  <button
                    onClick={() => window.print()}
                    className="btn btn-gold d-inline-flex align-items-center gap-2"
                  >
                    <Download size={16} /> Print / Save Pass
                  </button>
                  <button
                    onClick={() => setSubmittedPass(null)}
                    className="btn btn-outline-secondary rounded-pill px-3 py-2 text-dark small"
                  >
                    Edit RSVP
                  </button>
                </div>
              </div>
            ) : (
              /* RSVP Form */
              <div className="glass-card p-4 p-md-5">
                <form onSubmit={handleSubmit}>
                  {/* Attendance Toggle */}
                  <div className="mb-4 text-center">
                    <label className="form-label fw-bold small text-uppercase tracking-wider mb-2 d-block">
                      Will you be joining us?
                    </label>
                    <div className="btn-group w-100" role="group">
                      <input
                        type="radio"
                        className="btn-check"
                        name="attendance"
                        id="attending-yes"
                        checked={formData.attending === 'attending'}
                        onChange={() => setFormData({ ...formData, attending: 'attending' })}
                      />
                      <label
                        className={`btn py-2 ${
                          formData.attending === 'attending' ? 'btn-gold' : 'btn-outline-secondary'
                        }`}
                        htmlFor="attending-yes"
                      >
                        <Heart size={15} className="me-1" /> Joyfully Accepts
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="attendance"
                        id="attending-no"
                        checked={formData.attending === 'not-attending'}
                        onChange={() => setFormData({ ...formData, attending: 'not-attending' })}
                      />
                      <label
                        className={`btn py-2 ${
                          formData.attending === 'not-attending'
                            ? 'btn-dark'
                            : 'btn-outline-secondary'
                        }`}
                        htmlFor="attending-no"
                      >
                        Regretfully Declines
                      </label>
                    </div>
                  </div>

                  {/* Personal Details */}
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        className="form-control rounded-3 py-2 border-warning border-opacity-50"
                        placeholder="e.g. Rohini & Siddharth Verma"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Email Address *</label>
                      <input
                        type="email"
                        required
                        className="form-control rounded-3 py-2 border-warning border-opacity-50"
                        placeholder="yourname@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">
                        WhatsApp / Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        className="form-control rounded-3 py-2 border-warning border-opacity-50"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">
                        <Users size={14} className="me-1 text-warning" /> Number of Guests Attending
                      </label>
                      <select
                        className="form-select rounded-3 py-2 border-warning border-opacity-50"
                        value={formData.guestCount}
                        onChange={(e) =>
                          setFormData({ ...formData, guestCount: parseInt(e.target.value) })
                        }
                      >
                        <option value={1}>1 Guest (Just Me)</option>
                        <option value={2}>2 Guests (Me + Partner)</option>
                        <option value={3}>3 Guests</option>
                        <option value={4}>4 Guests (Family)</option>
                        <option value={5}>5+ Guests</option>
                      </select>
                    </div>
                  </div>

                  {/* Events Checklist */}
                  <div className="my-4">
                    <label className="form-label small fw-semibold d-flex align-items-center gap-1 mb-2">
                      <CalendarCheck size={15} className="text-warning" /> Which events will you
                      attend?
                    </label>
                    <div className="row g-2">
                      {[
                        { id: 'haldi', label: 'Haldi & Floral Mehndi (Dec 11)' },
                        { id: 'sangeet', label: 'Sangeet & Cocktail Night (Dec 12)' },
                        { id: 'wedding', label: 'The Wedding Ceremony (Dec 13)' },
                        { id: 'reception', label: 'The Royal Reception Gala (Dec 13)' }
                      ].map((item) => (
                        <div key={item.id} className="col-sm-6">
                          <div className="form-check p-2 rounded-3 border border-warning border-opacity-25 bg-light bg-opacity-50">
                            <input
                              className="form-check-input ms-0 me-2"
                              type="checkbox"
                              id={`event-${item.id}`}
                              checked={formData.eventsAttending.includes(item.id)}
                              onChange={() => handleCheckboxChange(item.id)}
                            />
                            <label
                              className="form-check-label small fw-medium"
                              htmlFor={`event-${item.id}`}
                            >
                              {item.label}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dietary & DJ Song */}
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold d-flex align-items-center gap-1">
                        <Utensils size={14} className="text-warning" /> Dietary Preferences
                      </label>
                      <select
                        className="form-select rounded-3 py-2 border-warning border-opacity-50"
                        value={formData.dietaryPreference}
                        onChange={(e) =>
                          setFormData({ ...formData, dietaryPreference: e.target.value })
                        }
                      >
                        <option value="vegetarian">Pure Vegetarian / Indian Gourmet</option>
                        <option value="jain">Jain Vegetarian (No onion/garlic/root veg)</option>
                        <option value="vegan">Vegan</option>
                        <option value="non-veg">Non-Vegetarian</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold d-flex align-items-center gap-1">
                        <Music size={14} className="text-warning" /> Song Request for DJ
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-3 py-2 border-warning border-opacity-50"
                        placeholder="Song title & artist to get you dancing!"
                        value={formData.songRequest}
                        onChange={(e) => setFormData({ ...formData, songRequest: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Blessing Message */}
                  <div className="my-3">
                    <label className="form-label small fw-semibold">
                      A Special Blessing or Note for Aarav &amp; Meera
                    </label>
                    <textarea
                      rows={3}
                      className="form-control rounded-3 border-warning border-opacity-50"
                      placeholder="Share your warm thoughts or blessings..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="text-center mt-4 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-gold px-5 py-3 d-inline-flex align-items-center gap-2 shadow"
                    >
                      {isSubmitting ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          />
                          <span>Confirming RSVP...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Submit RSVP &amp; Get Digital Pass</span>
                          <Sparkles size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
