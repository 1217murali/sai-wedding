import React, { useRef, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw } from 'lucide-react';
import { weddingAudio } from '../utils/audio';

interface ScratchCardProps {
  onRevealed?: () => void;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({ onRevealed }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  // Trigger delicate, lightweight celebration confetti
  const fireCelebration = useCallback(() => {
    weddingAudio.playCelebrationChime();

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    if (isMobile) {
      confetti({
        particleCount: 24,
        spread: 45,
        origin: { y: 0.58 },
        scalar: 0.8,
        ticks: 150,
        colors: ['#E29578', '#F7D6CB', '#D4AF37', '#FFFFFF', '#F8C8DC'],
        disableForReducedMotion: true
      });
    } else {
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

  // Draw the luxury Rose-Gold foil cover on canvas (clean: NO scratch here or swipe text!)
  const drawCover = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = container.clientWidth || 350;
    const height = container.clientHeight || 330;

    // Reset transform & clear
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Retina scale
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ctx.scale(dpr, dpr);

    ctx.globalCompositeOperation = 'source-over';

    // Rich Rose Gold foil gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#e8aba0');
    grad.addColorStop(0.2, '#fdebe4');
    grad.addColorStop(0.45, '#c98a7a');
    grad.addColorStop(0.7, '#f8d9ce');
    grad.addColorStop(1, '#a85f50');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Shimmering stardust metallic specks
    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    const particleCount = width < 400 ? 55 : 85;
    for (let i = 0; i < particleCount; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const r = Math.random() * 1.8 + 0.4;
      ctx.beginPath();
      ctx.arc(rx, ry, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Subtle soft floral sparkles (no text)
    ctx.fillStyle = 'rgba(255, 240, 235, 0.35)';
    for (let i = 0; i < 18; i++) {
      const sx = (width * 0.2) + Math.random() * (width * 0.6);
      const sy = (height * 0.2) + Math.random() * (height * 0.55);
      const size = Math.random() * 8 + 4;
      ctx.beginPath();
      ctx.arc(sx, sy, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  // Initialize canvas with Retina DPI scaling
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth || 350;
    const height = container.clientHeight || 330;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    drawCover();
  }, [drawCover]);

  // Check scratch percentage
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

    // Sample primarily around the center area of the heart
    const startY = Math.floor(height * 0.15);
    const endY = Math.floor(height * 0.85);
    const startX = Math.floor(width * 0.15);
    const endX = Math.floor(width * 0.85);

    for (let y = startY; y < endY; y += step) {
      for (let x = startX; x < endX; x += step) {
        totalSamples++;
        const alphaIndex = (y * width + x) * 4 + 3;
        if (data[alphaIndex] < 60) {
          transparentCount++;
        }
      }
    }

    if (totalSamples > 0) {
      const pct = Math.round((transparentCount / totalSamples) * 100);

      if (pct >= 32 && !isScratched) {
        setIsScratched(true);
        canvas.style.transition = 'opacity 0.6s ease';
        canvas.style.opacity = '0';
        setTimeout(() => {
          if (canvas) canvas.style.display = 'none';
        }, 620);
        fireCelebration();
      }
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
    ctx.lineWidth = isMobile ? 42 : 50;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (lastPointRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, isMobile ? 21 : 25, 0, Math.PI * 2);
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
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.display = 'block';
      canvas.style.opacity = '1';
      drawCover();
    }
  };

  return (
    <div className="text-center py-2 py-md-3">
      {/* SVG ClipPath Definition for Heart Shape */}
      <svg width="0" height="0" className="position-absolute" aria-hidden="true" style={{ pointerEvents: 'none' }}>
        <defs>
          <clipPath id="heartClip" clipPathUnits="objectBoundingBox">
            <path d="M 0.5, 0.25 C 0.5, 0.12, 0.38, 0.02, 0.25, 0.02 C 0.11, 0.02, 0, 0.13, 0, 0.32 C 0, 0.54, 0.24, 0.74, 0.5, 0.98 C 0.76, 0.74, 1, 0.54, 1, 0.32 C 1, 0.13, 0.89, 0.02, 0.75, 0.02 C 0.62, 0.02, 0.5, 0.12, 0.5, 0.25 Z" />
          </clipPath>
          <linearGradient id="roseGoldBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e29578" />
            <stop offset="40%" stopColor="#f7d6cb" />
            <stop offset="70%" stopColor="#b85042" />
            <stop offset="100%" stopColor="#e29578" />
          </linearGradient>
        </defs>
      </svg>

      {/* Clean Header */}
      <h2 className="font-playfair fs-2 mb-3">Scratch To Reveal The Date</h2>

      {/* Heart-Shaped Scratch Card */}
      <div className="heart-scratch-wrapper">
        <div
          ref={containerRef}
          className={`heart-scratch-box position-relative ${isScratched ? 'pulse-glow-rose' : ''}`}
        >
          {/* Revealed Underlay inside Heart */}
          <div className="heart-scratch-underlay">
            <div className="text-center w-100 px-2">

              <div
                className="font-script rose-gold-text mb-0"
                style={{ fontSize: 'clamp(1.7rem, 6vw, 2.2rem)', lineHeight: 1.15 }}
              >
                Save Our Date
              </div>

              <div
                className="font-cinzel text-dark fw-bold my-1"
                style={{ fontSize: 'clamp(1.2rem, 4.5vw, 1.65rem)', letterSpacing: '0.5px' }}
              >
                13th December 2026
              </div>
            </div>
          </div>

          {/* Scratchable Canvas inside Heart */}
          <canvas
            ref={canvasRef}
            className="heart-scratch-canvas"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
        </div>

        {/* Heart Border Silhouette SVG Overlay */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="heart-border-svg"
          aria-hidden="true"
        >
          <path
            d="M 50, 25 C 50, 12, 38, 2, 25, 2 C 11, 2, 2, 13, 2, 32 C 2, 53, 24, 73, 50, 97 C 76, 73, 98, 53, 98, 32 C 98, 13, 89, 2, 75, 2 C 62, 2, 50, 12, 50, 25 Z"
            fill="none"
            stroke="url(#roseGoldBorderGrad)"
            strokeWidth="2.5"
          />
        </svg>
      </div>

      {/* Controls: Quick Reveal button REMOVED. Only post-reveal state shows */}
      {isScratched && (
        <div className="d-flex flex-wrap gap-2 justify-content-center align-items-center mt-3 mt-md-4">
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
  );
};
