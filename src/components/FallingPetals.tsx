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

    // Rose petals palette (soft pink, blush, rose gold, deep crimson petal edges)
    const petalColors = [
      'rgba(244, 194, 194, ',
      'rgba(248, 200, 220, ',
      'rgba(230, 168, 178, ',
      'rgba(255, 218, 224, ',
      'rgba(218, 142, 158, '
    ];

    const petals: Petal[] = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 12 + 10,
      speedY: Math.random() * 1.2 + 0.8,
      speedX: Math.random() * 0.8 - 0.4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
      flip: Math.random() * Math.PI,
      flipSpeed: Math.random() * 0.03 + 0.01,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      opacity: Math.random() * 0.4 + 0.5
    }));

    // Golden sparkles
    const sparkles: Sparkle[] = Array.from({ length: 25 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      speedY: Math.random() * 0.5 + 0.2,
      opacity: Math.random(),
      opacitySpeed: (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1)
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Golden Sparkles
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
        ctx.fillStyle = `rgba(212, 175, 55, ${Math.max(0, s.opacity)})`;
        ctx.shadowColor = '#ffe27d';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      });

      // Draw Petals
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.008) * 0.5;
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

        // Draw organic petal shape
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(p.size * 0.5, -p.size * 0.5, p.size, -p.size * 0.2, p.size * 0.8, p.size * 0.6);
        ctx.bezierCurveTo(p.size * 0.5, p.size * 0.9, 0, p.size, 0, 0);

        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.shadowColor = 'rgba(230, 160, 170, 0.4)';
        ctx.shadowBlur = 4;
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
