import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/provider';
import { 
  wp, 
  hp, 
  rf, 
  rs,
  isPhone, 
  isTablet, 
  isDesktop,
  getDeviceType,
  getScreenSize,
  getDimensions,
  deviceValue,
  screenValue
} from '../utils/responsive';

export const ResponsiveDemo: React.FC = () => {
  const theme = useTheme();
  const dimensions = getDimensions();
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={theme.colors.background.gradient}
        style={styles.gradientContainer}
      >
        <View style={styles.content}>
          {/* Header */}
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            📱 Responsive Design Demo
          </Text>
          
          {/* Device Info */}
          <View style={[styles.section, { backgroundColor: theme.colors.surface.primary }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
              Device Information
            </Text>
            <Text style={[styles.infoText, { color: theme.colors.text.secondary }]}>
              Device Type: {getDeviceType()}
            </Text>
            <Text style={[styles.infoText, { color: theme.colors.text.secondary }]}>
              Screen Size: {getScreenSize()}
            </Text>
            <Text style={[styles.infoText, { color: theme.colors.text.secondary }]}>
              Width: {dimensions.window.width}px
            </Text>
            <Text style={[styles.infoText, { color: theme.colors.text.secondary }]}>
              Height: {dimensions.window.height}px
            </Text>
            <Text style={[styles.infoText, { color: theme.colors.text.secondary }]}>
              Orientation: {dimensions.isLandscape ? 'Landscape' : 'Portrait'}
            </Text>
          </View>
          
          {/* Responsive Dimensions Demo */}
          <View style={[styles.section, { backgroundColor: theme.colors.surface.primary }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
              Responsive Dimensions
            </Text>
            
            <View style={styles.demoRow}>
              <View style={[styles.demoBox, { 
                width: wp(20), 
                height: wp(20),
                backgroundColor: theme.colors.accent.blue + '30'
              }]}>
                <Text style={[styles.demoText, { color: theme.colors.text.primary }]}>
                  wp(20)
                </Text>
              </View>
              
              <View style={[styles.demoBox, { 
                width: wp(30), 
                height: wp(20),
                backgroundColor: theme.colors.accent.purple + '30'
              }]}>
                <Text style={[styles.demoText, { color: theme.colors.text.primary }]}>
                  wp(30)
                </Text>
              </View>
              
              <View style={[styles.demoBox, { 
                width: wp(40), 
                height: wp(20),
                backgroundColor: theme.colors.surface.secondary
              }]}>
                <Text style={[styles.demoText, { color: theme.colors.text.primary }]}>
                  wp(40)
                </Text>
              </View>
            </View>
          </View>
          
          {/* Font Size Demo */}
          <View style={[styles.section, { backgroundColor: theme.colors.surface.primary }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
              Responsive Font Sizes
            </Text>
            
            <Text style={[{ fontSize: rf(12), color: theme.colors.text.secondary }]}>
              rf(12) - Small Text
            </Text>
            <Text style={[{ fontSize: rf(16), color: theme.colors.text.secondary }]}>
              rf(16) - Regular Text
            </Text>
            <Text style={[{ fontSize: rf(20), color: theme.colors.text.primary }]}>
              rf(20) - Large Text
            </Text>
            <Text style={[{ fontSize: rf(28), color: theme.colors.text.primary, fontWeight: 'bold' }]}>
              rf(28) - Title
            </Text>
          </View>
          
          {/* Device-Specific Values */}
          <View style={[styles.section, { backgroundColor: theme.colors.surface.primary }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
              Device-Specific Content
            </Text>
            
            <View style={[styles.deviceDemo, {
              backgroundColor: deviceValue({
                PHONE: theme.colors.accent.blue + '20',
                TABLET: theme.colors.accent.purple + '20',
                DESKTOP: theme.colors.surface.tertiary,
                default: theme.colors.surface.secondary
              })
            }]}>
              <Text style={[styles.infoText, { color: theme.colors.text.primary }]}>
                {deviceValue({
                  PHONE: '📱 Phone Layout',
                  TABLET: '📊 Tablet Layout',
                  DESKTOP: '💻 Desktop Layout',
                  default: '🔧 Default Layout'
                })}
              </Text>
            </View>
          </View>
          
          {/* Screen Size Specific */}
          <View style={[styles.section, { backgroundColor: theme.colors.surface.primary }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
              Screen Size Features
            </Text>
            
            <View style={styles.featureGrid}>
              {isPhone() && (
                <View style={[styles.featureCard, { backgroundColor: theme.colors.accent.blue + '20' }]}>
                  <Text style={[styles.featureText, { color: theme.colors.text.primary }]}>
                    📱 Phone Features
                  </Text>
                </View>
              )}
              
              {isTablet() && (
                <View style={[styles.featureCard, { backgroundColor: theme.colors.accent.purple + '20' }]}>
                  <Text style={[styles.featureText, { color: theme.colors.text.primary }]}>
                    📊 Tablet Features
                  </Text>
                </View>
              )}
              
              {isDesktop() && (
                <View style={[styles.featureCard, { backgroundColor: theme.colors.surface.tertiary }]}>
                  <Text style={[styles.featureText, { color: theme.colors.text.primary }]}>
                    💻 Desktop Features
                  </Text>
                </View>
              )}
            </View>
          </View>
          
          {/* Responsive Spacing */}
          <View style={[styles.section, { backgroundColor: theme.colors.surface.primary }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
              Responsive Spacing
            </Text>
            
            <View style={styles.spacingDemo}>
              <View style={[styles.spacingBox, { 
                padding: rs(8),
                backgroundColor: theme.colors.accent.blue + '20'
              }]}>
                <Text style={[styles.demoText, { color: theme.colors.text.primary }]}>
                  rs(8) padding
                </Text>
              </View>
              
              <View style={[styles.spacingBox, { 
                padding: rs(16),
                backgroundColor: theme.colors.accent.purple + '20'
              }]}>
                <Text style={[styles.demoText, { color: theme.colors.text.primary }]}>
                  rs(16) padding
                </Text>
              </View>
              
              <View style={[styles.spacingBox, { 
                padding: rs(24),
                backgroundColor: theme.colors.surface.tertiary
              }]}>
                <Text style={[styles.demoText, { color: theme.colors.text.primary }]}>
                  rs(24) padding
                </Text>
              </View>
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
    paddingBottom: hp(15), // Account for bottom tab
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
  infoText: {
    fontSize: rf(14),
    marginBottom: hp(0.5),
  },
  demoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: hp(1),
  },
  demoBox: {
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  demoText: {
    fontSize: rf(12),
    fontWeight: '500',
  },
  deviceDemo: {
    borderRadius: wp(3),
    padding: wp(4),
    alignItems: 'center',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(2),
  },
  featureCard: {
    borderRadius: wp(3),
    padding: wp(3),
    minWidth: wp(25),
    alignItems: 'center',
  },
  featureText: {
    fontSize: rf(14),
    fontWeight: '500',
  },
  spacingDemo: {
    alignItems: 'center',
    gap: hp(2),
  },
  spacingBox: {
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: wp(30),
  },
});
