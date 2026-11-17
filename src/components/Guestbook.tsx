import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MessageSquareHeart, Heart, Send, Sparkles } from 'lucide-react';
import { GuestbookWish } from '../types';
import { weddingAudio } from '../utils/audio';

export const Guestbook: React.FC = () => {
  const initialWishes: GuestbookWish[] = [
    {
      id: '1',
      author: 'Rajesh & Sunita Sharma',
      relation: "Groom's Parents",
      message:
        'Seeing our son Aarav find the soulmate who illuminates his world with laughter and wisdom is the greatest joy of our lives. May your life together be blessed with endless peace and companionship!',
      date: 'November 15, 2026',
      likes: 42,
      avatarSeed: 'RS'
    },
    {
      id: '2',
      author: 'Ananya & Vikram Kapoor',
      relation: "Bride's Family",
      message:
        'Dearest Meera, you have brought joy to everyone around you since the day you were born. Aarav, welcome to the family! We cannot wait to dance all night at the Sangeet.',
      date: 'November 12, 2026',
      likes: 38,
      avatarSeed: 'AV'
    },
    {
      id: '3',
      author: 'Kunal Deshmukh',
      relation: 'College Best Friend',
      message:
        'From late-night architecture studio drafts to watching you marry the love of your life! So immensely proud and ecstatic for you both, Aarav and Meera!',
      date: 'November 8, 2026',
      likes: 29,
      avatarSeed: 'KD'
    }
  ];

  const [wishes, setWishes] = useState<GuestbookWish[]>(() => {
    try {
      const stored = localStorage.getItem('wedding_guestbook');
      return stored ? JSON.parse(stored) : initialWishes;
    } catch {
      return initialWishes;
    }
  });

  const [author, setAuthor] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('wedding_guestbook', JSON.stringify(wishes));
    } catch {
      // ignore
    }
  }, [wishes]);

  const handleLike = (id: string) => {
    setWishes((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const isLiked = !w.isLiked;
          return {
            ...w,
            isLiked,
            likes: isLiked ? w.likes + 1 : w.likes - 1
          };
        }
        return w;
      })
    );
  };

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    const initials = author
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    const newWish: GuestbookWish = {
      id: Date.now().toString(),
      author: author.trim(),
      relation: relation.trim() || 'Well-Wisher',
      message: message.trim(),
      date: 'Just now',
      likes: 1,
      isLiked: true,
      avatarSeed: initials || 'WW'
    };

    setWishes([newWish, ...wishes]);
    setAuthor('');
    setRelation('');
    setMessage('');

    weddingAudio.playCelebrationChime();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#D4AF37', '#FCF6BA', '#F8C8DC']
    });
  };

  return (
    <section id="wishes" className="py-5 position-relative">
      <div className="container">
        {/* Section Heading */}
        <div className="text-center mb-5">
          <div className="badge-gold mb-2 d-inline-flex align-items-center gap-2">
            <MessageSquareHeart size={14} /> Warm Blessings <MessageSquareHeart size={14} />
          </div>
          <h2 className="font-playfair display-5 mb-2">Guestbook &amp; Wishes Wall</h2>
          <div className="ornate-divider">
            <span className="ornate-line"></span>
            <span className="ornate-icon">❦</span>
            <span className="ornate-line"></span>
          </div>
          <p className="text-muted mx-auto" style={{ maxWidth: '540px' }}>
            Leave a note of love, wisdom, or advice for Aarav &amp; Meera as they step into married bliss.
          </p>
        </div>

        <div className="row g-4">
          {/* Left: Leave a Wish Form */}
          <div className="col-lg-5">
            <div className="glass-card p-4 p-md-5 h-100">
              <h3 className="font-playfair fs-4 mb-3 d-flex align-items-center gap-2">
                <Sparkles size={20} className="text-warning" />
                <span>Write a Blessing</span>
              </h3>
              <p className="text-muted small mb-4">
                Your words will appear live on our wall and be preserved in our keepsake album.
              </p>

              <form onSubmit={handleAddWish}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Your Name *</label>
                  <input
                    type="text"
                    required
                    className="form-control rounded-3 border-warning border-opacity-50"
                    placeholder="e.g. Priya Sharma"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Relationship / How you know the couple</label>
                  <input
                    type="text"
                    className="form-control rounded-3 border-warning border-opacity-50"
                    placeholder="e.g. Groom's Cousin / Bride's School Friend"
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-semibold">Your Blessing or Note *</label>
                  <textarea
                    rows={4}
                    required
                    className="form-control rounded-3 border-warning border-opacity-50"
                    placeholder="Write your wishes for the couple..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-gold w-100 py-3 d-inline-flex align-items-center justify-content-center gap-2"
                >
                  <Send size={16} /> Post Your Blessing
                </button>
              </form>
            </div>
          </div>

          {/* Right: Wishes Stream */}
          <div className="col-lg-7">
            <div
              className="d-flex flex-column gap-3 overflow-y-auto pe-1"
              style={{ maxHeight: '580px' }}
            >
              {wishes.map((w) => (
                <div key={w.id} className="glass-card p-4 glass-card-hover">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-dark border border-warning shadow-sm flex-shrink-0"
                        style={{
                          width: '45px',
                          height: '45px',
                          background: 'linear-gradient(135deg, #fef6dc, #eed392)',
                          fontSize: '0.88rem'
                        }}
                      >
                        {w.avatarSeed}
                      </div>
                      <div>
                        <h4 className="font-playfair fs-6 mb-0 text-dark fw-bold">{w.author}</h4>
                        <span className="badge bg-warning-subtle text-warning-emphasis small px-2 py-0">
                          {w.relation}
                        </span>
                      </div>
                    </div>
                    <span className="text-muted" style={{ fontSize: '0.74rem' }}>
                      {w.date}
                    </span>
                  </div>

                  <p className="text-secondary small fst-italic my-3" style={{ lineHeight: '1.6' }}>
                    &quot;{w.message}&quot;
                  </p>

                  <div className="d-flex justify-content-end align-items-center pt-2 border-top border-warning border-opacity-25">
                    <button
                      onClick={() => handleLike(w.id)}
                      className={`btn btn-sm rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1 ${
                        w.isLiked ? 'btn-danger text-white' : 'btn-outline-danger'
                      }`}
                      style={{ fontSize: '0.75rem' }}
                    >
                      <Heart size={13} fill={w.isLiked ? '#fff' : 'none'} />
                      <span>{w.likes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
