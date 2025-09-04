import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { StatusPill } from '../../components/StatusPill';
import { Timeline } from '../../components/Timeline';
import { useTheme } from '../../theme/provider';
import { complaints } from '../../data/mock';

const { width } = Dimensions.get('window');
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function ComplaintDetail() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const complaint = complaints.find(c => c.id === id);

  if (!complaint) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: theme.colors.text.primary }}>Complaint not found</Text>
      </View>
    );
  }

  const BackButton = () => {
    const scale = useSharedValue(1);

    const handlePress = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      scale.value = withSpring(0.9, {}, () => {
        scale.value = withSpring(1);
      });
      router.back();
    };

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    return (
      <AnimatedTouchableOpacity
        style={[
          styles.backButton,
          {
            backgroundColor: theme.colors.surface.opacity,
            ...theme.shadows.md,
          },
          animatedStyle,
        ]}
        onPress={handlePress}
      >
        <Feather
          name="arrow-left"
          size={24}
          color={theme.colors.text.primary}
        />
      </AnimatedTouchableOpacity>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme.colors.background.gradient}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Header Image */}
      {complaint.images.length > 0 && (
        <View style={styles.headerImageContainer}>
          <Image
            source={{ uri: complaint.images[0] }}
            style={[
              styles.headerImage,
              { height: 250 + insets.top }
            ]}
          />
          <LinearGradient
            colors={['transparent', 'rgba(10, 16, 36, 0.8)']}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
      )}
      
      {/* Back Button */}
      <View style={[styles.backButtonContainer, { top: insets.top + 16 }]}>
        <BackButton />
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: complaint.images.length > 0 ? 200 + insets.top : insets.top + 80 }
        ]}
      >
        {/* Main Content Card */}
        <View
          style={[
            styles.contentCard,
            {
              backgroundColor: theme.colors.surface.primary,
              ...theme.shadows.lg,
            },
          ]}
        >
          {/* Header */}
          <View style={styles.cardHeader}>
            <View style={styles.titleContainer}>
              <Text
                style={[
                  styles.title,
                  {
                    color: theme.colors.text.primary,
                    fontSize: theme.typography.heading.h3.fontSize,
                    fontWeight: theme.typography.heading.h3.fontWeight,
                  },
                ]}
              >
                {complaint.title}
              </Text>
              <StatusPill status={complaint.status} />
            </View>
            
            <Text
              style={[
                styles.referenceNumber,
                {
                  color: theme.colors.text.tertiary,
                  fontSize: theme.typography.body.small.fontSize,
                },
              ]}
            >
              Reference: {complaint.referenceNumber}
            </Text>
          </View>

          {/* Address and Date */}
          <View style={styles.metaInfo}>
            <View style={styles.metaRow}>
              <Feather
                name="map-pin"
                size={16}
                color={theme.colors.text.tertiary}
              />
              <Text
                style={[
                  styles.metaText,
                  {
                    color: theme.colors.text.secondary,
                    fontSize: theme.typography.body.medium.fontSize,
                  },
                ]}
              >
                {complaint.address}
              </Text>
            </View>
            
            <View style={styles.metaRow}>
              <Feather
                name="calendar"
                size={16}
                color={theme.colors.text.tertiary}
              />
              <Text
                style={[
                  styles.metaText,
                  {
                    color: theme.colors.text.tertiary,
                    fontSize: theme.typography.body.small.fontSize,
                  },
                ]}
              >
                Submitted {formatDate(complaint.createdAt)}
              </Text>
            </View>

            {complaint.institution && (
              <View style={styles.metaRow}>
                <Feather
                  name="home"
                  size={16}
                  color={theme.colors.text.tertiary}
                />
                <Text
                  style={[
                    styles.metaText,
                    {
                      color: theme.colors.text.tertiary,
                      fontSize: theme.typography.body.small.fontSize,
                    },
                  ]}
                >
                  Assigned to {complaint.institution}
                </Text>
              </View>
            )}
          </View>

          {/* Progress Bar */}
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text
                style={[
                  styles.progressLabel,
                  {
                    color: theme.colors.text.secondary,
                    fontSize: theme.typography.body.small.fontSize,
                    fontWeight: '600',
                  },
                ]}
              >
                Progress
              </Text>
              <Text
                style={[
                  styles.progressPercentage,
                  {
                    color: theme.colors.accent.blue,
                    fontSize: theme.typography.body.small.fontSize,
                    fontWeight: '600',
                  },
                ]}
              >
                {complaint.progress}%
              </Text>
            </View>
            
            <View
              style={[
                styles.progressBarContainer,
                {
                  backgroundColor: theme.colors.surface.secondary,
                },
              ]}
            >
              <Animated.View
                style={[
                  styles.progressBar,
                  {
                    backgroundColor: theme.colors.accent.blue,
                    width: `${complaint.progress}%`,
                  },
                ]}
              />
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
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
              Description
            </Text>
            <Text
              style={[
                styles.description,
                {
                  color: theme.colors.text.secondary,
                  fontSize: theme.typography.body.medium.fontSize,
                },
              ]}
            >
              {complaint.description}
            </Text>
          </View>

          {/* Images Gallery */}
          {complaint.images.length > 1 && (
            <View style={styles.gallerySection}>
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
                Photos
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.galleryScroll}
              >
                {complaint.images.slice(1).map((image, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.galleryImage,
                      {
                        backgroundColor: theme.colors.surface.secondary,
                      },
                    ]}
                  >
                    <Image
                      source={{ uri: image }}
                      style={styles.galleryImageContent}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Timeline */}
          <View style={styles.timelineSection}>
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
              Status Timeline
            </Text>
            <Timeline events={complaint.timeline} />
          </View>
        </View>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  headerImage: {
    width: '100%',
  },
  backButtonContainer: {
    position: 'absolute',
    left: 16,
    zIndex: 2,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentCard: {
    marginHorizontal: 16,
    borderRadius: 24,
    padding: 20,
  },
  cardHeader: {
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    marginRight: 12,
    lineHeight: 32,
  },
  referenceNumber: {
    fontFamily: 'monospace',
  },
  metaInfo: {
    marginBottom: 20,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaText: {
    marginLeft: 8,
    flex: 1,
  },
  progressSection: {
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {},
  progressPercentage: {},
  progressBarContainer: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  description: {
    lineHeight: 24,
  },
  gallerySection: {
    marginBottom: 24,
  },
  galleryScroll: {
    paddingRight: 16,
  },
  galleryImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
  },
  galleryImageContent: {
    width: '100%',
    height: '100%',
  },
  timelineSection: {},
});
