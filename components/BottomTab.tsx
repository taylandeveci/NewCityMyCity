import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../theme/provider';
import { wp, hp, rf } from '../utils/responsive';

interface BottomTabProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const BottomTab: React.FC<BottomTabProps> = ({ state, descriptors, navigation }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const getIconName = (routeName: string): keyof typeof Ionicons.glyphMap => {
    switch (routeName) {
      case 'index':
        return 'home-outline';
      case 'map':
        return 'map-outline';
      case 'reports':
        return 'document-text-outline';
      case 'community':
        return 'people-outline';
      default:
        return 'home-outline';
    }
  };

  const handleTabPress = (route: any, isFocused: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    if (!isFocused) {
      navigation.navigate(route.name);
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 8 }]}>
      <BlurView intensity={20} style={styles.blurContainer}>
        <View style={[styles.tabBar, { backgroundColor: theme.colors.surface.opacity }]}>
          {state.routes.map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;
            
            const animatedStyle = useAnimatedStyle(() => {
              return {
                transform: [
                  {
                    scale: withSpring(isFocused ? 1.1 : 1, {
                      damping: 15,
                      stiffness: 150,
                    }),
                  },
                ],
              };
            });

            return (
              <AnimatedTouchableOpacity
                key={route.key}
                style={[
                  styles.tab,
                  animatedStyle,
                  isFocused && {
                    backgroundColor: theme.colors.accent.blue + '20',
                    ...theme.shadows.accentGlow,
                  },
                ]}
                onPress={() => handleTabPress(route, isFocused)}
              >
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={getIconName(route.name)}
                    size={rf(24)}
                    color={isFocused ? theme.colors.accent.blue : theme.colors.text.tertiary}
                  />
                </View>
                <Text
                  style={[
                    styles.label,
                    {
                      color: isFocused ? theme.colors.accent.blue : theme.colors.text.tertiary,
                      fontSize: theme.typography.caption.fontSize,
                      fontWeight: theme.typography.caption.fontWeight,
                    },
                  ]}
                >
                  {options.title}
                </Text>
              </AnimatedTouchableOpacity>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: wp(4),
  },
  blurContainer: {
    borderRadius: wp(6),
    overflow: 'hidden',
  },
  tabBar: {
    flexDirection: 'row',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(2),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1),
    paddingHorizontal: wp(1),
    borderRadius: wp(4),
    minHeight: hp(7),
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(7),
    height: wp(7),
  },
  icon: {
    textAlign: 'center',
  },
  label: {
    marginTop: hp(0.5),
    textAlign: 'center',
    fontSize: rf(10),
  },
});
