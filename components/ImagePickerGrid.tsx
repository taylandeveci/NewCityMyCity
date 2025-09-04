import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../theme/provider';

interface ImagePickerGridProps {
  images: string[];
  onAddImage: () => void;
  onRemoveImage: (index: number) => void;
  maxImages?: number;
}

const { width } = Dimensions.get('window');
const GRID_SPACING = 8;
const GRID_COLUMNS = 3;
const IMAGE_SIZE = (width - 32 - (GRID_SPACING * (GRID_COLUMNS - 1))) / GRID_COLUMNS;

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const ImagePickerGrid: React.FC<ImagePickerGridProps> = ({
  images,
  onAddImage,
  onRemoveImage,
  maxImages = 6,
}) => {
  const theme = useTheme();

  const ImageSlot = ({ image, index, isAddButton }: { image?: string; index: number; isAddButton?: boolean }) => {
    const scale = useSharedValue(1);

    const handlePress = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      
      scale.value = withSpring(0.95, {}, () => {
        scale.value = withSpring(1);
      });

      if (isAddButton) {
        onAddImage();
      } else {
        onRemoveImage(index);
      }
    };

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    return (
      <AnimatedTouchableOpacity
        style={[
          styles.imageSlot,
          {
            width: IMAGE_SIZE,
            height: IMAGE_SIZE,
            backgroundColor: isAddButton 
              ? theme.colors.surface.secondary
              : theme.colors.surface.primary,
            borderColor: isAddButton 
              ? theme.colors.accent.blue + '40'
              : 'transparent',
            borderStyle: isAddButton ? 'dashed' : 'solid',
          },
          animatedStyle,
        ]}
        onPress={handlePress}
      >
        {isAddButton ? (
          <Feather
            name="plus"
            size={24}
            color={theme.colors.accent.blue}
          />
        ) : (
          <>
            {/* Placeholder image representation */}
            <View
              style={[
                styles.imagePlaceholder,
                {
                  backgroundColor: theme.colors.accent.blue + '20',
                },
              ]}
            >
              <Feather
                name="image"
                size={20}
                color={theme.colors.accent.blue}
              />
            </View>
            
            {/* Remove button */}
            <TouchableOpacity
              style={[
                styles.removeButton,
                {
                  backgroundColor: theme.colors.error + 'CC',
                },
              ]}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                onRemoveImage(index);
              }}
            >
              <Feather
                name="x"
                size={12}
                color={theme.colors.text.primary}
              />
            </TouchableOpacity>
          </>
        )}
      </AnimatedTouchableOpacity>
    );
  };

  const renderGrid = () => {
    const slots = [];
    
    // Add existing images
    for (let i = 0; i < images.length; i++) {
      slots.push(
        <ImageSlot
          key={i}
          image={images[i]}
          index={i}
        />
      );
    }
    
    // Add "add" button if under limit
    if (images.length < maxImages) {
      slots.push(
        <ImageSlot
          key="add"
          index={-1}
          isAddButton
        />
      );
    }
    
    return slots;
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {renderGrid()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_SPACING,
  },
  imageSlot: {
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
