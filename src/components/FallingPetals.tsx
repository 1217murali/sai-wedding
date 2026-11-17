import React, { useEffect, useRef } from 'react';

interface FallingPetalsProps {
  enabled?: boolean;
}

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  color: string;
  opacity: number;
}

interface Sparkle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  opacity: number;
  opacitySpeed: number;
}

export const FallingPetals: React.FC<FallingPetalsProps> = ({ enabled = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const isMobile = window.innerWidth < 768;

    // Rose petals palette (blush, soft pink, rose-gold, gentle crimson)
    const petalColors = [
      'rgba(244, 194, 194, ',
      'rgba(248, 200, 220, ',
      'rgba(230, 168, 178, ',
      'rgba(255, 218, 224, ',
      'rgba(226, 149, 120, '
    ];

    // Mobile-optimized count: 14 petals; Desktop: 30 petals
    const petalCount = isMobile ? 14 : 30;
    const petals: Petal[] = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * (isMobile ? 8 : 12) + 8,
      speedY: Math.random() * 1.0 + 0.6,
      speedX: Math.random() * 0.6 - 0.3,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.2,
      flip: Math.random() * Math.PI,
      flipSpeed: Math.random() * 0.02 + 0.01,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      opacity: Math.random() * 0.35 + 0.45
    }));

    // Sparkles count: 12 on mobile; 22 on desktop
    const sparkleCount = isMobile ? 12 : 22;
    const sparkles: Sparkle[] = Array.from({ length: sparkleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      speedY: Math.random() * 0.4 + 0.15,
      opacity: Math.random(),
      opacitySpeed: (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1)
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Sparkles
      sparkles.forEach((s) => {
        s.y += s.speedY;
        s.opacity += s.opacitySpeed;
        if (s.opacity > 0.85 || s.opacity < 0.15) {
          s.opacitySpeed = -s.opacitySpeed;
        }
        if (s.y > height) {
          s.y = -5;
          s.x = Math.random() * width;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226, 149, 120, ${Math.max(0, s.opacity)})`;
        ctx.shadowColor = '#fceae3';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.restore();
      });

      // Draw Petals
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.008) * 0.4;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.scale(1, Math.cos(p.flip));

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(p.size * 0.5, -p.size * 0.5, p.size, -p.size * 0.2, p.size * 0.8, p.size * 0.6);
        ctx.bezierCurveTo(p.size * 0.5, p.size * 0.9, 0, p.size, 0, 0);

        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.shadowColor = 'rgba(230, 160, 170, 0.3)';
        ctx.shadowBlur = 3;
        ctx.fill();

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return <canvas ref={canvasRef} className="petals-canvas" />;
};
