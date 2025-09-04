import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (iPhone 14 Pro)
const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

// Device types
export const DEVICE_TYPES = {
  PHONE: 'PHONE',
  TABLET: 'TABLET',
  DESKTOP: 'DESKTOP',
} as const;

// Screen size categories
export const SCREEN_SIZES = {
  SMALL: 'SMALL',
  MEDIUM: 'MEDIUM', 
  LARGE: 'LARGE',
  XLARGE: 'XLARGE',
} as const;

// Get device type based on screen size
export const getDeviceType = (): typeof DEVICE_TYPES[keyof typeof DEVICE_TYPES] => {
  if (Platform.OS === 'web' && SCREEN_WIDTH > 992) {
    return DEVICE_TYPES.DESKTOP;
  }
  if (SCREEN_WIDTH >= 768) {
    return DEVICE_TYPES.TABLET;
  }
  return DEVICE_TYPES.PHONE;
};

// Get screen size category
export const getScreenSize = (): typeof SCREEN_SIZES[keyof typeof SCREEN_SIZES] => {
  if (SCREEN_WIDTH < 576) return SCREEN_SIZES.SMALL;
  if (SCREEN_WIDTH < 768) return SCREEN_SIZES.MEDIUM;
  if (SCREEN_WIDTH < 992) return SCREEN_SIZES.LARGE;
  return SCREEN_SIZES.XLARGE;
};

// Device detection functions
export const isPhone = () => getDeviceType() === DEVICE_TYPES.PHONE;
export const isTablet = () => getDeviceType() === DEVICE_TYPES.TABLET;
export const isDesktop = () => getDeviceType() === DEVICE_TYPES.DESKTOP;

// Platform checks
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isWeb = Platform.OS === 'web';

// Responsive width
export const wp = (percentage: number): number => {
  const value = (percentage * SCREEN_WIDTH) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};

// Responsive height
export const hp = (percentage: number): number => {
  const value = (percentage * SCREEN_HEIGHT) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};

// Responsive font size
export const rf = (size: number): number => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  const newSize = size * scale;
  
  // Apply platform-specific adjustments
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  if (Platform.OS === 'android') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
  // Web
  return Math.round(newSize);
};

// Responsive spacing
export const rs = (size: number): number => {
  const scale = Math.min(SCREEN_WIDTH / BASE_WIDTH, SCREEN_HEIGHT / BASE_HEIGHT);
  return Math.round(size * scale);
};

// Device-specific values
export const deviceValue = <T>(values: {
  [key: string]: T;
  default: T;
}): T => {
  const deviceType = getDeviceType();
  return values[deviceType] || values.default;
};

// Screen size-specific values
export const screenValue = <T>(values: {
  [key: string]: T;
  default: T;
}): T => {
  const screenSize = getScreenSize();
  return values[screenSize] || values.default;
};

// Responsive dimensions
export const getDimensions = () => ({
  window: Dimensions.get('window'),
  screen: Dimensions.get('screen'),
  isLandscape: SCREEN_WIDTH > SCREEN_HEIGHT,
  isPortrait: SCREEN_HEIGHT > SCREEN_WIDTH,
  deviceType: getDeviceType(),
  screenSize: getScreenSize(),
});

// Safe area for different devices
export const getSafeAreaInsets = () => {
  const deviceType = getDeviceType();
  
  if (Platform.OS === 'web') {
    return { top: 0, bottom: 0, left: 0, right: 0 };
  }
  
  // Default safe area values for different device types
  const defaults = {
    [DEVICE_TYPES.PHONE]: { top: 44, bottom: 34, left: 0, right: 0 },
    [DEVICE_TYPES.TABLET]: { top: 24, bottom: 20, left: 0, right: 0 },
    [DEVICE_TYPES.DESKTOP]: { top: 0, bottom: 0, left: 0, right: 0 },
  };
  
  return defaults[deviceType];
};

// Responsive grid columns
export const getGridColumns = (): number => {
  return deviceValue({
    phone: 1,
    tablet: 2,
    desktop: 3,
    default: 1,
  });
};

// Responsive container padding
export const getContainerPadding = (): number => {
  return deviceValue({
    phone: rs(16),
    tablet: rs(24),
    desktop: rs(32),
    default: rs(16),
  });
};

// Responsive card width
export const getCardWidth = (): number => {
  const padding = getContainerPadding();
  const columns = getGridColumns();
  const gap = rs(16);
  
  return (SCREEN_WIDTH - (padding * 2) - (gap * (columns - 1))) / columns;
};

// Check if device is small screen
export const isSmallScreen = (): boolean => {
  return SCREEN_WIDTH < 576 || SCREEN_HEIGHT < 667;
};

// Check if device is large screen
export const isLargeScreen = (): boolean => {
  return SCREEN_WIDTH >= 768;
};

// Responsive breakpoints
export const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
} as const;

// Media query equivalent for React Native
export const mediaQuery = (minWidth: number): boolean => {
  return SCREEN_WIDTH >= minWidth;
};

export default {
  wp,
  hp,
  rf,
  rs,
  deviceValue,
  screenValue,
  getDimensions,
  getDeviceType,
  getScreenSize,
  getSafeAreaInsets,
  getGridColumns,
  getContainerPadding,
  getCardWidth,
  isSmallScreen,
  isLargeScreen,
  mediaQuery,
  BREAKPOINTS,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
};
