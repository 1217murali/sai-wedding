import React, { useState } from 'react';
import { Clock, MapPin, Sparkles, Music, Sun, Heart, Shirt } from 'lucide-react';
import { WeddingEvent } from '../types';

export const EventsSchedule: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | '11' | '12' | '13'>('all');

  const events: WeddingEvent[] = [
    {
      id: 'haldi',
      title: 'Haldi & Floral Mehndi',
      subtitle: 'Sun-drenched laughter, marigolds & intricate henna',
      date: 'Friday, 11th December 2026',
      time: '11:00 AM – 3:30 PM',
      venueName: 'The Royal Heritage Palace',
      venueHall: 'Courtyard of Marigolds & Lotus Fountain',
      description: 'Join us for a vibrant celebration of golden turmeric blessings, live folk dhol beats, aromatic tea stations, and master henna artists.',
      dressCode: 'Sunny Yellow, Mustard & Floral Pastels',
      dressCodeColors: ['#FFD700', '#FFA500', '#FFFACD', '#98FB98'],
      icon: 'sun',
      image: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?w=700&auto=format&fit=crop&q=80'
    },
    {
      id: 'sangeet',
      title: 'Sangeet & Cocktail Soirée',
      subtitle: 'A night of dazzling dance, foot-tapping beats & glamour',
      date: 'Saturday, 12th December 2026',
      time: '7:00 PM – Midnight',
      venueName: 'The Royal Heritage Palace',
      venueHall: 'The Grand Crystal Chandelier Ballroom',
      description: 'Put on your dancing shoes for energetic family dance performances, signature artisanal cocktails, gourmet live food theatres, and a non-stop DJ party.',
      dressCode: 'Indo-Western Glitz, Shimmer & Emerald',
      dressCodeColors: ['#0F52BA', '#1B4934', '#C0C0C0', '#4A0E4E'],
      icon: 'music',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=700&auto=format&fit=crop&q=80'
    },
    {
      id: 'wedding',
      title: 'The Auspicious Wedding Ceremony',
      subtitle: 'Sacred Vedic vows, auspicious pheras & eternal union',
      date: 'Sunday, 13th December 2026',
      time: '10:15 AM – 1:30 PM (Muhurtham: 10:15 AM)',
      venueName: 'The Royal Heritage Palace',
      venueHall: 'Royal Heritage Lakeside Mandap',
      description: 'Witness the sacred seven vows as Aarav & Meera tie the knot under a canopy of jasmine and roses, accompanied by traditional shehnai harmonies and family blessings.',
      dressCode: 'Traditional Royal Ethnic & Regal Elegance',
      dressCodeColors: ['#D4AF37', '#800020', '#FDFBF7', '#B8860B'],
      icon: 'heart',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&auto=format&fit=crop&q=80'
    },
    {
      id: 'reception',
      title: 'The Royal Reception Gala',
      subtitle: 'Dinner, champagne toasts & dancing under the stars',
      date: 'Sunday, 13th December 2026',
      time: '7:30 PM Onwards',
      venueName: 'The Royal Heritage Palace',
      venueHall: 'Imperial Royal Amphitheater & Lawns',
      description: 'An enchanting evening of heartfelt toasts, three-tier wedding cake cutting, live acoustic jazz quartet, and a royal feast to celebrate the newlyweds.',
      dressCode: 'Formal Black Tie & Evening Couture',
      dressCodeColors: ['#000000', '#D4AF37', '#4B0082', '#2F4F4F'],
      icon: 'sparkles',
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=700&auto=format&fit=crop&q=80'
    }
  ];

  const filteredEvents = events.filter((e) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === '11') return e.date.includes('11th');
    if (selectedFilter === '12') return e.date.includes('12th');
    if (selectedFilter === '13') return e.date.includes('13th');
    return true;
  });

  return (
    <section id="schedule" className="py-5 position-relative">
      <div className="container">
        {/* Section Heading */}
        <div className="text-center mb-5">
          <div className="badge-gold mb-2 d-inline-flex align-items-center gap-2">
            <Sparkles size={14} /> Celebration Itinerary <Sparkles size={14} />
          </div>
          <h2 className="font-playfair display-5 mb-2">Events & Celebrations</h2>
          <div className="ornate-divider">
            <span className="ornate-line"></span>
            <span className="ornate-icon">❦</span>
            <span className="ornate-line"></span>
          </div>
          <p className="text-muted mx-auto" style={{ maxWidth: '540px' }}>
            A three-day festival of music, color, tradition, and boundless love. Mark your calendars!
          </p>

          {/* Day Filters */}
          <div className="d-flex flex-wrap justify-content-center gap-2 my-4">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold ${
                selectedFilter === 'all' ? 'btn-gold' : 'btn-outline-gold'
              }`}
            >
              All Celebrations
            </button>
            <button
              onClick={() => setSelectedFilter('11')}
              className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold ${
                selectedFilter === '11' ? 'btn-gold' : 'btn-outline-gold'
              }`}
            >
              Day 1 • Dec 11 (Haldi & Mehndi)
            </button>
            <button
              onClick={() => setSelectedFilter('12')}
              className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold ${
                selectedFilter === '12' ? 'btn-gold' : 'btn-outline-gold'
              }`}
            >
              Day 2 • Dec 12 (Sangeet)
            </button>
            <button
              onClick={() => setSelectedFilter('13')}
              className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold ${
                selectedFilter === '13' ? 'btn-gold' : 'btn-outline-gold'
              }`}
            >
              Day 3 • Dec 13 (Wedding & Reception)
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="row g-4 justify-content-center">
          {filteredEvents.map((evt) => (
            <div key={evt.id} className="col-lg-6">
              <div className="glass-card glass-card-hover p-4 h-100 d-flex flex-column justify-content-between position-relative overflow-hidden">
                {/* Event Ribbon Badge for the Wedding Day */}
                {evt.id === 'wedding' && (
                  <div
                    className="position-absolute top-0 end-0 bg-warning text-dark px-3 py-1 fw-bold small shadow-sm"
                    style={{
                      borderBottomLeftRadius: '12px',
                      fontSize: '0.72rem',
                      letterSpacing: '1px',
                      textTransform: 'uppercase'
                    }}
                  >
                    👑 Main Auspicious Day
                  </div>
                )}

                <div>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div
                      className="p-3 rounded-circle"
                      style={{ background: 'linear-gradient(135deg, #fdedcb, #e8be66)', color: '#452c04' }}
                    >
                      {evt.icon === 'sun' && <Sun size={24} />}
                      {evt.icon === 'music' && <Music size={24} />}
                      {evt.icon === 'heart' && <Heart size={24} fill="#800020" className="text-danger" />}
                      {evt.icon === 'sparkles' && <Sparkles size={24} />}
                    </div>
                    <div>
                      <span className="badge bg-warning-subtle text-warning-emphasis rounded-pill small px-2 py-1">
                        {evt.date}
                      </span>
                      <h3 className="font-playfair fs-4 mb-0 mt-1">{evt.title}</h3>
                    </div>
                  </div>

                  <p className="text-secondary small fst-italic mb-3">{evt.subtitle}</p>

                  <div className="bg-light bg-opacity-75 p-3 rounded-3 mb-3 border border-warning border-opacity-25">
                    <div className="d-flex align-items-center gap-2 text-dark small fw-semibold mb-2">
                      <Clock size={15} className="text-warning flex-shrink-0" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="d-flex align-items-start gap-2 text-dark small mb-0">
                      <MapPin size={15} className="text-danger flex-shrink-0 mt-1" />
                      <span>
                        <strong>{evt.venueHall}</strong> • {evt.venueName}
                      </span>
                    </div>
                  </div>

                  <p className="text-muted small mb-3" style={{ lineHeight: '1.6' }}>
                    {evt.description}
                  </p>
                </div>

                {/* Dress code & color swatches */}
                <div className="pt-3 border-top border-warning border-opacity-25 d-flex flex-wrap align-items-center justify-content-between gap-2">
                  <div className="d-flex align-items-center gap-2">
                    <Shirt size={15} className="text-warning" />
                    <span className="small text-muted fw-semibold">Dress Code:</span>
                    <span className="small fw-bold text-dark">{evt.dressCode}</span>
                  </div>

                  <div className="d-flex align-items-center gap-1">
                    {evt.dressCodeColors.map((color, idx) => (
                      <span
                        key={idx}
                        className="rounded-circle d-inline-block border border-white shadow-sm"
                        style={{
                          width: '18px',
                          height: '18px',
                          backgroundColor: color
                        }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
