import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../theme/provider';
import { wp, hp, rf } from '../utils/responsive';

const { width } = Dimensions.get('window');
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

// Mock selfie data
const mockSelfies = [
  {
    id: 1,
    image: 'https://picsum.photos/300/300?random=1',
    likes: 245,
    user: 'Ayşe K.',
    location: 'Kadıköy, İstanbul',
    caption: 'Güzel bir gün!',
    timestamp: '2 saat önce'
  },
  {
    id: 2,
    image: 'https://picsum.photos/300/300?random=2',
    likes: 189,
    user: 'Mehmet D.',
    location: 'Beşiktaş, İstanbul',
    caption: 'Boğaz manzarası 😍',
    timestamp: '4 saat önce'
  },
  {
    id: 3,
    image: 'https://picsum.photos/300/300?random=3',
    likes: 167,
    user: 'Zehra M.',
    location: 'Çankaya, Ankara',
    caption: 'Harika bir akşam',
    timestamp: '6 saat önce'
  },
  {
    id: 4,
    image: 'https://picsum.photos/300/300?random=4',
    likes: 134,
    user: 'Ali R.',
    location: 'Konak, İzmir',
    caption: 'Kordon yürüyüşü',
    timestamp: '8 saat önce'
  },
  {
    id: 5,
    image: 'https://picsum.photos/300/300?random=5',
    likes: 98,
    user: 'Fatma Y.',
    location: 'Muratpaşa, Antalya',
    caption: 'Deniz keyfi ☀️',
    timestamp: '1 gün önce'
  },
  {
    id: 6,
    image: 'https://picsum.photos/300/300?random=6',
    likes: 87,
    user: 'Emre K.',
    location: 'Osmangazi, Bursa',
    caption: 'Yeşil Bursa',
    timestamp: '1 gün önce'
  }
];

export default function Selfie() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [likedSelfies, setLikedSelfies] = useState<number[]>([]);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleLike = (selfieId: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (likedSelfies.includes(selfieId)) {
      setLikedSelfies(likedSelfies.filter(id => id !== selfieId));
    } else {
      setLikedSelfies([...likedSelfies, selfieId]);
    }
  };

  const SelfieCard = ({ selfie }: { selfie: typeof mockSelfies[0] }) => {
    const scale = useSharedValue(1);
    const isLiked = likedSelfies.includes(selfie.id);

    const handlePress = () => {
      scale.value = withSpring(0.98, {}, () => {
        scale.value = withSpring(1);
      });
    };

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    return (
      <AnimatedTouchableOpacity
        style={[
          styles.selfieCard,
          {
            backgroundColor: theme.colors.surface.primary,
            ...theme.shadows.md,
          },
          animatedStyle,
        ]}
        onPress={handlePress}
      >
        <Image source={{ uri: selfie.image }} style={styles.selfieImage} />
        
        <View style={styles.selfieOverlay}>
          <TouchableOpacity
            style={[
              styles.likeButton,
              {
                backgroundColor: isLiked 
                  ? theme.colors.accent.blue + 'DD' 
                  : 'rgba(0,0,0,0.5)',
              },
            ]}
            onPress={() => handleLike(selfie.id)}
          >
            <Ionicons
              name={isLiked ? 'heart' : 'heart-outline'}
              size={rf(20)}
              color={isLiked ? '#FF6B6B' : '#FFFFFF'}
            />
            <Text
              style={[
                styles.likeCount,
                {
                  color: '#FFFFFF',
                  fontSize: theme.typography.caption.fontSize,
                },
              ]}
            >
              {selfie.likes + (isLiked ? 1 : 0)}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.selfieInfo}>
          <Text
            style={[
              styles.selfieUser,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.body.medium.fontSize,
                fontWeight: '600',
              },
            ]}
          >
            {selfie.user}
          </Text>
          <Text
            style={[
              styles.selfieLocation,
              {
                color: theme.colors.text.tertiary,
                fontSize: theme.typography.body.small.fontSize,
              },
            ]}
          >
            {selfie.location}
          </Text>
          <Text
            style={[
              styles.selfieCaption,
              {
                color: theme.colors.text.secondary,
                fontSize: theme.typography.body.small.fontSize,
              },
            ]}
          >
            {selfie.caption}
          </Text>
          <Text
            style={[
              styles.selfieTime,
              {
                color: theme.colors.text.tertiary,
                fontSize: theme.typography.caption.fontSize,
              },
            ]}
          >
            {selfie.timestamp}
          </Text>
        </View>
      </AnimatedTouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme.colors.background.gradient}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Header */}
      <View
        style={[
          styles.header,
          { 
            paddingTop: insets.top + 16,
            backgroundColor: 'transparent'
          }
        ]}
      >
        <TouchableOpacity
          style={[
            styles.backButton,
            {
              backgroundColor: theme.colors.surface.primary,
              ...theme.shadows.sm,
            },
          ]}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={rf(24)}
            color={theme.colors.text.primary}
          />
        </TouchableOpacity>
        
        <Text
          style={[
            styles.headerTitle,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.heading.h2.fontSize,
              fontWeight: theme.typography.heading.h2.fontWeight,
            },
          ]}
        >
          En Beğenilen Selfieler
        </Text>
        
        <TouchableOpacity
          style={[
            styles.addButton,
            {
              backgroundColor: theme.colors.accent.blue,
              ...theme.shadows.sm,
            },
          ]}
        >
          <Ionicons
            name="camera"
            size={rf(20)}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 120 }
        ]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {mockSelfies.map((selfie) => (
          <SelfieCard key={selfie.id} selfie={selfie} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingBottom: hp(2),
  },
  backButton: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: wp(4),
  },
  addButton: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: wp(4),
    gap: hp(2),
  },
  selfieCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: hp(1),
  },
  selfieImage: {
    width: '100%',
    height: hp(25),
    resizeMode: 'cover',
  },
  selfieOverlay: {
    position: 'absolute',
    top: wp(3),
    right: wp(3),
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.8),
    borderRadius: 20,
    gap: wp(1),
  },
  likeCount: {
    fontWeight: '600',
  },
  selfieInfo: {
    padding: wp(4),
  },
  selfieUser: {
    marginBottom: hp(0.5),
  },
  selfieLocation: {
    marginBottom: hp(1),
  },
  selfieCaption: {
    marginBottom: hp(1),
    lineHeight: rf(18),
  },
  selfieTime: {},
});
