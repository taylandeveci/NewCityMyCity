import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../theme/provider';
import { wp, hp, rf } from '../utils/responsive';

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
          size={rf(24)}
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
        size={rf(20)}
        color={theme.colors.text.tertiary}
      />
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(4),
    borderRadius: wp(4),
    marginVertical: hp(0.5),
    marginHorizontal: wp(4),
  },
  iconContainer: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  content: {
    flex: 1,
  },
  title: {
    marginBottom: hp(0.25),
    fontSize: rf(16),
  },
  subtitle: {
    lineHeight: rf(18),
    fontSize: rf(14),
  },
});
