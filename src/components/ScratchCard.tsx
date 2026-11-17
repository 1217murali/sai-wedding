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

  // Trigger celebration confetti
  const fireCelebration = useCallback(() => {
    weddingAudio.playCelebrationChime();

    // Rose Gold & Pink Celebration Cannons
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#E29578', '#F7D6CB', '#C48B79', '#D4AF37', '#FFFFFF', '#F8C8DC', '#B76E79'];

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    if (onRevealed) {
      onRevealed();
    }
  }, [onRevealed]);

  // Draw the luxury Rose-Gold foil cover on canvas
  const drawCover = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Reset composite operation
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
    for (let i = 0; i < 90; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const r = Math.random() * 2 + 0.6;
      ctx.beginPath();
      ctx.arc(rx, ry, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Outer filigree border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    ctx.strokeStyle = '#6b3c31';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(16, 16, width - 32, height - 32);
    ctx.setLineDash([]);

    // Elegant text & icon on Rose Gold foil
    ctx.fillStyle = '#4a251e';
    ctx.font = 'bold 20px "Playfair Display", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ SCRATCH HERE ✨', width / 2, height / 2 - 26);

    ctx.font = '500 13px "Montserrat", sans-serif';
    ctx.fillStyle = '#6e382e';
    ctx.fillText('Scratch with finger or mouse to reveal the date', width / 2, height / 2 + 7);

    ctx.font = '16px "Cinzel Decorative", serif';
    ctx.fillStyle = '#4a251e';
    ctx.fillText('🌹  S & S  🌹', width / 2, height / 2 + 38);
  }, []);

  // Initialize canvas with proper sizing
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    canvas.width = container.clientWidth || 420;
    canvas.height = container.clientHeight || 240;

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
    const step = 12;
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

    if (pct >= 40 && !isScratched) {
      setIsScratched(true);
      canvas.style.transition = 'opacity 0.6s ease';
      canvas.style.opacity = '0';
      setTimeout(() => {
        if (canvas) canvas.style.display = 'none';
      }, 650);
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
    ctx.lineWidth = 44;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (lastPointRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
    }

    lastPointRef.current = { x, y };

    if (Math.random() > 0.6) {
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

  // Touch handlers with touch-action isolation
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
    <div className="text-center py-2 py-md-4">
      <div className="badge-rose mb-3 d-inline-flex align-items-center gap-2">
        <Sparkles size={14} /> Interactive Scratch Reveal <Sparkles size={14} />
      </div>

      <h2 className="font-playfair display-6 mb-2">Scratch To Reveal The Date</h2>
      <p className="text-muted small mx-auto mb-4 px-2" style={{ maxWidth: '480px' }}>
        Swipe your finger or drag your mouse over the rose-gold card below to unveil our sacred wedding date and auspicious muhurtham.
      </p>

      {/* Scratch Box */}
      <div
        ref={containerRef}
        className={`scratch-box position-relative mx-auto ${isScratched ? 'pulse-glow-rose' : ''}`}
      >
        {/* Revealed Underlay */}
        <div className="scratch-underlay">
          <div className="text-center w-100 px-3">
            <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-3 py-1 rounded-pill mb-2 fw-semibold">
              <Heart size={12} fill="#e63946" className="me-1 inline-block" /> The Auspicious Union
            </span>
            <div className="font-script rose-gold-text mb-1" style={{ fontSize: '2.5rem', lineHeight: 1 }}>
              Save Our Date
            </div>
            <div
              className="font-cinzel text-dark fw-bold my-1"
              style={{ fontSize: 'clamp(1.6rem, 5vw, 2.1rem)', letterSpacing: '1px' }}
            >
              13th December 2026
            </div>
            <div className="text-muted small fw-semibold d-flex flex-wrap align-items-center justify-content-center gap-2 mb-2">
              <span className="d-inline-flex align-items-center gap-1">
                <Calendar size={14} className="text-rose-gold" />
                <span>Sunday</span>
              </span>
              <span>•</span>
              <span className="d-inline-flex align-items-center gap-1">
                <Clock size={14} className="text-rose-gold" />
                <span>Muhurtham: Night 8:15 PM Onwards</span>
              </span>
            </div>
            <div className="text-secondary small d-flex align-items-center justify-content-center gap-1 mt-1">
              <MapPin size={13} className="text-danger" />
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
      <div className="d-flex flex-wrap align-items-center justify-content-center gap-3 mt-4">
        {!isScratched ? (
          <>
            <div className="small text-muted d-flex align-items-center gap-2">
              <span>Scratch Progress:</span>
              <div
                className="progress"
                style={{ width: '100px', height: '8px', borderRadius: '10px' }}
              >
                <div
                  className="progress-bar bg-rose-gold progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  style={{ width: `${Math.min(100, (scratchPercent / 40) * 100)}%` }}
                />
              </div>
              <span className="fw-bold text-dark">{scratchPercent}%</span>
            </div>
            <button
              onClick={handleInstantReveal}
              className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1"
            >
              <Sparkles size={13} className="me-1 text-warning" /> Quick Reveal
            </button>
          </>
        ) : (
          <div className="d-flex flex-wrap gap-2 justify-content-center align-items-center">
            <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 rounded-pill d-inline-flex align-items-center gap-1">
              <CheckCircle size={15} /> Date Successfully Revealed!
            </span>
            <button
              onClick={handleReset}
              className="btn btn-sm btn-outline-rose-gold rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1"
            >
              <RotateCcw size={13} /> Scratch Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
