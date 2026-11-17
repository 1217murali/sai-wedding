import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { GalleryPhoto } from '../types';

export const PhotoGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'prewedding' | 'candid' | 'moments'>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

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
      category: 'prewedding'
    },
    {
      id: 3,
      url: '/images/trade.jpg',
      title: 'Cherished Traditional Moments',
      category: 'candid'
    },
    {
      id: 4,
      url: '/images/back pose.jpg',
      title: 'Walking Hand in Hand into Forever',
      category: 'candid'
    },
    {
      id: 5,
      url: '/images/groom.jpg',
      title: 'Sai - The Groom',
      category: 'prewedding'
    },
    {
      id: 6,
      url: '/images/bride.jpg',
      title: 'Saraswathi - The Bride',
      category: 'moments'
    }
  ];

  const filteredPhotos = photos.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  );

  const handleOpenLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
    }
  };

  return (
    <section id="gallery" className="py-4 py-md-5 position-relative">
      <div className="container px-3">
        <div className="text-center mb-4 mb-md-5 reveal-on-scroll">
          <div className="badge-rose mb-2 d-inline-flex align-items-center gap-2">
            <Camera size={13} /> Cherished Frames <Camera size={13} />
          </div>
          <h2 className="font-playfair display-5 mb-2">Moments of Love</h2>
          <div className="ornate-divider">
            <span className="ornate-line"></span>
            <span className="ornate-icon">❦</span>
            <span className="ornate-line"></span>
          </div>
          <p className="text-muted mx-auto px-2" style={{ maxWidth: '540px', fontSize: '0.9rem' }}>
            A glimpse into the shared smiles, quiet glances, and cherished moments of Sai &amp; Saraswathi.
          </p>

          {/* Category Tabs */}
          <div className="d-flex flex-wrap justify-content-center gap-1 gap-sm-2 my-3">
            {(['all', 'prewedding', 'candid', 'moments'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`btn btn-sm rounded-pill px-3 py-1 fw-semibold text-capitalize ${
                  activeCategory === cat ? 'btn-rose-gold' : 'btn-outline-rose-gold'
                }`}
                style={{ fontSize: '0.78rem' }}
              >
                {cat === 'all' ? 'All Photos' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="row g-3 g-md-4 justify-content-center">
          {filteredPhotos.map((photo, idx) => (
            <div key={photo.id} className="col-12 col-sm-6 col-lg-4 reveal-on-scroll">
              <div
                onClick={() => handleOpenLightbox(idx)}
                className="ornate-img-frame-rose cursor-pointer position-relative overflow-hidden group shadow-sm"
                style={{ cursor: 'pointer', height: '290px' }}
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-100 h-100 rounded-3 transition-transform"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                {/* Overlay Caption on Hover */}
                <div
                  className="position-absolute bottom-0 start-0 end-0 p-3 text-white d-flex align-items-center justify-content-between"
                  style={{
                    background: 'linear-gradient(to top, rgba(30,12,15,0.85), transparent)',
                    borderBottomLeftRadius: '16px',
                    borderBottomRightRadius: '16px'
                  }}
                >
                  <span className="small fw-semibold">{photo.title}</span>
                  <Eye size={16} className="text-rose-gold" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fullscreen Lightbox Modal */}
        {selectedPhotoIndex !== null && (
          <div
            onClick={handleCloseLightbox}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
            style={{
              backgroundColor: 'rgba(20, 8, 10, 0.95)',
              backdropFilter: 'blur(10px)',
              zIndex: 99999
            }}
          >
            {/* Close button */}
            <button
              onClick={handleCloseLightbox}
              className="btn btn-link text-white position-absolute top-0 end-0 m-3 m-md-4 p-2 text-decoration-none"
              aria-label="Close Lightbox"
            >
              <X size={30} />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={handlePrev}
              className="btn btn-rose-gold rounded-circle p-2 position-absolute start-0 ms-2 ms-md-3 shadow-lg"
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={handleNext}
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
                src={filteredPhotos[selectedPhotoIndex].url}
                alt={filteredPhotos[selectedPhotoIndex].title}
                className="img-fluid rounded-4 shadow-2xl border border-rose-gold"
                style={{ maxHeight: '75vh', objectFit: 'contain' }}
              />
              <div className="text-white mt-3 font-playfair fs-5">
                {filteredPhotos[selectedPhotoIndex].title}
                <div className="text-rose-gold small font-sans mt-1">
                  Photo {selectedPhotoIndex + 1} of {filteredPhotos.length}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
