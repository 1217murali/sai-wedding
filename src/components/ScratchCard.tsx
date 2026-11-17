import React, { useRef, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Calendar, RotateCcw, CheckCircle, Clock, MapPin, Heart } from 'lucide-react';
import { weddingAudio } from '../utils/audio';

interface ScratchCardProps {
  onRevealed?: () => void;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({ onRevealed }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  // Trigger delicate, lightweight celebration confetti
  const fireCelebration = useCallback(() => {
    weddingAudio.playCelebrationChime();

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    if (isMobile) {
      // Light, delicate, centralized sprinkle for mobile (NOT heavy from both sides!)
      confetti({
        particleCount: 22,
        spread: 45,
        origin: { y: 0.58 },
        scalar: 0.8,
        ticks: 150,
        colors: ['#E29578', '#F7D6CB', '#D4AF37', '#FFFFFF', '#F8C8DC'],
        disableForReducedMotion: true
      });
    } else {
      // Refined desktop burst (short and non-overwhelming)
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
        scalar: 0.9,
        ticks: 180,
        colors: ['#E29578', '#F7D6CB', '#C48B79', '#D4AF37', '#FFFFFF', '#F8C8DC']
      });
    }

    if (onRevealed) {
      onRevealed();
    }
  }, [onRevealed]);

  // Draw the luxury Rose-Gold foil cover on canvas
  const drawCover = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = container.clientWidth || 340;
    const height = container.clientHeight || 220;

    // Reset transform & clear
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply Retina scale
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ctx.scale(dpr, dpr);

    ctx.globalCompositeOperation = 'source-over';

    // Rich Rose Gold foil gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#e0a996');
    grad.addColorStop(0.25, '#fceae3');
    grad.addColorStop(0.5, '#c48b79');
    grad.addColorStop(0.75, '#fae5de');
    grad.addColorStop(1, '#a86c5c');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle metallic stardust particles
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    const particleCount = width < 400 ? 50 : 80;
    for (let i = 0; i < particleCount; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const r = Math.random() * 1.8 + 0.5;
      ctx.beginPath();
      ctx.arc(rx, ry, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Outer filigree border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    ctx.strokeStyle = '#6b3c31';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(15, 15, width - 30, height - 30);
    ctx.setLineDash([]);

    // Elegant text & icon on Rose Gold foil
    ctx.fillStyle = '#4a251e';
    const titleSize = width < 380 ? '17px' : '20px';
    ctx.font = `bold ${titleSize} "Playfair Display", Georgia, serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ SCRATCH HERE ✨', width / 2, height / 2 - 25);

    const subSize = width < 380 ? '11px' : '13px';
    ctx.font = `500 ${subSize} "Montserrat", sans-serif`;
    ctx.fillStyle = '#6e382e';
    ctx.fillText('Swipe finger or drag cursor to reveal date', width / 2, height / 2 + 7);

    ctx.font = '15px "Cinzel Decorative", serif';
    ctx.fillStyle = '#4a251e';
    ctx.fillText('🌹  S & S  🌹', width / 2, height / 2 + 37);
  }, []);

  // Initialize canvas with Retina DPI scaling
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth || 340;
    const height = container.clientHeight || 220;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    drawCover();
  }, [drawCover]);

  // Calculate scratch percentage
  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const step = 14;
    let transparentCount = 0;
    let totalSamples = 0;

    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        totalSamples++;
        const alphaIndex = (y * width + x) * 4 + 3;
        if (data[alphaIndex] < 60) {
          transparentCount++;
        }
      }
    }

    const pct = Math.round((transparentCount / totalSamples) * 100);
    setScratchPercent(pct);

    if (pct >= 38 && !isScratched) {
      setIsScratched(true);
      canvas.style.transition = 'opacity 0.6s ease';
      canvas.style.opacity = '0';
      setTimeout(() => {
        if (canvas) canvas.style.display = 'none';
      }, 620);
      fireCelebration();
    }
  }, [isScratched, fireCelebration]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    ctx.lineWidth = isMobile ? 38 : 46;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (lastPointRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, isMobile ? 19 : 23, 0, Math.PI * 2);
      ctx.fill();
    }

    lastPointRef.current = { x, y };

    if (Math.random() > 0.65) {
      weddingAudio.playScratchTick();
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    lastPointRef.current = null;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    scratch(e.clientX, e.clientY);
    checkScratchPercentage();
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    lastPointRef.current = null;
    checkScratchPercentage();
  };

  // Touch handlers with e.preventDefault() to prevent page scroll while scratching
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      setIsDrawing(true);
      lastPointRef.current = null;
      const touch = e.touches[0];
      scratch(touch.clientX, touch.clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || e.touches.length === 0) return;
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
    checkScratchPercentage();
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
    lastPointRef.current = null;
    checkScratchPercentage();
  };

  const handleReset = () => {
    setIsScratched(false);
    setScratchPercent(0);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.display = 'block';
      canvas.style.opacity = '1';
      drawCover();
    }
  };

  const handleInstantReveal = () => {
    if (isScratched) return;
    setIsScratched(true);
    setScratchPercent(100);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.transition = 'opacity 0.5s ease';
      canvas.style.opacity = '0';
      setTimeout(() => {
        if (canvas) canvas.style.display = 'none';
      }, 550);
    }
    fireCelebration();
  };

  return (
    <div className="text-center py-2 py-md-3">
      <div className="badge-rose mb-3 d-inline-flex align-items-center gap-2">
        <Sparkles size={13} /> Interactive Scratch Reveal <Sparkles size={13} />
      </div>

      <h2 className="font-playfair fs-2 mb-2">Scratch To Reveal The Date</h2>
      <p className="text-muted small mx-auto mb-3 mb-md-4 px-2" style={{ maxWidth: '440px' }}>
        Swipe your finger or move your cursor over the card to reveal our sacred wedding date and muhurtham.
      </p>

      {/* Scratch Box */}
      <div
        ref={containerRef}
        className={`scratch-box position-relative mx-auto ${isScratched ? 'pulse-glow-rose' : ''}`}
      >
        {/* Revealed Underlay */}
        <div className="scratch-underlay">
          <div className="text-center w-100 px-2 px-sm-3">
            <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1 rounded-pill mb-2 fw-semibold" style={{ fontSize: '0.72rem' }}>
              <Heart size={11} fill="#e63946" className="me-1 inline-block" /> The Auspicious Union
            </span>
            <div className="font-script rose-gold-text mb-0" style={{ fontSize: 'clamp(2rem, 7vw, 2.5rem)', lineHeight: 1.1 }}>
              Save Our Date
            </div>
            <div
              className="font-cinzel text-dark fw-bold my-1"
              style={{ fontSize: 'clamp(1.4rem, 5vw, 1.95rem)', letterSpacing: '0.5px' }}
            >
              13th December 2026
            </div>
            <div className="text-muted small fw-semibold d-flex flex-wrap align-items-center justify-content-center gap-1 gap-sm-2 mb-1" style={{ fontSize: '0.78rem' }}>
              <span className="d-inline-flex align-items-center gap-1">
                <Calendar size={13} className="text-rose-gold" />
                <span>Sunday</span>
              </span>
              <span>•</span>
              <span className="d-inline-flex align-items-center gap-1">
                <Clock size={13} className="text-rose-gold" />
                <span>Muhurtham: Night 8:15 PM</span>
              </span>
            </div>
            <div className="text-secondary small d-flex align-items-center justify-content-center gap-1" style={{ fontSize: '0.74rem' }}>
              <MapPin size={12} className="text-danger flex-shrink-0" />
              <span>Kadiam, Andhra Pradesh, India</span>
            </div>
          </div>
        </div>

        {/* Scratchable Canvas */}
        <canvas
          ref={canvasRef}
          className="scratch-canvas"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      </div>

      {/* Progress & Controls */}
      <div className="d-flex flex-wrap align-items-center justify-content-center gap-2 gap-sm-3 mt-3 mt-md-4">
        {!isScratched ? (
          <>
            <div className="small text-muted d-flex align-items-center gap-2">
              <span style={{ fontSize: '0.8rem' }}>Progress:</span>
              <div
                className="progress"
                style={{ width: '85px', height: '7px', borderRadius: '10px' }}
              >
                <div
                  className="progress-bar bg-rose-gold progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  style={{ width: `${Math.min(100, (scratchPercent / 38) * 100)}%` }}
                />
              </div>
              <span className="fw-bold text-dark" style={{ fontSize: '0.8rem' }}>{scratchPercent}%</span>
            </div>
            <button
              onClick={handleInstantReveal}
              className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1"
              style={{ fontSize: '0.75rem' }}
            >
              <Sparkles size={12} className="me-1 text-warning" /> Quick Reveal
            </button>
          </>
        ) : (
          <div className="d-flex flex-wrap gap-2 justify-content-center align-items-center">
            <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-1 rounded-pill d-inline-flex align-items-center gap-1" style={{ fontSize: '0.75rem' }}>
              <CheckCircle size={13} /> Date Revealed!
            </span>
            <button
              onClick={handleReset}
              className="btn btn-sm btn-outline-rose-gold rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1"
              style={{ fontSize: '0.75rem' }}
            >
              <RotateCcw size={12} /> Scratch Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
