import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryPhoto } from '../types';

export const PhotoGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const photos: GalleryPhoto[] = [
    {
      id: 1,
      url: '/images/marriage.jpg',
      title: 'Together in Eternal Love',
      category: 'moments'
    },
    {
      id: 2,
      url: '/images/traditional.jpg',
      title: 'Traditional Grace & Elegance',
      category: 'moments'
    },
    {
      id: 3,
      url: '/images/trade.jpg',
      title: 'Cherished Traditional Moments',
      category: 'moments'
    },
    {
      id: 4,
      url: '/images/back pose.jpg',
      title: 'Walking Hand in Hand into Forever',
      category: 'moments'
    },
    {
      id: 5,
      url: '/images/groom.jpg',
      title: 'Sai - The Groom',
      category: 'moments'
    },
    {
      id: 6,
      url: '/images/bride.jpg',
      title: 'Saraswathi - The Bride',
      category: 'moments'
    }
  ];

  const total = photos.length;

  const nextPhoto = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevPhoto = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Automatic circular rotation timer (increased speed)
  useEffect(() => {
    if (isPaused || selectedPhotoIndex !== null) return;
    const interval = setInterval(() => {
      nextPhoto();
    }, 1500);

    return () => clearInterval(interval);
  }, [isPaused, selectedPhotoIndex, nextPhoto]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    if (diffX > 45) {
      nextPhoto();
    } else if (diffX < -45) {
      prevPhoto();
    }
    touchStartX.current = null;
  };

  // Compute 3D circular transformation for each card
  const getCardStyle = (index: number) => {
    let diff = (index - currentIndex) % total;
    if (diff < -Math.floor(total / 2)) diff += total;
    if (diff > Math.floor((total - 1) / 2)) diff -= total;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 576;
    const xStep = isMobile ? 95 : 185;
    const zStep = isMobile ? 75 : 115;
    const rotStep = isMobile ? 24 : 30;

    const translateX = diff * xStep;
    const translateZ = -Math.abs(diff) * zStep;
    const rotateY = -diff * rotStep;
    const scale = Math.max(0.66, 1 - Math.abs(diff) * (isMobile ? 0.16 : 0.13));
    const opacity = Math.abs(diff) === 0 ? 1 : Math.max(0.28, 0.85 - Math.abs(diff) * 0.28);
    const zIndex = 20 - Math.abs(diff);

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex,
      filter: Math.abs(diff) === 0 ? 'none' : 'brightness(0.92)'
    };
  };

  const handleCardClick = (index: number) => {
    if (index === currentIndex) {
      setSelectedPhotoIndex(index);
    } else {
      setCurrentIndex(index);
    }
  };

  return (
    <section id="gallery" className="py-4 py-md-5 position-relative overflow-hidden">
      <div className="container px-3">
        {/* Section Heading */}
        <div className="text-center mb-3 mb-md-4 reveal-on-scroll">
          <div className="badge-rose mb-2 d-inline-flex align-items-center gap-2">
            <Camera size={13} /> Cherished Frames <Camera size={13} />
          </div>
          <h2 className="font-playfair display-5 mb-2">Moments of Love</h2>
          <div className="ornate-divider">
            <span className="ornate-line"></span>
            <span className="ornate-icon">❦</span>
            <span className="ornate-line"></span>
          </div>
          <p className="text-muted mx-auto px-2 mb-1" style={{ maxWidth: '540px', fontSize: '0.9rem' }}>
            A glimpse into the shared smiles, quiet glances, and cherished moments of Sai &amp; Saraswathi.
          </p>
        </div>

        {/* 3D Circular Rotating Carousel Stage */}
        <div
          className="circular-gallery-stage"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {photos.map((photo, index) => {
            const isActive = index === currentIndex;
            const style = getCardStyle(index);

            return (
              <div
                key={photo.id}
                onClick={() => handleCardClick(index)}
                className={`circular-gallery-card ornate-img-frame-rose ${isActive ? 'is-active' : ''}`}
                style={style}
              >
                <div className="w-100 h-100 position-relative rounded-4 overflow-hidden shadow-sm">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-100 h-100"
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center top'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Fullscreen Lightbox Modal */}
        {selectedPhotoIndex !== null && (
          <div
            onClick={() => setSelectedPhotoIndex(null)}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
            style={{
              backgroundColor: 'rgba(20, 8, 10, 0.95)',
              backdropFilter: 'blur(10px)',
              zIndex: 99999
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="btn btn-link text-white position-absolute top-0 end-0 m-3 m-md-4 p-2 text-decoration-none"
              aria-label="Close Lightbox"
            >
              <X size={30} />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhotoIndex((selectedPhotoIndex - 1 + total) % total);
              }}
              className="btn btn-rose-gold rounded-circle p-2 position-absolute start-0 ms-2 ms-md-3 shadow-lg"
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhotoIndex((selectedPhotoIndex + 1) % total);
              }}
              className="btn btn-rose-gold rounded-circle p-2 position-absolute end-0 me-2 me-md-3 shadow-lg"
              aria-label="Next photo"
            >
              <ChevronRight size={24} />
            </button>

            {/* Active Image */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="text-center position-relative"
              style={{ maxWidth: '92vw', maxHeight: '88vh' }}
            >
              <img
                src={photos[selectedPhotoIndex].url}
                alt={photos[selectedPhotoIndex].title}
                className="img-fluid rounded-4 shadow-2xl border border-rose-gold"
                style={{ maxHeight: '75vh', objectFit: 'contain' }}
              />
              <div className="text-white mt-3 font-playfair fs-5">
                {photos[selectedPhotoIndex].title}
                <div className="text-rose-gold small font-sans mt-1">
                  Photo {selectedPhotoIndex + 1} of {total}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
