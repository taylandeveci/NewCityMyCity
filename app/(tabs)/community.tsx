import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../theme/provider';
import { user } from '../../data/mock';
import { wp, hp, rf } from '../../utils/responsive';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function Profile() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const SettingsItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    showArrow = true 
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    onPress: () => void;
    showArrow?: boolean;
  }) => {
    const scale = useSharedValue(1);

    const handlePress = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      scale.value = withSpring(0.97, {}, () => {
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
          styles.settingsItem,
          {
            backgroundColor: theme.colors.surface.primary,
            ...theme.shadows.sm,
          },
          animatedStyle,
        ]}
        onPress={handlePress}
      >
        <View style={styles.settingsItemLeft}>
          <View 
            style={[
              styles.settingsIconContainer,
              { backgroundColor: theme.colors.accent.blue + '20' }
            ]}
          >
            <Ionicons
              name={icon as any}
              size={rf(20)}
              color={theme.colors.accent.blue}
            />
          </View>
          <View style={styles.settingsTextContainer}>
            <Text
              style={[
                styles.settingsTitle,
                {
                  color: theme.colors.text.primary,
                  fontSize: theme.typography.body.medium.fontSize,
                  fontWeight: '600',
                },
              ]}
            >
              {title}
            </Text>
            {subtitle && (
              <Text
                style={[
                  styles.settingsSubtitle,
                  {
                    color: theme.colors.text.tertiary,
                    fontSize: theme.typography.body.small.fontSize,
                  },
                ]}
              >
                {subtitle}
              </Text>
            )}
          </View>
        </View>
        {showArrow && (
          <Ionicons
            name="chevron-forward"
            size={rf(20)}
            color={theme.colors.text.tertiary}
          />
        )}
      </AnimatedTouchableOpacity>
    );
  };

  const StatCard = ({ 
    label, 
    value, 
    icon 
  }: {
    label: string;
    value: string | number;
    icon: string;
  }) => (
    <View
      style={[
        styles.statCard,
        {
          backgroundColor: theme.colors.surface.primary,
          ...theme.shadows.sm,
        },
      ]}
    >
      <View 
        style={[
          styles.statIconContainer,
          { backgroundColor: theme.colors.accent.blue + '20' }
        ]}
      >
        <Ionicons
          name={icon as any}
          size={rf(24)}
          color={theme.colors.accent.blue}
        />
      </View>
      <Text
        style={[
          styles.statValue,
          {
            color: theme.colors.text.primary,
            fontSize: theme.typography.heading.h3.fontSize,
            fontWeight: theme.typography.heading.h3.fontWeight,
          },
        ]}
      >
        {value}
      </Text>
      <Text
        style={[
          styles.statLabel,
          {
            color: theme.colors.text.tertiary,
            fontSize: theme.typography.body.small.fontSize,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );

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
        {/* Profile Header */}
        <View
          style={[
            styles.profileHeader,
            {
              backgroundColor: theme.colors.surface.primary,
              ...theme.shadows.lg,
            },
          ]}
        >
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: user.avatar }}
              style={styles.avatar}
            />
            <View
              style={[
                styles.onlineIndicator,
                { backgroundColor: theme.colors.status.resolved }
              ]}
            />
          </View>
          
          <Text
            style={[
              styles.userName,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.heading.h2.fontSize,
                fontWeight: theme.typography.heading.h2.fontWeight,
              },
            ]}
          >
            {user.name}
          </Text>
          
          <Text
            style={[
              styles.userEmail,
              {
                color: theme.colors.text.tertiary,
                fontSize: theme.typography.body.medium.fontSize,
              },
            ]}
          >
            {user.email}
          </Text>
          
          <View
            style={[
              styles.pointsBadge,
              {
                backgroundColor: theme.colors.accent.blue + '20',
                borderColor: theme.colors.accent.blue + '30',
              },
            ]}
          >
            <Ionicons
              name="star"
              size={rf(16)}
              color={theme.colors.accent.blue}
            />
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

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <StatCard
            label="Raporlarım"
            value={user.reportCount}
            icon="document-text-outline"
          />
          <StatCard
            label="Günlük Seri"
            value={`${user.streak} gün`}
            icon="flame-outline"
          />
          <StatCard
            label="Rozetler"
            value={user.badges.length}
            icon="trophy-outline"
          />
        </View>

        {/* Badges */}
        <View
          style={[
            styles.badgesSection,
            {
              backgroundColor: theme.colors.surface.primary,
              ...theme.shadows.sm,
            },
          ]}
        >
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
            Rozetlerim
          </Text>
          
          <View style={styles.badgesGrid}>
            {user.badges.map((badge, index) => (
              <View
                key={index}
                style={[
                  styles.badgeItem,
                  {
                    backgroundColor: theme.colors.accent.blue + '10',
                    borderColor: theme.colors.accent.blue + '30',
                  },
                ]}
              >
                <Ionicons
                  name="medal-outline"
                  size={rf(20)}
                  color={theme.colors.accent.blue}
                />
                <Text
                  style={[
                    styles.badgeText,
                    {
                      color: theme.colors.text.primary,
                      fontSize: theme.typography.caption.fontSize,
                    },
                  ]}
                >
                  {badge}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={styles.settingsSection}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.heading.h4.fontSize,
                fontWeight: theme.typography.heading.h4.fontWeight,
                marginHorizontal: wp(4),
                marginBottom: hp(2),
              },
            ]}
          >
            Ayarlar
          </Text>
          
          <SettingsItem
            icon="person-outline"
            title="Profil Düzenle"
            subtitle="Kişisel bilgilerinizi güncelleyin"
            onPress={() => Alert.alert('Profil Düzenle', 'Bu özellik yakında eklenecek!')}
          />
          
          <SettingsItem
            icon="notifications-outline"
            title="Bildirimler"
            subtitle="Bildirim tercihlerinizi ayarlayın"
            onPress={() => Alert.alert('Bildirimler', 'Bu özellik yakında eklenecek!')}
          />
          
          <SettingsItem
            icon="shield-outline"
            title="Gizlilik"
            subtitle="Gizlilik ayarlarınızı yönetin"
            onPress={() => Alert.alert('Gizlilik', 'Bu özellik yakında eklenecek!')}
          />
          
          <SettingsItem
            icon="help-circle-outline"
            title="Yardım ve Destek"
            subtitle="SSS ve iletişim bilgileri"
            onPress={() => Alert.alert('Yardım', 'Bu özellik yakında eklenecek!')}
          />
          
          <SettingsItem
            icon="information-circle-outline"
            title="Uygulama Hakkında"
            subtitle="Versiyon 1.0.0"
            onPress={() => Alert.alert('Uygulama Hakkında', 'CityMyCity v1.0.0\nTaylan Deveci tarafından geliştirildi')}
          />
          
          <SettingsItem
            icon="log-out-outline"
            title="Çıkış Yap"
            onPress={() => Alert.alert('Çıkış Yap', 'Çıkış yapmak istediğinizden emin misiniz?', [
              { text: 'İptal', style: 'cancel' },
              { text: 'Çıkış Yap', style: 'destructive' }
            ])}
            showArrow={false}
          />
        </View>
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
  profileHeader: {
    alignItems: 'center',
    padding: wp(6),
    marginHorizontal: wp(4),
    marginBottom: hp(3),
    borderRadius: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: hp(2),
  },
  avatar: {
    width: wp(25),
    height: wp(25),
    borderRadius: wp(12.5),
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: wp(1),
    right: wp(1),
    width: wp(6),
    height: wp(6),
    borderRadius: wp(3),
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  userName: {
    marginBottom: hp(0.5),
  },
  userEmail: {
    marginBottom: hp(2),
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderRadius: 20,
    borderWidth: 1,
    gap: wp(2),
  },
  pointsText: {},
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: wp(4),
    marginBottom: hp(3),
    gap: wp(3),
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: wp(4),
    borderRadius: 16,
  },
  statIconContainer: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(1),
  },
  statValue: {
    marginBottom: hp(0.5),
  },
  statLabel: {
    textAlign: 'center',
  },
  badgesSection: {
    marginHorizontal: wp(4),
    marginBottom: hp(3),
    padding: wp(4),
    borderRadius: 16,
  },
  sectionTitle: {
    marginBottom: hp(2),
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(3),
  },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    borderRadius: 12,
    borderWidth: 1,
    gap: wp(2),
  },
  badgeText: {
    fontWeight: '500',
  },
  settingsSection: {
    gap: hp(1),
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: wp(4),
    marginHorizontal: wp(4),
    borderRadius: 16,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsIconContainer: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  settingsTextContainer: {
    flex: 1,
  },
  settingsTitle: {},
  settingsSubtitle: {
    marginTop: hp(0.5),
  },
});
