import React from 'react';
import { Platform, ScrollView, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';
import { colors } from '../../theme/tokens';

interface ScreenContainerProps {
  children: React.ReactNode;
  scroll?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

export function ScreenContainer({ 
  children, 
  scroll = true, 
  style, 
  contentContainerStyle 
}: ScreenContainerProps) {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  // If the screen has a transparent header, we need to push content down.
  // Otherwise the value is safe to keep (it will just be the default header height).
  const TOP = headerHeight + (Platform.OS === 'ios' ? 0 : insets.top);

  if (scroll) {
    return (
      <ScrollView
        style={[
          { flex: 1, backgroundColor: colors.background.primary }, 
          style
        ]}
        contentContainerStyle={[
          { 
            paddingTop: TOP, 
            paddingBottom: insets.bottom + 16 
          }, 
          contentContainerStyle
        ]}
        contentInsetAdjustmentBehavior="never"
        scrollIndicatorInsets={{ 
          top: TOP, 
          bottom: insets.bottom 
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View 
      style={[
        { 
          flex: 1, 
          backgroundColor: colors.background.primary, 
          paddingTop: TOP, 
          paddingBottom: insets.bottom + 16 
        }, 
        style
      ]}
    >
      {children}
    </View>
  );
}
