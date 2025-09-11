import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withSequence } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../theme/provider';
import { wp, hp, rf } from '../utils/responsive';

interface GlowingCTAProps {
  title: string;
  onPress: () => void;
  size?: 'large' | 'medium' | 'small' | 'custom';
  variant?: 'primary' | 'secondary';
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const GlowingCTA: React.FC<GlowingCTAProps> = ({
  title,
  onPress,
  size = 'large',
  variant = 'primary',
}) => {
  const theme = useTheme();
  const scale = useSharedValue(1);
  const glow = useSharedValue(1);

  const sizes = {
    large: { width: wp(50), height: wp(50), fontSize: rf(18) },
    custom: { width: wp(37.5), height: wp(37.5), fontSize: rf(16) }, // 75% of large size
    medium: { width: wp(30), height: wp(30), fontSize: rf(16) },
    small: { width: wp(20), height: wp(20), fontSize: rf(14) },
  };

  const currentSize = sizes[size];

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    
    scale.value = withSequence(
      withSpring(0.95, { damping: 15, stiffness: 300 }),
      withSpring(1, { damping: 15, stiffness: 300 })
    );
    
    glow.value = withSequence(
      withSpring(1.5, { damping: 10, stiffness: 200 }),
      withSpring(1, { damping: 15, stiffness: 100 })
    );
    
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const glowStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: glow.value }],
      opacity: 0.6 / glow.value,
    };
  });

  const gradientColors = variant === 'primary' 
    ? theme.colors.accent.gradient
    : [theme.colors.surface.secondary, theme.colors.surface.tertiary] as const;

  return (
    <AnimatedTouchableOpacity
      style={[
        styles.container,
        {
          width: currentSize.width,
          height: currentSize.height,
        },
        animatedStyle,
      ]}
      onPress={handlePress}
    >
      {/* Glow effect */}
      <Animated.View
        style={[
          styles.glowEffect,
          {
            width: currentSize.width + wp(10),
            height: currentSize.height + wp(10),
            borderRadius: (currentSize.width + 40) / 2,
            backgroundColor: theme.colors.glow.accent,
          },
          glowStyle,
        ]}
      />
      
      {/* Main button */}
      <LinearGradient
        colors={gradientColors}
        style={[
          styles.button,
          {
            width: currentSize.width,
            height: currentSize.height,
            borderRadius: currentSize.width / 2,
          },
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text
          style={[
            styles.title,
            {
              fontSize: currentSize.fontSize,
              color: theme.colors.text.primary,
              fontWeight: theme.typography.button.fontWeight,
            },
          ]}
        >
          {title}
        </Text>
      </LinearGradient>
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowEffect: {
    position: 'absolute',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  title: {
    textAlign: 'center',
    paddingHorizontal: wp(4),
  },
});
