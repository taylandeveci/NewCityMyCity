# CityMyCity - Citizen Complaint Tracking App

A React Native mobile application for tracking citizen complaints with a modern dark theme and neon glow effects, built with Expo and TypeScript.

## Features

- 🏙️ **Citizen Complaint Management**: Submit, track, and monitor the progress of city-related complaints
- 🗺️ **Interactive Map**: View complaints on a map with location-based filtering
- 👥 **Community Features**: Connect with local clubs, institutions, and fellow citizens
- 📊 **Progress Tracking**: Real-time status updates and timeline visualization
- 🌃 **Modern Dark Theme**: Sleek UI with blue accents and neon glow effects
- 📱 **Mobile-First Design**: Optimized for iOS and Android devices

## Tech Stack

- **Framework**: React Native with Expo SDK 53
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **Animations**: React Native Reanimated 3
- **Styling**: Custom theme system with design tokens
- **State Management**: Local state with React hooks
- **Data**: Mock data for demonstration

## Project Structure

```
app/
├── (tabs)/                 # Tab-based navigation screens
│   ├── index.tsx          # Home screen
│   ├── map.tsx            # Map view screen
│   ├── reports.tsx        # Reports list screen
│   └── community.tsx      # Community screen
├── complaint/             # Complaint-related screens
│   ├── [id].tsx          # Complaint detail screen
│   └── new.tsx           # New complaint form
└── _layout.tsx           # Root layout

components/                # Reusable UI components
├── BottomTab.tsx         # Custom floating bottom tab bar
├── GlowingCTA.tsx        # Glowing call-to-action button
├── MapPreviewCard.tsx    # Map preview component
├── FilterChip.tsx        # Filter selection chips
├── InfoCard.tsx          # Information display cards
├── PromoCard.tsx         # Promotional cards
├── ComplaintCard.tsx     # Complaint item display
├── StatusPill.tsx        # Status indicator component
├── Timeline.tsx          # Progress timeline component
└── ImagePickerGrid.tsx   # Image selection grid

theme/                    # Design system
├── tokens.ts             # Design tokens (colors, spacing, typography)
└── provider.tsx          # Theme provider and hooks

data/
└── mock.ts              # Mock data and TypeScript interfaces
```

## Key Features by Screen

### Home Screen
- User profile and points display
- Main "Report Issue" CTA with glow effects
- Map preview card with animated patterns
- Quick action cards for navigation
- Category filters with selection states
- Recent complaints feed
- Weekly activity indicator

### Map Screen
- Full-screen map view with complaint pins
- Interactive bottom sheet with gesture handling
- Search functionality for locations
- Floating "Report" button
- Complaint clustering and status-based colors

### Reports Screen
- Tabbed interface (My Reports, Nearby, Citywide)
- Advanced filtering by category and status
- Complaint cards with progress indicators
- Pull-to-refresh functionality
- Empty states for filtered results

### Community Screen
- Institutions directory
- Local clubs with member counts
- Friend activity tracking
- Join/follow functionality
- Community campaigns and initiatives

### Complaint Detail Screen
- Full-screen image header
- Comprehensive complaint information
- Interactive progress bar
- Status timeline with icons
- Photo gallery
- Institution assignment details

### New Complaint Form
- Step-by-step complaint submission
- Category selection with chips
- Location picker integration
- Multi-image upload interface
- Form validation and submission feedback

## Design System

### Color Palette
- **Primary Blues**: #022545 → #4279F5 (9-step scale)
- **Accent Gradient**: #1D7DFF → #7A5CFF
- **Background**: Dark gradient (#0A1024 → #141935)
- **Surfaces**: Semi-transparent overlays with blur effects
- **Status Colors**: Awaiting (#F59E0B), In Review (#3B82F6), Resolved (#10B981)

### Typography
- **Headings**: 32px, 28px, 24px, 20px (weight: 600-700)
- **Body**: 18px, 16px, 14px, 12px (weight: 400)
- **Interactive**: 16px (weight: 600)

### Spacing & Layout
- **Grid**: 4px base unit with 8px, 12px, 16px, 24px, 32px increments
- **Border Radius**: 4px to 28px for different components
- **Shadows**: Multiple layers with glow effects for accent elements

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Expo CLI
- iOS Simulator or Android Emulator (for testing)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Run on specific platform**:
   ```bash
   npm run ios     # iOS Simulator
   npm run android # Android Emulator
   npm run web     # Web browser
   ```

### Development

The app uses Expo Router for navigation, which provides file-based routing similar to Next.js. Add new screens by creating files in the `app/` directory.

## Animations & Interactions

- **Haptic Feedback**: Integrated throughout the app for better user experience
- **Spring Animations**: Smooth press states and transitions using Reanimated
- **Gesture Handling**: Bottom sheet interactions and scroll-based animations
- **Glow Effects**: Custom shadow and blur effects for accent elements

## Mock Data

The app includes comprehensive mock data for:
- User profiles with points and streaks
- Complaint submissions with various statuses
- Community clubs and institutions
- Friend networks and activity feeds
- Categories and filtering options

## Future Enhancements

- Real backend integration with APIs
- Push notifications for status updates
- Offline capability with local storage
- Advanced map features with routing
- Social features and gamification
- Multi-language support

## License

This project is a demonstration app built for showcasing modern React Native development practices with Expo Router and advanced animations.
