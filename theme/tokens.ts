export const colors = {
  // Primary blues with #1488ac base
  primary: {
    900: '#0A4B5E',
    800: '#0E5C74',
    700: '#126D8A',
    600: '#1488ac',
    500: '#1488ac',
    400: '#2A9CC4',
    300: '#40B0DA',
    200: '#56C4F0',
    100: '#6CD8FF',
  },
  
  // Accent gradient colors
  accent: {
    blue: '#1488ac',
    purple: '#2A9CC4',
    gradient: ['#1488ac', '#2A9CC4'] as const,
  },
  
  // Background gradients
  background: {
    primary: '#0A1024',
    secondary: '#141935',
    gradient: ['#0A1024', '#141935'] as const,
  },
  
  // Surface colors
  surface: {
    primary: '#1B203A',
    secondary: '#242B47',
    tertiary: '#2D3654',
    opacity: 'rgba(27, 32, 58, 0.95)',
  },
  
  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: '#E5E9F2',
    tertiary: '#B8BFC8',
    disabled: '#6B7280',
    accent: '#1488ac',
  },
  
  // Glow effects
  glow: {
    primary: 'rgba(20, 136, 172, 0.6)',
    accent: 'rgba(20, 136, 172, 0.45)',
    success: 'rgba(52, 211, 153, 0.4)',
    warning: 'rgba(251, 191, 36, 0.4)',
    error: 'rgba(248, 113, 113, 0.4)',
  },
  
  // Status colors
  status: {
    awaiting: '#F59E0B',
    inReview: '#1488ac',
    resolved: '#10B981',
    rejected: '#EF4444',
  },
  
  // Semantic colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#1488ac',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 56,
  '7xl': 64,
  '8xl': 80,
};

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  full: 9999,
};

export const typography = {
  heading: {
    h1: {
      fontSize: 32,
      fontWeight: '700' as const,
      lineHeight: 40,
    },
    h2: {
      fontSize: 28,
      fontWeight: '600' as const,
      lineHeight: 36,
    },
    h3: {
      fontSize: 24,
      fontWeight: '600' as const,
      lineHeight: 32,
    },
    h4: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 28,
    },
  },
  body: {
    large: {
      fontSize: 18,
      fontWeight: '400' as const,
      lineHeight: 26,
    },
    medium: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24,
    },
    small: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 20,
    },
    xsmall: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 16,
    },
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
  },
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  glow: {
    shadowColor: colors.glow.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 0,
  },
  accentGlow: {
    shadowColor: colors.accent.blue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 24,
    elevation: 0,
  },
};

export const theme = {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
};

export type Theme = typeof theme;
