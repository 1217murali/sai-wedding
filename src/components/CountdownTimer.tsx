import React, { useState, useEffect } from 'react';
import { Heart, Hourglass, BellRing } from 'lucide-react';
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
          <div className="col-12 col-md-11 col-lg-9 col-xl-8">
            <div className="glass-card-rose p-4 p-md-5 text-center position-relative">
              {/* Ornate corner accents */}
              <div
                className="position-absolute top-0 start-0 m-3 text-rose-gold opacity-50"
                style={{ fontSize: '1.2rem' }}
              >
                ❧
              </div>
              <div
                className="position-absolute top-0 end-0 m-3 text-rose-gold opacity-50"
                style={{ fontSize: '1.2rem' }}
              >
                ☙
              </div>

              <div className="badge-rose mb-3 d-inline-flex align-items-center gap-2">
                <Hourglass size={14} /> The Grand Countdown <Hourglass size={14} />
              </div>

              <h2 className="font-playfair display-6 mb-2">Counting Down To Our Forever</h2>
              <p className="text-muted small mx-auto mb-4" style={{ maxWidth: '460px' }}>
                Every second brings us closer to the most auspicious moment of our lives. We eagerly await your gracious presence!
              </p>

              {/* Countdown Digits */}
              <div className="d-flex justify-content-center align-items-center gap-2 gap-sm-3 gap-md-4 my-3 my-md-4 flex-wrap">
                {/* Days */}
                <div className="countdown-digit-box-rose">
                  <div className="countdown-digit">{formatNumber(timeLeft.days)}</div>
                  <div className="countdown-label">Days</div>
                </div>

                <div className="text-rose-gold fs-3 opacity-75 d-none d-sm-block">
                  <Heart size={18} fill="#E29578" className="animate-float" />
                </div>

                {/* Hours */}
                <div className="countdown-digit-box-rose">
                  <div className="countdown-digit">{formatNumber(timeLeft.hours)}</div>
                  <div className="countdown-label">Hours</div>
                </div>

                <div className="text-rose-gold fs-3 opacity-75 d-none d-sm-block">
                  <Heart size={18} fill="#E29578" className="animate-float" />
                </div>

                {/* Minutes */}
                <div className="countdown-digit-box-rose">
                  <div className="countdown-digit">{formatNumber(timeLeft.minutes)}</div>
                  <div className="countdown-label">Minutes</div>
                </div>

                <div className="text-rose-gold fs-3 opacity-75 d-none d-sm-block">
                  <Heart size={18} fill="#E29578" className="animate-float" />
                </div>

                {/* Seconds */}
                <div className="countdown-digit-box-rose border-rose-gold">
                  <div className="countdown-digit text-danger">
                    {formatNumber(timeLeft.seconds)}
                  </div>
                  <div className="countdown-label">Seconds</div>
                </div>
              </div>

              {/* Footer auspicious badge */}
              <div className="d-inline-flex flex-wrap align-items-center justify-content-center gap-2 text-muted small bg-white bg-opacity-80 px-4 py-2 rounded-pill mt-2 border border-rose-gold shadow-sm">
                <BellRing size={14} className="text-rose-gold" />
                <span>
                  Sumuhurtham: <strong>Sunday, 13th December 2026 • Night 8:15 PM Onwards</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
