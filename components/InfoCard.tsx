import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../theme/provider';

interface InfoCardProps {
  title: string;
  subtitle?: string;
  icon: keyof typeof Feather.glyphMap;
  onPress: () => void;
  color?: string;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  subtitle,
  icon,
  onPress,
  color,
}) => {
  const theme = useTheme();
  const scale = useSharedValue(1);

  const iconColor = color || theme.colors.accent.blue;

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    scale.value = withSpring(0.96, {
      damping: 15,
      stiffness: 300,
    }, () => {
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 300,
      });
    });
    
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <AnimatedTouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface.primary,
          ...theme.shadows.md,
        },
        animatedStyle,
      ]}
      onPress={handlePress}
    >
      <Animated.View
        style={[
          styles.iconContainer,
          {
            backgroundColor: iconColor + '15',
          },
        ]}
      >
        <Feather
          name={icon}
          size={24}
          color={iconColor}
        />
      </Animated.View>
      
      <Animated.View style={styles.content}>
        <Text
          style={[
            styles.title,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.body.medium.fontSize,
              fontWeight: '600',
            },
          ]}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={[
              styles.subtitle,
              {
                color: theme.colors.text.tertiary,
                fontSize: theme.typography.body.small.fontSize,
              },
            ]}
          >
            {subtitle}
          </Text>
        )}
      </Animated.View>
      
      <Feather
        name="chevron-right"
        size={20}
        color={theme.colors.text.tertiary}
      />
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginVertical: 4,
    marginHorizontal: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    marginBottom: 2,
  },
  subtitle: {
    lineHeight: 18,
  },
});
