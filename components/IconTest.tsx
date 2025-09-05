import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/provider';
import { wp, hp, rf } from '../utils/responsive';
import { UniversalIcon, SimpleIcon } from '../components';

export const IconTest: React.FC = () => {
  const theme = useTheme();
  
  const testIcons = [
    'home', 'map', 'reports', 'community', 'add', 'location', 
    'camera', 'search', 'filter', 'settings', 'notifications', 
    'profile', 'back', 'forward', 'close', 'check', 'edit', 
    'delete', 'share', 'star', 'heart'
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={theme.colors.background.gradient}
        style={styles.gradientContainer}
      >
        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            🎨 Icon Test Gallery
          </Text>
          
          {/* Ionicons Test */}
          <View style={[styles.section, { backgroundColor: theme.colors.surface.primary }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
              Ionicons (Primary)
            </Text>
            <View style={styles.iconGrid}>
              {testIcons.map((iconName) => (
                <View key={`ionicon-${iconName}`} style={styles.iconItem}>
                  <UniversalIcon 
                    name={iconName} 
                    size={rf(24)} 
                    color={theme.colors.accent.blue}
                  />
                  <Text style={[styles.iconLabel, { color: theme.colors.text.secondary }]}>
                    {iconName}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          
          {/* Simple Icons Fallback Test */}
          <View style={[styles.section, { backgroundColor: theme.colors.surface.primary }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
              Simple Icons (Fallback)
            </Text>
            <View style={styles.iconGrid}>
              {testIcons.map((iconName) => (
                <View key={`simple-${iconName}`} style={styles.iconItem}>
                  <SimpleIcon 
                    name={iconName} 
                    size={rf(24)} 
                    color={theme.colors.accent.purple}
                  />
                  <Text style={[styles.iconLabel, { color: theme.colors.text.secondary }]}>
                    {iconName}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          
          {/* Universal Icons with Fallback Enabled */}
          <View style={[styles.section, { backgroundColor: theme.colors.surface.primary }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
              Universal Icons (Fallback Mode)
            </Text>
            <View style={styles.iconGrid}>
              {testIcons.map((iconName) => (
                <View key={`universal-fallback-${iconName}`} style={styles.iconItem}>
                  <UniversalIcon 
                    name={iconName} 
                    size={rf(24)} 
                    color={theme.colors.status.resolved}
                    fallback={true}
                  />
                  <Text style={[styles.iconLabel, { color: theme.colors.text.secondary }]}>
                    {iconName}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          
          {/* Size Test */}
          <View style={[styles.section, { backgroundColor: theme.colors.surface.primary }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
              Icon Size Test
            </Text>
            <View style={styles.sizeRow}>
              <View style={styles.sizeItem}>
                <UniversalIcon name="home" size={rf(16)} color={theme.colors.accent.blue} />
                <Text style={[styles.sizeLabel, { color: theme.colors.text.secondary }]}>16px</Text>
              </View>
              <View style={styles.sizeItem}>
                <UniversalIcon name="home" size={rf(24)} color={theme.colors.accent.blue} />
                <Text style={[styles.sizeLabel, { color: theme.colors.text.secondary }]}>24px</Text>
              </View>
              <View style={styles.sizeItem}>
                <UniversalIcon name="home" size={rf(32)} color={theme.colors.accent.blue} />
                <Text style={[styles.sizeLabel, { color: theme.colors.text.secondary }]}>32px</Text>
              </View>
              <View style={styles.sizeItem}>
                <UniversalIcon name="home" size={rf(48)} color={theme.colors.accent.blue} />
                <Text style={[styles.sizeLabel, { color: theme.colors.text.secondary }]}>48px</Text>
              </View>
            </View>
          </View>
          
          {/* Color Test */}
          <View style={[styles.section, { backgroundColor: theme.colors.surface.primary }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
              Icon Color Test
            </Text>
            <View style={styles.colorRow}>
              <UniversalIcon name="star" size={rf(32)} color={theme.colors.accent.blue} />
              <UniversalIcon name="star" size={rf(32)} color={theme.colors.accent.purple} />
              <UniversalIcon name="star" size={rf(32)} color={theme.colors.status.resolved} />
              <UniversalIcon name="star" size={rf(32)} color={theme.colors.status.inReview} />
              <UniversalIcon name="star" size={rf(32)} color={theme.colors.status.rejected} />
            </View>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientContainer: {
    flex: 1,
  },
  content: {
    padding: wp(4),
    paddingBottom: hp(15),
  },
  title: {
    fontSize: rf(28),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: hp(3),
    marginTop: hp(2),
  },
  section: {
    borderRadius: wp(4),
    padding: wp(4),
    marginBottom: hp(2),
  },
  sectionTitle: {
    fontSize: rf(18),
    fontWeight: '600',
    marginBottom: hp(2),
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  iconItem: {
    alignItems: 'center',
    width: wp(20),
    marginBottom: hp(2),
  },
  iconLabel: {
    fontSize: rf(10),
    marginTop: hp(0.5),
    textAlign: 'center',
  },
  sizeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  sizeItem: {
    alignItems: 'center',
  },
  sizeLabel: {
    fontSize: rf(12),
    marginTop: hp(0.5),
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
