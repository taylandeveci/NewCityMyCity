import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { GlowingCTA } from '../../components/GlowingCTA';
import { ComplaintCard } from '../../components/ComplaintCard';
import { useTheme } from '../../theme/provider';
import { complaints } from '../../data/mock';

const { width, height } = Dimensions.get('window');
const BOTTOM_SHEET_MIN_HEIGHT = 120;
const BOTTOM_SHEET_MAX_HEIGHT = height * 0.7;

export default function Map() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState(complaints[0]);

  const bottomSheetY = useSharedValue(height - BOTTOM_SHEET_MIN_HEIGHT - insets.bottom);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      const newY = bottomSheetY.value + event.translationY;
      const minY = height - BOTTOM_SHEET_MAX_HEIGHT - insets.bottom;
      const maxY = height - BOTTOM_SHEET_MIN_HEIGHT - insets.bottom;
      
      bottomSheetY.value = Math.max(minY, Math.min(maxY, newY));
    })
    .onEnd((event) => {
      const minY = height - BOTTOM_SHEET_MAX_HEIGHT - insets.bottom;
      const maxY = height - BOTTOM_SHEET_MIN_HEIGHT - insets.bottom;
      const midPoint = (minY + maxY) / 2;
      
      if (event.velocityY > 500) {
        bottomSheetY.value = withSpring(maxY);
      } else if (event.velocityY < -500) {
        bottomSheetY.value = withSpring(minY);
      } else if (bottomSheetY.value > midPoint) {
        bottomSheetY.value = withSpring(maxY);
      } else {
        bottomSheetY.value = withSpring(minY);
      }
    });

  const bottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: bottomSheetY.value }],
    };
  });

  const selectPin = (complaint: typeof complaints[0]) => {
    setSelectedComplaint(complaint);
    bottomSheetY.value = withSpring(height - BOTTOM_SHEET_MAX_HEIGHT - insets.bottom);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme.colors.background.gradient}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Map Area */}
      <View style={[styles.mapContainer, { paddingTop: insets.top }]}>
        {/* Mock map with grid and pins */}
        <View style={styles.mapMock}>
          {/* Grid lines */}
          {Array.from({ length: 8 }).map((_, index) => (
            <View
              key={`h-${index}`}
              style={[
                styles.gridLine,
                styles.horizontalGridLine,
                {
                  backgroundColor: theme.colors.text.tertiary + '20',
                  top: `${(index + 1) * 12.5}%`,
                },
              ]}
            />
          ))}
          {Array.from({ length: 6 }).map((_, index) => (
            <View
              key={`v-${index}`}
              style={[
                styles.gridLine,
                styles.verticalGridLine,
                {
                  backgroundColor: theme.colors.text.tertiary + '20',
                  left: `${(index + 1) * 16.66}%`,
                },
              ]}
            />
          ))}
          
          {/* Complaint pins */}
          {complaints.map((complaint, index) => (
            <TouchableOpacity
              key={complaint.id}
              style={[
                styles.pin,
                {
                  backgroundColor: theme.colors.status[complaint.status],
                  left: `${20 + (index * 25)}%`,
                  top: `${30 + (index * 15)}%`,
                  ...theme.shadows.accentGlow,
                },
              ]}
              onPress={() => selectPin(complaint)}
            >
              <Feather
                name="map-pin"
                size={16}
                color={theme.colors.text.primary}
              />
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Search Bar */}
        <View
          style={[
            styles.searchContainer,
            {
              backgroundColor: theme.colors.surface.opacity,
              ...theme.shadows.lg,
            },
          ]}
        >
          <Feather
            name="search"
            size={20}
            color={theme.colors.text.tertiary}
          />
          <TextInput
            style={[
              styles.searchInput,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.body.medium.fontSize,
              },
            ]}
            placeholder="Search address or area..."
            placeholderTextColor={theme.colors.text.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        {/* Floating CTA */}
        <View style={styles.floatingCTA}>
          <GlowingCTA
            title="Report"
            size="small"
            onPress={() => router.push('/complaint/new')}
          />
        </View>
      </View>
      
      {/* Bottom Sheet */}
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            styles.bottomSheet,
            {
              backgroundColor: theme.colors.surface.primary,
              top: height,
            },
            bottomSheetStyle,
          ]}
        >
          {/* Handle */}
          <View
            style={[
              styles.handle,
              {
                backgroundColor: theme.colors.text.tertiary,
              },
            ]}
          />
          
          {/* Content */}
          <View style={styles.bottomSheetContent}>
            {selectedComplaint && (
              <ComplaintCard
                complaint={selectedComplaint}
                onPress={() => router.push(`/complaint/${selectedComplaint.id}`)}
              />
            )}
            
            <View style={styles.nearbySection}>
              <Text
                style={[
                  styles.nearbyTitle,
                  {
                    color: theme.colors.text.primary,
                    fontSize: theme.typography.heading.h4.fontSize,
                    fontWeight: theme.typography.heading.h4.fontWeight,
                  },
                ]}
              >
                Nearby Reports
              </Text>
              
              {complaints.slice(1, 4).map((complaint) => (
                <ComplaintCard
                  key={complaint.id}
                  complaint={complaint}
                  onPress={() => router.push(`/complaint/${complaint.id}`)}
                />
              ))}
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapMock: {
    flex: 1,
    position: 'relative',
  },
  gridLine: {
    position: 'absolute',
  },
  horizontalGridLine: {
    width: '100%',
    height: 1,
  },
  verticalGridLine: {
    height: '100%',
    width: 1,
  },
  pin: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
  },
  floatingCTA: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: BOTTOM_SHEET_MAX_HEIGHT,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    marginTop: 8,
    marginBottom: 16,
  },
  bottomSheetContent: {
    flex: 1,
  },
  nearbySection: {
    marginTop: 16,
  },
  nearbyTitle: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
});
