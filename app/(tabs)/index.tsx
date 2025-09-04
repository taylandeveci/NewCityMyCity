import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  RefreshControl,
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
import { InfoCard } from '../../components/InfoCard';
import { FilterChip } from '../../components/FilterChip';
import { PromoCard } from '../../components/PromoCard';
import { ComplaintCard } from '../../components/ComplaintCard';
import { useTheme } from '../../theme/provider';
import { user, categories, complaints } from '../../data/mock';

const { width, height } = Dimensions.get('window');
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function Home() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('all');
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

  const filteredComplaints = selectedCategory === 'all' 
    ? complaints.slice(0, 3)
    : complaints.filter(c => c.category === selectedCategory).slice(0, 3);

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
            <View
              style={[
                styles.profilePill,
                {
                  backgroundColor: theme.colors.surface.primary,
                  ...theme.shadows.md,
                },
              ]}
            >
              <Text
                style={[
                  styles.profileText,
                  {
                    color: theme.colors.text.primary,
                    fontSize: theme.typography.body.small.fontSize,
                    fontWeight: '600',
                  },
                ]}
              >
                {user.useAlias ? user.alias : user.name}
              </Text>
            </View>
            
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
                {user.points} Points
              </Text>
            </View>
          </View>
          
          <Text
            style={[
              styles.greeting,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.heading.h2.fontSize,
                fontWeight: theme.typography.heading.h2.fontWeight,
              },
            ]}
          >
            How can we improve your city today?
          </Text>
          
          <Text
            style={[
              styles.subGreeting,
              {
                color: theme.colors.text.tertiary,
                fontSize: theme.typography.body.medium.fontSize,
              },
            ]}
          >
            Report issues, track progress, join your community
          </Text>
        </Animated.View>

        {/* Main CTA */}
        <View style={styles.ctaContainer}>
          <GlowingCTA
            title="Report Issue"
            onPress={() => router.push('/complaint/new')}
          />
        </View>

        {/* Map Preview */}
        <MapPreviewCard
          onPress={() => router.push('/map')}
          title="Explore Map"
          subtitle="See all reports in your area"
        />

        {/* Quick Actions */}
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
            Quick Actions
          </Text>
          
          <InfoCard
            title="My Reports"
            subtitle="Track your submitted complaints"
            icon="file-text"
            onPress={() => router.push('/reports')}
            color={theme.colors.accent.blue}
          />
          
          <InfoCard
            title="Nearby Issues"
            subtitle="See what's happening around you"
            icon="map-pin"
            onPress={() => router.push('/map')}
            color={theme.colors.status.inReview}
          />
          
          <InfoCard
            title="Join a Club"
            subtitle="Connect with community groups"
            icon="users"
            onPress={() => router.push('/community')}
            color={theme.colors.status.resolved}
          />
        </View>

        {/* Filters */}
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
            Browse by Category
          </Text>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
          >
            {categories.map((category) => (
              <FilterChip
                key={category.id}
                title={category.name}
                isSelected={selectedCategory === category.id}
                onPress={() => setSelectedCategory(category.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Promo Card */}
        <PromoCard
          title="Clean Beach Week"
          description="Join the city-wide initiative to keep our beaches clean and beautiful"
          ctaText="Learn More"
          onPress={() => {}}
          gradientColors={[theme.colors.status.resolved, theme.colors.accent.blue]}
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
            {selectedCategory === 'all' ? 'Recent Reports' : `Recent ${categories.find(c => c.id === selectedCategory)?.name} Reports`}
          </Text>
          
          {filteredComplaints.map((complaint) => (
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
            This week's activity
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
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  profilePill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  profileText: {},
  pointsPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  pointsText: {},
  greeting: {
    marginBottom: 8,
    lineHeight: 36,
  },
  subGreeting: {
    lineHeight: 22,
  },
  ctaContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  filterRow: {
    paddingHorizontal: 16,
  },
  weeklyActivity: {
    alignItems: 'center',
    marginVertical: 24,
  },
  weeklyTitle: {
    marginBottom: 8,
  },
  weeklyDots: {
    flexDirection: 'row',
    gap: 8,
  },
  weeklyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
