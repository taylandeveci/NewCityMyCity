export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'awaiting' | 'inReview' | 'resolved' | 'rejected';
  coords: {
    latitude: number;
    longitude: number;
  };
  address: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  referenceNumber: string;
  institution?: string;
  timeline: TimelineEvent[];
  progress: number; // 0-100
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'current' | 'pending';
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Institution {
  id: string;
  name: string;
  type: string;
  contact: string;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  image: string;
  category: string;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  recentActivity: string;
  reportCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  useAlias: boolean;
  alias: string;
  points: number;
  streak: number;
  badges: string[];
  reportCount: number;
}

// Mock data
export const complaints: Complaint[] = [
  {
    id: '1',
    title: 'Ana Cadde üzerinde bozuk sokak lambası',
    description: 'Sokak lambası 3 gündür yanmıyor, geceleri bölgeyi güvenli değil.',
    category: 'lighting',
    status: 'inReview',
    coords: { latitude: 41.0082, longitude: 28.9784 },
    address: 'Ana Cadde, Beyoğlu, İstanbul',
    images: ['https://via.placeholder.com/300x200', 'https://via.placeholder.com/300x200'],
    createdAt: '2024-12-01T10:30:00Z',
    updatedAt: '2024-12-02T14:20:00Z',
    referenceNumber: 'CTC-2024-001',
    institution: 'İstanbul Elektrik Dağıtım',
    progress: 60,
    timeline: [
      {
        id: '1',
        title: 'Rapor Gönderildi',
        description: 'Şikayetiniz alındı',
        timestamp: '2024-12-01T10:30:00Z',
        status: 'completed',
      },
      {
        id: '2',
        title: 'Kuruma İletildi',
        description: 'İstanbul Elektrik Dağıtım\'a gönderildi',
        timestamp: '2024-12-01T16:45:00Z',
        status: 'completed',
      },
      {
        id: '3',
        title: 'İnceleme Altında',
        description: 'Teknik ekip sorunu değerlendiriyor',
        timestamp: '2024-12-02T09:15:00Z',
        status: 'current',
      },
      {
        id: '4',
        title: 'Çözüm',
        description: 'Sorun çözülecek',
        timestamp: '',
        status: 'pending',
      },
    ],
  },
  {
    id: '2',
    title: 'İstiklal Caddesi\'nde çukur',
    description: 'Büyük çukur trafik sorunlarına ve potansiyel kazalara neden oluyor.',
    category: 'road',
    status: 'awaiting',
    coords: { latitude: 41.0369, longitude: 28.9850 },
    address: 'İstiklal Caddesi, Beyoğlu, İstanbul',
    images: ['https://via.placeholder.com/300x200'],
    createdAt: '2024-12-03T08:15:00Z',
    updatedAt: '2024-12-03T08:15:00Z',
    referenceNumber: 'CTC-2024-002',
    progress: 20,
    timeline: [
      {
        id: '1',
        title: 'Rapor Gönderildi',
        description: 'Şikayetiniz alındı',
        timestamp: '2024-12-03T08:15:00Z',
        status: 'completed',
      },
      {
        id: '2',
        title: 'İlk İnceleme',
        description: 'Şikayet inceleniyor',
        timestamp: '',
        status: 'current',
      },
      {
        id: '3',
        title: 'Kuruma İletildi',
        description: 'İlgili departmana gönderilecek',
        timestamp: '',
        status: 'pending',
      },
      {
        id: '4',
        title: 'Çözüm',
        description: 'Sorun çözülecek',
        timestamp: '',
        status: 'pending',
      },
    ],
  },
  {
    id: '3',
    title: 'Gürültü şikayeti - Gece inşaat',
    description: 'Gece 22:00\'den sonra inşaat çalışması yapılıyor, gürültü yönetmeliklerini ihlal ediyor.',
    category: 'noise',
    status: 'resolved',
    coords: { latitude: 41.0351, longitude: 28.9840 },
    address: 'Galata Kulesi çevresi, Beyoğlu, İstanbul',
    images: [],
    createdAt: '2024-11-28T22:30:00Z',
    updatedAt: '2024-11-30T16:00:00Z',
    referenceNumber: 'CTC-2024-003',
    institution: 'Beyoğlu Belediyesi',
    progress: 100,
    timeline: [
      {
        id: '1',
        title: 'Report Submitted',
        description: 'Your complaint has been received',
        timestamp: '2024-11-28T22:30:00Z',
        status: 'completed',
      },
      {
        id: '2',
        title: 'Forwarded to Municipality',
        description: 'Sent to Beyoğlu Municipality',
        timestamp: '2024-11-29T09:00:00Z',
        status: 'completed',
      },
      {
        id: '3',
        title: 'Investigation',
        description: 'Municipal inspectors visited the site',
        timestamp: '2024-11-29T14:30:00Z',
        status: 'completed',
      },
      {
        id: '4',
        title: 'Resolved',
        description: 'Construction company was notified and work hours adjusted',
        timestamp: '2024-11-30T16:00:00Z',
        status: 'completed',
      },
    ],
  },
];

