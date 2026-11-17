export interface WeddingEvent {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  venueName: string;
  venueHall: string;
  description: string;
  dressCode: string;
  dressCodeColors: string[];
  icon: string;
  image: string;
}

export interface StoryMilestone {
  year: string;
  title: string;
  description: string;
  dateStr: string;
  image: string;
}

export interface GalleryPhoto {
  id: number;
  url: string;
  title: string;
  category: 'all' | 'prewedding' | 'candid' | 'moments';
}

export interface RSVPData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  attending: 'attending' | 'not-attending';
  guestCount: number;
  dietaryPreference: string;
  eventsAttending: string[];
  songRequest?: string;
  message?: string;
  submittedAt: string;
  passCode: string;
}

export interface GuestbookWish {
  id: string;
  author: string;
  relation: string;
  message: string;
  date: string;
  likes: number;
  isLiked?: boolean;
  avatarSeed: string;
}

export interface WeddingPalette {
  name: string;
  hex: string;
  description: string;
  textDark?: boolean;
}
