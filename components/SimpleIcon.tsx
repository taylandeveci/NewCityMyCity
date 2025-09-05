import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';

interface SimpleIconProps {
  name: string;
  size?: number;
  color?: string;
}

export const SimpleIcon: React.FC<SimpleIconProps> = ({ name, size = 24, color = '#FFFFFF' }) => {
  const getSimpleIcon = (iconName: string): string => {
    switch (iconName) {
      case 'home': return '⌂';
      case 'map': return '⊞';
      case 'reports': return '☰';
      case 'community': return '♥';
      case 'add': return '+';
      case 'location': return '●';
      case 'camera': return '□';
      case 'search': return '○';
      case 'filter': return '▼';
      case 'settings': return '⚙';
      case 'notifications': return '!';
      case 'profile': return '◐';
      case 'back': return '◀';
      case 'forward': return '▶';
      case 'close': return '×';
      case 'check': return '✓';
      case 'edit': return '✎';
      case 'delete': return '⌫';
      case 'share': return '↗';
      case 'star': return '★';
      case 'heart': return '♡';
      case 'download': return '↓';
      case 'upload': return '↑';
      case 'refresh': return '↻';
      case 'info': return 'i';
      case 'warning': return '!';
      case 'error': return '✗';
      case 'success': return '✓';
      case 'menu': return '≡';
      case 'more': return '⋯';
      default: return '?';
    }
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Text style={[styles.icon, { fontSize: size * 0.8, color }]}>
        {getSimpleIcon(name)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    textAlign: 'center',
    fontWeight: 'bold',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});

export default SimpleIcon;
