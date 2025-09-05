import React from 'react';
import { Platform, Text } from 'react-native';
import { 
  Ionicons, 
  MaterialIcons, 
  MaterialCommunityIcons,
  Feather,
  AntDesign 
} from '@expo/vector-icons';
import { SimpleIcon } from './SimpleIcon';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  fallback?: boolean;
}

// Universal icon component that works across all platforms
export const UniversalIcon: React.FC<IconProps> = ({ name, size = 24, color = '#FFFFFF', fallback = false }) => {
  const iconSize = Platform.OS === 'web' ? size : size;
  
  // If fallback is requested or if we want to ensure compatibility, use SimpleIcon
  if (fallback) {
    return <SimpleIcon name={name} size={iconSize} color={color} />;
  }
  
  try {
    switch (name) {
      case 'home':
        return <Ionicons name="home" size={iconSize} color={color} />;
      case 'map':
        return <Ionicons name="map" size={iconSize} color={color} />;
      case 'reports':
        return <Ionicons name="document-text" size={iconSize} color={color} />;
      case 'community':
        return <Ionicons name="people" size={iconSize} color={color} />;
      case 'add':
        return <Ionicons name="add" size={iconSize} color={color} />;
      case 'location':
        return <Ionicons name="location" size={iconSize} color={color} />;
      case 'camera':
        return <Ionicons name="camera" size={iconSize} color={color} />;
      case 'search':
        return <Ionicons name="search" size={iconSize} color={color} />;
      case 'filter':
        return <Ionicons name="filter" size={iconSize} color={color} />;
      case 'settings':
        return <Ionicons name="settings" size={iconSize} color={color} />;
      case 'notifications':
        return <Ionicons name="notifications" size={iconSize} color={color} />;
      case 'profile':
        return <Ionicons name="person" size={iconSize} color={color} />;
      case 'back':
        return <Ionicons name="arrow-back" size={iconSize} color={color} />;
      case 'forward':
        return <Ionicons name="arrow-forward" size={iconSize} color={color} />;
      case 'close':
        return <Ionicons name="close" size={iconSize} color={color} />;
      case 'check':
        return <Ionicons name="checkmark" size={iconSize} color={color} />;
      case 'edit':
        return <Ionicons name="create" size={iconSize} color={color} />;
      case 'delete':
        return <Ionicons name="trash" size={iconSize} color={color} />;
      case 'share':
        return <Ionicons name="share" size={iconSize} color={color} />;
      case 'star':
        return <Ionicons name="star" size={iconSize} color={color} />;
      case 'heart':
        return <Ionicons name="heart" size={iconSize} color={color} />;
      case 'download':
        return <Ionicons name="download" size={iconSize} color={color} />;
      case 'upload':
        return <Ionicons name="cloud-upload" size={iconSize} color={color} />;
      case 'refresh':
        return <Ionicons name="refresh" size={iconSize} color={color} />;
      case 'info':
        return <Ionicons name="information-circle" size={iconSize} color={color} />;
      case 'warning':
        return <Ionicons name="warning" size={iconSize} color={color} />;
      case 'error':
        return <Ionicons name="alert-circle" size={iconSize} color={color} />;
      case 'success':
        return <Ionicons name="checkmark-circle" size={iconSize} color={color} />;
      case 'menu':
        return <Ionicons name="menu" size={iconSize} color={color} />;
      case 'more':
        return <Ionicons name="ellipsis-horizontal" size={iconSize} color={color} />;
      default:
        // Fallback to a generic icon
        return <Ionicons name="help-circle" size={iconSize} color={color} />;
    }
  } catch (error) {
    // If Ionicons fails, fallback to SimpleIcon
    return <SimpleIcon name={name} size={iconSize} color={color} />;
  }
};

// Simple text-based icons as fallback for extreme compatibility
export const TextIcon: React.FC<{ name: string; size?: number; color?: string }> = ({ 
  name, 
  size = 24, 
  color = '#FFFFFF' 
}) => {
  const getTextIcon = (iconName: string): string => {
    switch (iconName) {
      case 'home': return '🏠';
      case 'map': return '🗺️';
      case 'reports': return '📄';
      case 'community': return '👥';
      case 'add': return '➕';
      case 'location': return '📍';
      case 'camera': return '📷';
      case 'search': return '🔍';
      case 'filter': return '🔽';
      case 'settings': return '⚙️';
      case 'notifications': return '🔔';
      case 'profile': return '👤';
      case 'back': return '◀';
      case 'forward': return '▶';
      case 'close': return '✕';
      case 'check': return '✓';
      case 'edit': return '✏️';
      case 'delete': return '🗑️';
      case 'share': return '📤';
      case 'star': return '⭐';
      case 'heart': return '❤️';
      case 'download': return '⬇️';
      case 'upload': return '⬆️';
      case 'refresh': return '🔄';
      case 'info': return 'ℹ️';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      case 'success': return '✅';
      case 'menu': return '☰';
      case 'more': return '⋯';
      default: return '❓';
    }
  };

  return (
    <Text style={{ 
      fontSize: size, 
      color, 
      textAlign: 'center',
      lineHeight: size,
      includeFontPadding: false,
    }}>
      {getTextIcon(name)}
    </Text>
  );
};

export default UniversalIcon;
