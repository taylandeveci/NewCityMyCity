import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/provider';

interface MapPreviewCardProps {
  onPress: () => void;
  title?: string;
  subtitle?: string;
}

const { width } = Dimensions.get('window');
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const MapPreviewCard: React.FC<MapPreviewCardProps> = ({
  onPress,
  title = "View Map",
  subtitle = "See all reports in your area",
}) => {
  const theme = useTheme();
  const scale = useSharedValue(1);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    scale.value = withSpring(0.98, {
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
          ...theme.shadows.lg,
        },
        animatedStyle,
      ]}
      onPress={handlePress}
    >
      <LinearGradient
        colors={[theme.colors.primary[800], theme.colors.primary[600]]}
        style={styles.mapPreview}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Map dots pattern */}
        <Animated.View style={styles.mapDots}>
          {Array.from({ length: 15 }).map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor: theme.colors.accent.blue,
                  left: `${Math.random() * 80}%`,
                  top: `${Math.random() * 80}%`,
                  opacity: Math.random() * 0.8 + 0.2,
                },
              ]}
            />
          ))}
        </Animated.View>
        
        {/* Grid lines */}
        <Animated.View style={styles.gridLines}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Animated.View
              key={`h-${index}`}
              style={[
                styles.gridLine,
                styles.horizontalLine,
                {
                  backgroundColor: theme.colors.text.tertiary,
                  top: `${(index + 1) * 20}%`,
                },
              ]}
            />
          ))}
          {Array.from({ length: 5 }).map((_, index) => (
            <Animated.View
              key={`v-${index}`}
              style={[
                styles.gridLine,
                styles.verticalLine,
                {
                  backgroundColor: theme.colors.text.tertiary,
                  left: `${(index + 1) * 20}%`,
                },
              ]}
            />
          ))}
        </Animated.View>
      </LinearGradient>
      
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
              styles.subtitle,
              {
                color: theme.colors.text.tertiary,
                fontSize: theme.typography.body.small.fontSize,
              },
            ]}
          >
            {subtitle}
          </Text>
        </Animated.View>
        
        <Feather
          name="arrow-right"
          size={24}
          color={theme.colors.accent.blue}
        />
      </Animated.View>
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  mapPreview: {
    height: 120,
    position: 'relative',
  },
  mapDots: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  dot: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  gridLines: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  gridLine: {
    position: 'absolute',
    opacity: 0.1,
  },
  horizontalLine: {
    width: '100%',
    height: 1,
  },
  verticalLine: {
    height: '100%',
    width: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    lineHeight: 18,
  },
});
