import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withSequence } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../theme/provider';
import { StatusPill } from './StatusPill';
import { wp, hp, rf } from '../utils/responsive';
import { Complaint } from '../data/mock';

interface ComplaintCardProps {
  complaint: Complaint;
  onPress: () => void;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const ComplaintCard: React.FC<ComplaintCardProps> = ({
  complaint,
  onPress,
}) => {
  const theme = useTheme();
  const scale = useSharedValue(1);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    scale.value = withSpring(0.98, {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
      {complaint.images.length > 0 && (
        <Image
          source={{ uri: complaint.images[0] }}
          style={styles.thumbnail}
        />
      )}
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            style={[
              styles.title,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.body.medium.fontSize,
                fontWeight: '600',
              },
            ]}
            numberOfLines={2}
          >
            {complaint.title}
          </Text>
          <StatusPill status={complaint.status} />
        </View>
        
        <Text
          style={[
            styles.address,
            {
              color: theme.colors.text.tertiary,
              fontSize: theme.typography.body.small.fontSize,
            },
          ]}
          numberOfLines={1}
        >
          {complaint.address}
        </Text>
        
        <View style={styles.footer}>
          <Text
            style={[
              styles.date,
              {
                color: theme.colors.text.tertiary,
                fontSize: theme.typography.caption.fontSize,
              },
            ]}
          >
            {formatDate(complaint.createdAt)}
          </Text>
          
          <Text
            style={[
              styles.reference,
              {
                color: theme.colors.text.tertiary,
                fontSize: theme.typography.caption.fontSize,
              },
            ]}
          >
            {complaint.referenceNumber}
          </Text>
        </View>
        
        {/* Progress bar */}
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
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: wp(4),
    padding: wp(4),
    marginVertical: hp(0.75),
    marginHorizontal: wp(4),
  },
  thumbnail: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(3),
    marginRight: wp(3),
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: hp(1),
  },
  title: {
    flex: 1,
    marginRight: wp(2),
    lineHeight: rf(22),
    fontSize: rf(16),
  },
  address: {
    marginBottom: hp(1),
    lineHeight: rf(18),
    fontSize: rf(14),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  date: {
    fontSize: rf(12),
  },
  reference: {
    fontSize: rf(12),
  },
  progressBarContainer: {
    height: hp(0.4),
    borderRadius: wp(0.5),
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: wp(0.5),
  },
});
