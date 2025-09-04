import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { StatusPill } from './StatusPill';
import { useTheme } from '../theme/provider';
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
    borderRadius: 16,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    marginRight: 8,
    lineHeight: 22,
  },
  address: {
    marginBottom: 8,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  date: {},
  reference: {},
  progressBarContainer: {
    height: 3,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
});