export const categories: Category[] = [
  { id: 'all', name: 'Tümü', icon: 'grid', color: '#6B7280' },
  { id: 'road', name: 'Yol', icon: 'car', color: '#EF4444' },
  { id: 'transport', name: 'Ulaşım', icon: 'bus', color: '#3B82F6' },
  { id: 'cleanliness', name: 'Temizlik', icon: 'trash', color: '#10B981' },
  { id: 'lighting', name: 'Aydınlatma', icon: 'lightbulb', color: '#F59E0B' },
  { id: 'noise', name: 'Gürültü', icon: 'volume-x', color: '#8B5CF6' },
  { id: 'water', name: 'Su', icon: 'droplet', color: '#06B6D4' },
  { id: 'parks', name: 'Parklar', icon: 'tree', color: '#22C55E' },
];

export const institutions: Institution[] = [
  {
    id: '1',
    name: 'İstanbul Büyükşehir Belediyesi',
    type: 'Belediye',
    contact: 'contact@ibb.gov.tr',
  },
  {
    id: '2',
    name: 'Beyoğlu Belediyesi',
    type: 'İlçe Belediyesi',
    contact: 'info@beyoglu.bel.tr',
  },
  {
    id: '3',
    name: 'İstanbul Elektrik Dağıtım',
    type: 'Kamu Hizmeti Şirketi',
    contact: 'support@ayedas.com.tr',
  },
  {
    id: '4',
    name: 'İstanbul Su ve Kanalizasyon',
    type: 'Kamu Hizmeti Şirketi',
    contact: 'info@iski.gov.tr',
  },
];

export const clubs: Club[] = [
  {
    id: '1',
    name: 'Temiz Sokaklar Girişimi',
    description: 'Mahallelerimizi temiz tutmak için birlikte çalışıyoruz',
    memberCount: 847,
    image: 'https://via.placeholder.com/200x120',
    category: 'Çevre',
  },
  {
    id: '2',
    name: 'Güvenli Yollar Koalisyonu',
    description: 'Daha iyi yol güvenliği önlemleri için savunuculuk yapıyoruz',
    memberCount: 623,
    image: 'https://via.placeholder.com/200x120',
    category: 'Güvenlik',
  },
  {
    id: '3',
    name: 'Park Koruyucuları',
    description: 'Kamu yeşil alanlarımızı koruyoruz ve bakımını yapıyoruz',
    memberCount: 394,
    image: 'https://via.placeholder.com/200x120',
    category: 'Çevre',
  },
];

export const friends: Friend[] = [
  {
    id: '1',
    name: 'Ayşe K.',
    avatar: 'https://via.placeholder.com/40x40',
    recentActivity: 'Reported a broken bench in Gezi Park',
    reportCount: 23,
  },
  {
    id: '2',
    name: 'Mehmet S.',
    avatar: 'https://via.placeholder.com/40x40',
    recentActivity: 'Fixed a pothole complaint status',
    reportCount: 45,
  },
  {
    id: '3',
    name: 'Elif T.',
    avatar: 'https://via.placeholder.com/40x40',
    recentActivity: 'Temiz Sokaklar Girişimi\'ne katıldı',
    reportCount: 12,
  },
];

export const user: User = {
  id: '1',
  name: 'Taylan Deveci',
  email: 'taylan@example.com',
  avatar: 'https://via.placeholder.com/60x60',
  useAlias: true,
  alias: 'CityGuardian',
  points: 1247,
  streak: 7,
  badges: ['İlk Rapor', 'Topluluk Yardımcısı', 'Problem Çözücü'],
  reportCount: 15,
};
