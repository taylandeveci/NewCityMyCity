import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { useTheme } from '../theme/provider';
import { TimelineEvent } from '../data/mock';

interface TimelineProps {
  events: TimelineEvent[];
}

export const Timeline: React.FC<TimelineProps> = ({ events }) => {
  const theme = useTheme();

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = (status: TimelineEvent['status']) => {
    switch (status) {
      case 'completed':
        return 'check-circle';
      case 'current':
        return 'clock';
      case 'pending':
        return 'circle';
      default:
        return 'circle';
    }
  };

  const getStatusColor = (status: TimelineEvent['status']) => {
    switch (status) {
      case 'completed':
        return theme.colors.status.resolved;
      case 'current':
        return theme.colors.accent.blue;
      case 'pending':
        return theme.colors.text.tertiary;
      default:
        return theme.colors.text.tertiary;
    }
  };

  return (
    <View style={styles.container}>
      {events.map((event, index) => (
        <View key={event.id} style={styles.eventContainer}>
          {/* Timeline Line */}
          {index < events.length - 1 && (
            <View
              style={[
                styles.timelineLine,
                {
                  backgroundColor: event.status === 'completed'
                    ? theme.colors.status.resolved
                    : theme.colors.surface.tertiary,
                },
              ]}
            />
          )}
          
          {/* Event Content */}
          <View style={styles.eventContent}>
            {/* Icon */}
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: getStatusColor(event.status) + '20',
                  borderColor: getStatusColor(event.status),
                },
              ]}
            >
              <Feather
                name={getStatusIcon(event.status)}
                size={16}
                color={getStatusColor(event.status)}
              />
            </View>
            
            {/* Text Content */}
            <View style={styles.textContent}>
              <View style={styles.eventHeader}>
                <Text
                  style={[
                    styles.eventTitle,
                    {
                      color: theme.colors.text.primary,
                      fontSize: theme.typography.body.medium.fontSize,
                      fontWeight: '600',
                    },
                  ]}
                >
                  {event.title}
                </Text>
                {event.timestamp && (
                  <Text
                    style={[
                      styles.eventTime,
                      {
                        color: theme.colors.text.tertiary,
                        fontSize: theme.typography.caption.fontSize,
                      },
                    ]}
                  >
                    {formatDate(event.timestamp)}
                  </Text>
                )}
              </View>
              
              <Text
                style={[
                  styles.eventDescription,
                  {
                    color: theme.colors.text.tertiary,
                    fontSize: theme.typography.body.small.fontSize,
                  },
                ]}
              >
                {event.description}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  eventContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  timelineLine: {
    position: 'absolute',
    left: 19,
    top: 40,
    width: 2,
    height: 40,
  },
  eventContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContent: {
    flex: 1,
    paddingTop: 2,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  eventTitle: {
    flex: 1,
    marginRight: 8,
  },
  eventTime: {},
  eventDescription: {
    lineHeight: 20,
  },
});
