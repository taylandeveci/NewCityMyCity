import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../theme/provider';

interface FilterChipProps {
  title: string;
  isSelected: boolean;
  onPress: () => void;
  icon?: string;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const FilterChip: React.FC<FilterChipProps> = ({
  title,
  isSelected,
  onPress,
}) => {
  const theme = useTheme();
  const scale = useSharedValue(1);
  const glow = useSharedValue(isSelected ? 1 : 0);

  React.useEffect(() => {
    glow.value = withSpring(isSelected ? 1 : 0, {
      damping: 15,
      stiffness: 200,
    });
  }, [isSelected]);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    scale.value = withSpring(0.95, {
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

  const glowStyle = useAnimatedStyle(() => {
    return {
      shadowOpacity: glow.value * 0.6,
      shadowRadius: glow.value * 12,
    };
  });

  return (
    <AnimatedTouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isSelected 
            ? theme.colors.accent.blue + '20' 
            : theme.colors.surface.secondary,
          borderColor: isSelected 
            ? theme.colors.accent.blue 
            : 'transparent',
          shadowColor: theme.colors.accent.blue,
        },
        animatedStyle,
        glowStyle,
      ]}
      onPress={handlePress}
    >
      <Text
        style={[
          styles.title,
          {
            color: isSelected 
              ? theme.colors.accent.blue 
              : theme.colors.text.secondary,
            fontSize: theme.typography.body.small.fontSize,
            fontWeight: isSelected ? '600' : '400',
          },
        ]}
      >
        {title}
      </Text>
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  title: {
    textAlign: 'center',
  },
});
