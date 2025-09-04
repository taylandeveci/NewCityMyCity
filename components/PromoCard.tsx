import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../theme/provider';

interface PromoCardProps {
  title: string;
  description: string;
  ctaText: string;
  onPress: () => void;
  gradientColors?: readonly [string, string, ...string[]];
  imageUrl?: string;
}

const { width } = Dimensions.get('window');
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const PromoCard: React.FC<PromoCardProps> = ({
  title,
  description,
  ctaText,
  onPress,
  gradientColors,
}) => {
  const theme = useTheme();
  const scale = useSharedValue(1);

  const colors = gradientColors || [
    theme.colors.primary[700],
    theme.colors.accent.blue,
    theme.colors.accent.purple,
  ] as const;

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    scale.value = withSpring(0.97, {
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
          ...theme.shadows.lg,
        },
        animatedStyle,
      ]}
      onPress={handlePress}
    >
      <LinearGradient
        colors={colors}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View style={styles.content}>
          <Animated.View style={styles.textContainer}>
            <Text
              style={[
                styles.title,
                {
                  color: theme.colors.text.primary,
                  fontSize: theme.typography.heading.h4.fontSize,
                  fontWeight: theme.typography.heading.h4.fontWeight,
                },
              ]}
            >
              {title}
            </Text>
            <Text
              style={[
                styles.description,
                {
                  color: theme.colors.text.secondary,
                  fontSize: theme.typography.body.medium.fontSize,
                },
              ]}
            >
              {description}
            </Text>
          </Animated.View>
          
          <Animated.View
            style={[
              styles.ctaButton,
              {
                backgroundColor: theme.colors.text.primary + '20',
                borderColor: theme.colors.text.primary + '30',
              },
            ]}
          >
            <Text
              style={[
                styles.ctaText,
                {
                  color: theme.colors.text.primary,
                  fontSize: theme.typography.body.small.fontSize,
                  fontWeight: '600',
                },
              ]}
            >
              {ctaText}
            </Text>
          </Animated.View>
        </Animated.View>
        
        {/* Decorative elements */}
        <Animated.View style={styles.decorativeElements}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.decorativeCircle,
                {
                  backgroundColor: theme.colors.text.primary + '10',
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 80 + 10}%`,
                  width: Math.random() * 20 + 10,
                  height: Math.random() * 20 + 10,
                },
              ]}
            />
          ))}
        </Animated.View>
      </LinearGradient>
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 24,
    overflow: 'hidden',
  },
  gradient: {
    padding: 20,
    minHeight: 140,
    position: 'relative',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    zIndex: 2,
  },
  textContainer: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 8,
    lineHeight: 28,
  },
  description: {
    lineHeight: 22,
    opacity: 0.9,
  },
  ctaButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
  },
  ctaText: {
    textAlign: 'center',
  },
  decorativeElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  decorativeCircle: {
    position: 'absolute',
    borderRadius: 50,
    opacity: 0.3,
  },
});
