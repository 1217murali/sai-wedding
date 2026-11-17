import React, { useState } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { weddingAudio } from '../utils/audio';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [showControls, setShowControls] = useState(false);

  const togglePlay = () => {
    const active = weddingAudio.toggle();
    setIsPlaying(active);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    weddingAudio.setVolume(val);
  };

  return (
    <aside
      aria-label="Background music controls"
      className="position-fixed bottom-0 end-0 m-3 m-md-4"
      style={{ zIndex: 1050 }}
    >
      <div
        className="glass-card p-2 d-flex align-items-center gap-2 shadow-lg border border-warning"
        style={{
          borderRadius: '50px',
          background: 'rgba(255, 255, 255, 0.92)',
          boxShadow: '0 8px 30px rgba(180, 135, 40, 0.3)'
        }}
      >
        {/* Animated Vinyl Disc */}
        <div
          onClick={togglePlay}
          className={`position-relative cursor-pointer ${
            isPlaying ? 'spin-slow' : 'spin-paused'
          }`}
          style={{ width: '42px', height: '42px', cursor: 'pointer' }}
          title={isPlaying ? 'Pause romantic music' : 'Play romantic music'}
        >
          <div
            className="w-100 h-100 rounded-circle d-flex align-items-center justify-content-center shadow-sm"
            style={{
              background: 'radial-gradient(circle, #2a2217 30%, #523a13 70%, #171109 100%)',
              border: '2px solid #d4af37'
            }}
          >
            <div
              className="rounded-circle"
              style={{ width: '12px', height: '12px', background: '#d4af37' }}
            />
          </div>
        </div>

        {/* Music Info & Visualizer */}
        <div
          onClick={() => setShowControls(!showControls)}
          className="d-none d-sm-flex flex-column cursor-pointer pe-2"
          style={{ cursor: 'pointer' }}
        >
          <div className="d-flex align-items-center gap-1">
            <span className="small fw-bold text-dark" style={{ fontSize: '0.78rem' }}>
              Wedding Melodies
            </span>
            {isPlaying && (
              <span className="d-flex align-items-center">
                <span className="music-bar" />
                <span className="music-bar" />
                <span className="music-bar" />
                <span className="music-bar" />
              </span>
            )}
          </div>
          <span className="text-muted" style={{ fontSize: '0.68rem' }}>
            {isPlaying ? 'Playing Romantic Harp & Piano' : 'Click to Play Soundtrack'}
          </span>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="btn btn-sm btn-gold rounded-circle d-flex align-items-center justify-content-center p-2"
          style={{ width: '36px', height: '36px' }}
          aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} className="ms-0.5" />}
        </button>

        {/* Expandable volume popover / slider */}
        {showControls && (
          <div className="d-flex align-items-center gap-1 ps-1 pe-2 border-start border-warning border-opacity-50">
            <button
              onClick={() => {
                const nextVol = volume === 0 ? 0.4 : 0;
                setVolume(nextVol);
                weddingAudio.setVolume(nextVol);
              }}
              className="btn btn-sm btn-link text-dark p-0"
              aria-label="Toggle Mute"
            >
              {volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              style={{ width: '65px', accentColor: '#d4af37' }}
            />
          </div>
        )}
      </div>
    </aside>
  );
};
