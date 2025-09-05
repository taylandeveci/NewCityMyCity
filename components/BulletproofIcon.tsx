import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface BulletproofIconProps {
  name: string;
  size?: number;
  color?: string;
}

export const BulletproofIcon: React.FC<BulletproofIconProps> = ({ 
  name, 
  size = 24, 
  color = '#FFFFFF' 
}) => {
  const getIcon = (iconName: string): string => {
    switch (iconName) {
      case 'home': return 'H';
      case 'map': return 'M';
      case 'reports': return 'R';
      case 'community': return 'C';
      case 'add': return '+';
      case 'location': return 'L';
      case 'camera': return 'C';
      case 'search': return 'S';
      case 'filter': return 'F';
      case 'settings': return 'S';
      case 'notifications': return 'N';
      case 'profile': return 'P';
      case 'back': return '<';
      case 'forward': return '>';
      case 'close': return 'X';
      case 'check': return 'V';
      case 'edit': return 'E';
      case 'delete': return 'D';
      case 'share': return 'S';
      case 'star': return '*';
      case 'heart': return 'H';
      case 'download': return 'D';
      case 'upload': return 'U';
      case 'refresh': return 'R';
      case 'info': return 'I';
      case 'warning': return '!';
      case 'error': return 'X';
      case 'success': return 'V';
      case 'menu': return '=';
      case 'more': return '.';
      default: return '?';
    }
  };

  return (
    <View style={[
      styles.container, 
      { 
        width: size, 
        height: size,
        borderRadius: size / 2,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
      }
    ]}>
      <Text style={[styles.icon, { fontSize: size * 0.5, color }]}>
        {getIcon(name)}
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
    fontFamily: 'System',
  },
});

export default BulletproofIcon;
