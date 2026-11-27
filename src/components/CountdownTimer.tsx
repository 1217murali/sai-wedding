import React, { useState, useEffect } from 'react';
import { BellRing } from 'lucide-react';
import { WEDDING_DATE } from '../utils/calendar';

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = WEDDING_DATE.getTime() - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <section id="countdown" className="countdown-section py-4 py-md-5 position-relative">
      <div className="container px-3">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-11 col-xl-10">
            <div className="glass-card-rose p-4 p-sm-5 text-center position-relative reveal-on-scroll">
              {/* Ornate corner accents */}
              <div
                className="position-absolute top-0 start-0 m-2 m-sm-3 text-rose-gold opacity-50"
                style={{ fontSize: '1.1rem' }}
              >
                ❧
              </div>
              <div
                className="position-absolute top-0 end-0 m-2 m-sm-3 text-rose-gold opacity-50"
                style={{ fontSize: '1.1rem' }}
              >
                ☙
              </div>

              {/* Clean Title without 'The Grand Countdown' badge */}
              <h2 className="font-playfair fs-2 mb-2">Counting Down To Our Forever</h2>
              <p className="text-muted small mx-auto mb-3 mb-md-4 px-2" style={{ maxWidth: '440px' }}>
                Every second brings us closer to the sacred moment of our lives. We eagerly await your gracious presence!
              </p>

              {/* Countdown Digits (4 columns on a single clean row) */}
              <div className="row g-2 g-sm-3 justify-content-center align-items-center my-3 my-md-4">
                {/* Days */}
                <div className="col-3">
                  <div className="countdown-digit-box-rose">
                    <div className="countdown-digit">{formatNumber(timeLeft.days)}</div>
                    <div className="countdown-label">Days</div>
                  </div>
                </div>

                {/* Hours */}
                <div className="col-3">
                  <div className="countdown-digit-box-rose">
                    <div className="countdown-digit">{formatNumber(timeLeft.hours)}</div>
                    <div className="countdown-label">Hours</div>
                  </div>
                </div>

                {/* Minutes */}
                <div className="col-3">
                  <div className="countdown-digit-box-rose">
                    <div className="countdown-digit">{formatNumber(timeLeft.minutes)}</div>
                    <div className="countdown-label">Mins</div>
                  </div>
                </div>

                {/* Seconds */}
                <div className="col-3">
                  <div className="countdown-digit-box-rose border-rose-gold">
                    <div className="countdown-digit text-danger">
                      {formatNumber(timeLeft.seconds)}
                    </div>
                    <div className="countdown-label">Secs</div>
                  </div>
                </div>
              </div>

              {/* Auspicious Muhurtham section with image */}
              <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-3 mt-3">
                <div
                  className="p-1 border border-2 border-rose-gold rounded-3 shadow-sm bg-white flex-shrink-0"
                  style={{ width: '135px', height: '135px', overflow: 'hidden' }}
                >
                  <img
                    src="/images/marriage.jpg"
                    alt="Marriage Muhurtham"
                    className="w-100 h-100 rounded-2"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                <div className="d-inline-flex flex-column align-items-center align-items-sm-start justify-content-center gap-1 bg-white bg-opacity-80 px-3 px-sm-4 py-2 py-sm-3 rounded-4 border border-rose-gold shadow-sm text-center text-sm-start">
                  <div className="d-inline-flex align-items-center gap-2" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)', color: '#4a3b32' }}>
                    <BellRing size={18} className="text-rose-gold flex-shrink-0" />
                    <span>
                      Sumuhurtham: <strong style={{ color: '#5c1825', fontSize: 'clamp(1rem, 2.8vw, 1.25rem)' }}>Sunday, 13th December 2026 • Night 8:22 PM</strong>
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Noto Sans Telugu', 'Gautami', 'Telugu Sangam MN', sans-serif",
                      fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
                      color: '#6b5550'
                    }}
                  >
                    సుముహూర్తం: <strong style={{ color: '#5c1825', fontSize: 'clamp(1rem, 2.8vw, 1.22rem)' }}>ఆదివారం, 13 డిసెంబర్ 2026 • రాత్రి 8:22 గం॥లకు</strong>
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
