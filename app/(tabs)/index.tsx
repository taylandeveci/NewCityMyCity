import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';
import { GlowingCTA } from '../../components/GlowingCTA';
import { MapPreviewCard } from '../../components/MapPreviewCard';
import { wp, hp, rf, deviceValue, isTablet } from '../../utils/responsive';
import { ComplaintCard } from '../../components/ComplaintCard';
import { useTheme } from '../../theme/provider';
import { user, complaints } from '../../data/mock';

const { width, height } = Dimensions.get('window');
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function Home() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 100], [1, 0.8]);
    const translateY = interpolate(scrollY.value, [0, 100], [0, -10]);

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const recentComplaints = complaints.slice(0, 3);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme.colors.background.gradient}
        style={StyleSheet.absoluteFillObject}
      />
      
      <AnimatedScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 16, paddingBottom: 120 }
        ]}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <Animated.View style={[styles.header, headerStyle]}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={[
                styles.profileButton,
                {
                  backgroundColor: theme.colors.surface.primary,
                  ...theme.shadows.md,
                },
              ]}
              onPress={() => router.push('/(tabs)/profile')}
            >
              <Image
                source={{ uri: user.avatar }}
                style={styles.profileAvatar}
              />
            </TouchableOpacity>
            
            <View
              style={[
                styles.pointsPill,
                {
                  backgroundColor: theme.colors.accent.blue + '20',
                  borderColor: theme.colors.accent.blue + '30',
                },
              ]}
            >
              <Text
                style={[
                  styles.pointsText,
                  {
                    color: theme.colors.accent.blue,
                    fontSize: theme.typography.body.small.fontSize,
                    fontWeight: '600',
                  },
                ]}
              >
                {user.points} Puan
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Main CTA */}
        <View style={styles.ctaContainer}>
          <GlowingCTA
            title="Sorun Bildir"
            onPress={() => router.push('/complaint/new')}
            size="custom"
          />
        </View>

        {/* Motivational Text */}
        <View style={styles.motivationContainer}>
          <Text
            style={[
              styles.greeting,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.heading.h2.fontSize,
                fontWeight: theme.typography.heading.h2.fontWeight,
                textAlign: 'left',
              },
            ]}
          >
            Bugün şehrinizi nasıl geliştirebiliriz?
          </Text>
        </View>

        {/* Map Preview */}
        <MapPreviewCard
          onPress={() => router.push('/map')}
          title="Haritayı Keşfet"
          subtitle="Bölgenizdeki tüm raporları görün"
        />

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.heading.h4.fontSize,
                fontWeight: theme.typography.heading.h4.fontWeight,
              },
            ]}
          >
            Son Raporlar
          </Text>
          
          {recentComplaints.map((complaint) => (
            <ComplaintCard
              key={complaint.id}
              complaint={complaint}
              onPress={() => router.push(`/complaint/${complaint.id}`)}
            />
          ))}
        </View>

        {/* Weekly Activity Indicator */}
        <View style={styles.weeklyActivity}>
          <Text
            style={[
              styles.weeklyTitle,
              {
                color: theme.colors.text.secondary,
                fontSize: theme.typography.body.small.fontSize,
              },
            ]}
          >
            Bu haftanın aktivitesi
          </Text>
          <View style={styles.weeklyDots}>
            {Array.from({ length: 7 }).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.weeklyDot,
                  {
                    backgroundColor: index < user.streak 
                      ? theme.colors.accent.blue 
                      : theme.colors.surface.secondary,
                  },
                ]}
              />
            ))}
          </View>
        </View>
      </AnimatedScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: wp(4),
    marginBottom: hp(3.5),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  profilePill: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderRadius: wp(5),
  },
  profileText: {
    fontSize: rf(14),
  },
  pointsPill: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderRadius: wp(5),
    borderWidth: 1,
  },
  pointsText: {
    fontSize: rf(14),
  },
  greeting: {
    marginBottom: hp(1),
    lineHeight: rf(36),
    fontSize: rf(28),
  },
  ctaContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(6),
    paddingVertical: hp(1),
  },
  motivationContainer: {
    paddingHorizontal: wp(4),
    marginBottom: hp(4),
  },
  section: {
    marginVertical: hp(2.5),
  },
  sectionTitle: {
    marginHorizontal: wp(4),
    marginBottom: hp(1.5),
    fontSize: rf(18),
  },
  weeklyActivity: {
    alignItems: 'center',
    marginVertical: hp(3),
  },
  weeklyTitle: {
    marginBottom: hp(1),
    fontSize: rf(16),
  },
  weeklyDots: {
    flexDirection: 'row',
    gap: wp(2),
  },
  weeklyDot: {
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
  },
  profileButton: {
    padding: wp(2),
    borderRadius: wp(8),
  },
  profileAvatar: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
  },
});
