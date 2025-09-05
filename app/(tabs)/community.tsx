import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { FilterChip } from '../../components/FilterChip';
import { PromoCard } from '../../components/PromoCard';
import { useTheme } from '../../theme/provider';
import { clubs, friends } from '../../data/mock';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function Community() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState('clubs');
  const [refreshing, setRefreshing] = useState(false);

  const tabs = [
    { id: 'institutions', name: 'Kurumlar' },
    { id: 'clubs', name: 'Kulüpler' },
    { id: 'friends', name: 'Arkadaşlar' },
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const ClubCard = ({ club }: { club: typeof clubs[0] }) => {
    const scale = useSharedValue(1);

    const handlePress = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      scale.value = withSpring(0.97, {}, () => {
        scale.value = withSpring(1);
      });
    };

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    return (
      <AnimatedTouchableOpacity
        style={[
          styles.clubCard,
          {
            backgroundColor: theme.colors.surface.primary,
            ...theme.shadows.md,
          },
          animatedStyle,
        ]}
        onPress={handlePress}
      >
        <Image source={{ uri: club.image }} style={styles.clubImage} />
        <View style={styles.clubContent}>
          <Text
            style={[
              styles.clubName,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.body.medium.fontSize,
                fontWeight: '600',
              },
            ]}
          >
            {club.name}
          </Text>
          <Text
            style={[
              styles.clubDescription,
              {
                color: theme.colors.text.tertiary,
                fontSize: theme.typography.body.small.fontSize,
              },
            ]}
            numberOfLines={2}
          >
            {club.description}
          </Text>
          <View style={styles.clubFooter}>
            <Text
              style={[
                styles.memberCount,
                {
                  color: theme.colors.accent.blue,
                  fontSize: theme.typography.caption.fontSize,
                  fontWeight: '600',
                },
              ]}
            >
              {club.memberCount} members
            </Text>
            <TouchableOpacity
              style={[
                styles.joinButton,
                {
                  backgroundColor: theme.colors.accent.blue + '20',
                  borderColor: theme.colors.accent.blue + '40',
                },
              ]}
            >
              <Text
                style={[
                  styles.joinButtonText,
                  {
                    color: theme.colors.accent.blue,
                    fontSize: theme.typography.caption.fontSize,
                    fontWeight: '600',
                  },
                ]}
              >
                Join
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </AnimatedTouchableOpacity>
    );
  };

  const FriendCard = ({ friend }: { friend: typeof friends[0] }) => {
    const scale = useSharedValue(1);

    const handlePress = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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
          styles.friendCard,
          {
            backgroundColor: theme.colors.surface.primary,
            ...theme.shadows.md,
          },
          animatedStyle,
        ]}
        onPress={handlePress}
      >
        <Image source={{ uri: friend.avatar }} style={styles.friendAvatar} />
        <View style={styles.friendContent}>
          <View style={styles.friendHeader}>
            <Text
              style={[
                styles.friendName,
                {
                  color: theme.colors.text.primary,
                  fontSize: theme.typography.body.medium.fontSize,
                  fontWeight: '600',
                },
              ]}
            >
              {friend.name}
            </Text>
            <Text
              style={[
                styles.reportCount,
                {
                  color: theme.colors.accent.blue,
                  fontSize: theme.typography.caption.fontSize,
                  fontWeight: '600',
                },
              ]}
            >
              {friend.reportCount} reports
            </Text>
          </View>
          <Text
            style={[
              styles.friendActivity,
              {
                color: theme.colors.text.tertiary,
                fontSize: theme.typography.body.small.fontSize,
              },
            ]}
            numberOfLines={2}
          >
            {friend.recentActivity}
          </Text>
        </View>
        <Feather
          name="user-plus"
          size={20}
          color={theme.colors.text.tertiary}
        />
      </AnimatedTouchableOpacity>
    );
  };

  const InstitutionCard = ({ title, subtitle, onPress }: { title: string; subtitle: string; onPress: () => void }) => {
    const scale = useSharedValue(1);

    const handlePress = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      scale.value = withSpring(0.98, {}, () => {
        scale.value = withSpring(1);
      });
      onPress();
    };

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    return (
      <AnimatedTouchableOpacity
        style={[
          styles.institutionCard,
          {
            backgroundColor: theme.colors.surface.primary,
            ...theme.shadows.md,
          },
          animatedStyle,
        ]}
        onPress={handlePress}
      >
        <View
          style={[
            styles.institutionIcon,
            {
              backgroundColor: theme.colors.accent.blue + '20',
            },
          ]}
        >
          <Feather
            name="home"
            size={24}
            color={theme.colors.accent.blue}
          />
        </View>
        <View style={styles.institutionContent}>
          <Text
            style={[
              styles.institutionTitle,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.body.medium.fontSize,
                fontWeight: '600',
              },
            ]}
          >
            {title}
          </Text>
          <Text
            style={[
              styles.institutionSubtitle,
              {
                color: theme.colors.text.tertiary,
                fontSize: theme.typography.body.small.fontSize,
              },
            ]}
          >
            {subtitle}
          </Text>
        </View>
        <Feather
          name="chevron-right"
          size={20}
          color={theme.colors.text.tertiary}
        />
      </AnimatedTouchableOpacity>
    );
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'institutions':
        return (
          <View style={styles.content}>
            <InstitutionCard
              title="Istanbul Metropolitan Municipality"
              subtitle="City-wide services and infrastructure"
              onPress={() => {}}
            />
            <InstitutionCard
              title="Beyoğlu Municipality"
              subtitle="Local district services"
              onPress={() => {}}
            />
            <InstitutionCard
              title="Istanbul Electric Distribution"
              subtitle="Power and electrical services"
              onPress={() => {}}
            />
            <InstitutionCard
              title="Istanbul Water Authority"
              subtitle="Water and sewage services"
              onPress={() => {}}
            />
          </View>
        );
      case 'clubs':
        return (
          <View style={styles.content}>
            {clubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </View>
        );
      case 'friends':
        return (
          <View style={styles.content}>
            {friends.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme.colors.background.gradient}
        style={StyleSheet.absoluteFillObject}
      />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 16, paddingBottom: 120 }
        ]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text
            style={[
              styles.title,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.heading.h2.fontSize,
                fontWeight: theme.typography.heading.h2.fontWeight,
              },
            ]}
          >
            Community
          </Text>
          
          <Text
            style={[
              styles.subtitle,
              {
                color: theme.colors.text.tertiary,
                fontSize: theme.typography.body.medium.fontSize,
              },
            ]}
          >
            Connect with institutions, clubs, and fellow citizens
          </Text>
        </View>

        {/* Tab Selector */}
        <View style={styles.section}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabRow}
          >
            {tabs.map((tab) => (
              <FilterChip
                key={tab.id}
                title={tab.name}
                isSelected={selectedTab === tab.id}
                onPress={() => setSelectedTab(tab.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Campaign Promo */}
        {selectedTab === 'clubs' && (
          <PromoCard
            title="Join the Movement"
            description="Become part of community initiatives that make a real difference"
            ctaText="Explore Clubs"
            onPress={() => {}}
            gradientColors={[theme.colors.status.resolved, theme.colors.accent.blue]}
          />
        )}

        {/* Content */}
        {renderContent()}
      </ScrollView>
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
  title: {
    marginBottom: 8,
  },
  subtitle: {
    lineHeight: 22,
  },
  section: {
    marginVertical: 8,
  },
  tabRow: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  content: {
    marginTop: 8,
  },
  // Club Card Styles
  clubCard: {
    borderRadius: 16,
    margin: 16,
    overflow: 'hidden',
  },
  clubImage: {
    width: '100%',
    height: 120,
  },
  clubContent: {
    padding: 16,
  },
  clubName: {
    marginBottom: 8,
  },
  clubDescription: {
    marginBottom: 12,
    lineHeight: 20,
  },
  clubFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memberCount: {},
  joinButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  joinButtonText: {},
  // Friend Card Styles
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 16,
  },
  friendAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  friendContent: {
    flex: 1,
  },
  friendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  friendName: {},
  reportCount: {},
  friendActivity: {
    lineHeight: 18,
  },
  // Institution Card Styles
  institutionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 16,
  },
  institutionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  institutionContent: {
    flex: 1,
  },
  institutionTitle: {
    marginBottom: 4,
  },
  institutionSubtitle: {
    lineHeight: 18,
  },
});
