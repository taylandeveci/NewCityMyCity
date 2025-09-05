import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { useTheme } from '../theme/provider';

interface StatusPillProps {
  status: 'awaiting' | 'inReview' | 'resolved' | 'rejected';
}

export const StatusPill: React.FC<StatusPillProps> = ({ status }) => {
  const theme = useTheme();

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'awaiting':
        return {
          text: 'Bekliyor',
          backgroundColor: theme.colors.status.awaiting + '20',
          color: theme.colors.status.awaiting,
        };
      case 'inReview':
        return {
          text: 'İnceleniyor',
          backgroundColor: theme.colors.status.inReview + '20',
          color: theme.colors.status.inReview,
        };
      case 'resolved':
        return {
          text: 'Çözüldü',
          backgroundColor: theme.colors.status.resolved + '20',
          color: theme.colors.status.resolved,
        };
      case 'rejected':
        return {
          text: 'Reddedildi',
          backgroundColor: theme.colors.status.rejected + '20',
          color: theme.colors.status.rejected,
        };
      default:
        return {
          text: 'Bilinmiyor',
          backgroundColor: theme.colors.surface.secondary,
          color: theme.colors.text.tertiary,
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: config.backgroundColor,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: config.color,
            fontSize: theme.typography.caption.fontSize,
            fontWeight: theme.typography.caption.fontWeight,
          },
        ]}
      >
        {config.text}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  text: {
    textAlign: 'center',
  },
});
