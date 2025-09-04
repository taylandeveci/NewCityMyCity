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
    title: 'Broken streetlight on Main Street',
    description: 'The streetlight has been out for 3 days, making the area unsafe at night.',
    category: 'lighting',
    status: 'inReview',
    coords: { latitude: 41.0082, longitude: 28.9784 },
    address: 'Main Street, Beyoğlu, Istanbul',
    images: ['https://via.placeholder.com/300x200', 'https://via.placeholder.com/300x200'],
    createdAt: '2024-12-01T10:30:00Z',
    updatedAt: '2024-12-02T14:20:00Z',
    referenceNumber: 'CTC-2024-001',
    institution: 'Istanbul Electric Distribution',
    progress: 60,
    timeline: [
      {
        id: '1',
        title: 'Report Submitted',
        description: 'Your complaint has been received',
        timestamp: '2024-12-01T10:30:00Z',
        status: 'completed',
      },
      {
        id: '2',
        title: 'Forwarded to Institution',
        description: 'Sent to Istanbul Electric Distribution',
        timestamp: '2024-12-01T16:45:00Z',
        status: 'completed',
      },
      {
        id: '3',
        title: 'Under Review',
        description: 'Technical team is evaluating the issue',
        timestamp: '2024-12-02T09:15:00Z',
        status: 'current',
      },
      {
        id: '4',
        title: 'Resolution',
        description: 'Issue will be resolved',
        timestamp: '',
        status: 'pending',
      },
    ],
  },
  {
    id: '2',
    title: 'Pothole on Istiklal Avenue',
    description: 'Large pothole causing traffic issues and potential accidents.',
    category: 'road',
    status: 'awaiting',
    coords: { latitude: 41.0369, longitude: 28.9850 },
    address: 'Istiklal Avenue, Beyoğlu, Istanbul',
    images: ['https://via.placeholder.com/300x200'],
    createdAt: '2024-12-03T08:15:00Z',
    updatedAt: '2024-12-03T08:15:00Z',
    referenceNumber: 'CTC-2024-002',
    progress: 20,
    timeline: [
      {
        id: '1',
        title: 'Report Submitted',
        description: 'Your complaint has been received',
        timestamp: '2024-12-03T08:15:00Z',
        status: 'completed',
      },
      {
        id: '2',
        title: 'Initial Review',
        description: 'Complaint is being reviewed',
        timestamp: '',
        status: 'current',
      },
      {
        id: '3',
        title: 'Forwarded to Institution',
        description: 'Will be sent to relevant department',
        timestamp: '',
        status: 'pending',
      },
      {
        id: '4',
        title: 'Resolution',
        description: 'Issue will be resolved',
        timestamp: '',
        status: 'pending',
      },
    ],
  },
  {
    id: '3',
    title: 'Noise complaint - Construction at night',
    description: 'Construction work is being done after 10 PM, violating noise regulations.',
    category: 'noise',
    status: 'resolved',
    coords: { latitude: 41.0351, longitude: 28.9840 },
    address: 'Galata Tower vicinity, Beyoğlu, Istanbul',
    images: [],
    createdAt: '2024-11-28T22:30:00Z',
    updatedAt: '2024-11-30T16:00:00Z',
    referenceNumber: 'CTC-2024-003',
    institution: 'Beyoğlu Municipality',
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
  { id: 'all', name: 'All', icon: 'grid', color: '#6B7280' },
  { id: 'road', name: 'Road', icon: 'car', color: '#EF4444' },
  { id: 'transport', name: 'Transport', icon: 'bus', color: '#3B82F6' },
  { id: 'cleanliness', name: 'Cleanliness', icon: 'trash', color: '#10B981' },
  { id: 'lighting', name: 'Lighting', icon: 'lightbulb', color: '#F59E0B' },
  { id: 'noise', name: 'Noise', icon: 'volume-x', color: '#8B5CF6' },
  { id: 'water', name: 'Water', icon: 'droplet', color: '#06B6D4' },
  { id: 'parks', name: 'Parks', icon: 'tree', color: '#22C55E' },
];

export const institutions: Institution[] = [
  {
    id: '1',
    name: 'Istanbul Metropolitan Municipality',
    type: 'Municipality',
    contact: 'contact@ibb.gov.tr',
  },
  {
    id: '2',
    name: 'Beyoğlu Municipality',
    type: 'District Municipality',
    contact: 'info@beyoglu.bel.tr',
  },
  {
    id: '3',
    name: 'Istanbul Electric Distribution',
    type: 'Utility Company',
    contact: 'support@ayedas.com.tr',
  },
  {
    id: '4',
    name: 'Istanbul Water Authority',
    type: 'Utility Company',
    contact: 'info@iski.gov.tr',
  },
];

export const clubs: Club[] = [
  {
    id: '1',
    name: 'Clean Streets Initiative',
    description: 'Working together to keep our neighborhoods clean',
    memberCount: 847,
    image: 'https://via.placeholder.com/200x120',
    category: 'Environment',
  },
  {
    id: '2',
    name: 'Safe Roads Coalition',
    description: 'Advocating for better road safety measures',
    memberCount: 623,
    image: 'https://via.placeholder.com/200x120',
    category: 'Safety',
  },
  {
    id: '3',
    name: 'Park Protectors',
    description: 'Maintaining and protecting our public green spaces',
    memberCount: 394,
    image: 'https://via.placeholder.com/200x120',
    category: 'Environment',
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
    recentActivity: 'Joined Clean Streets Initiative',
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
  badges: ['First Report', 'Community Helper', 'Problem Solver'],
  reportCount: 15,
};
