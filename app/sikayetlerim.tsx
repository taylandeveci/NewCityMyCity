import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/provider';
import { ScreenContainer } from '../components/layout/ScreenContainer';
import { wp, hp, rf } from '../utils/responsive';
import { ComplaintCard } from '../components/ComplaintCard';
import { complaints } from '../data/mock';

export default function Sikayetlerim() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'awaiting' | 'inReview' | 'resolved' | 'rejected'>('all');

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  // Filter complaints by status
  const filteredComplaints = complaints.filter(complaint => {
    if (filterStatus === 'all') return true;
    return complaint.status === filterStatus;
  });

  // Sort by newest first
  const sortedComplaints = [...filteredComplaints].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const FilterButton = ({ 
    status, 
    label, 
    count 
  }: { 
    status: typeof filterStatus; 
    label: string;
    count: number;
  }) => {
    const isActive = filterStatus === status;
    
    return (
      <TouchableOpacity
        style={[
          styles.filterButton,
          {
            backgroundColor: isActive 
              ? theme.colors.accent.blue + '20'
              : theme.colors.surface.primary,
            borderColor: isActive 
              ? theme.colors.accent.blue + '40'
              : theme.colors.surface.secondary,
            ...theme.shadows.sm,
          },
        ]}
        onPress={() => setFilterStatus(status)}
      >
        <Text
          style={[
            styles.filterButtonText,
            {
              color: isActive 
                ? theme.colors.accent.blue
                : theme.colors.text.secondary,
              fontSize: theme.typography.body.small.fontSize,
              fontWeight: isActive ? '600' : '500',
            },
          ]}
        >
          {label}
        </Text>
        <View
          style={[
            styles.filterCount,
            {
              backgroundColor: isActive 
                ? theme.colors.accent.blue
                : theme.colors.surface.secondary,
            },
          ]}
        >
          <Text
            style={[
              styles.filterCountText,
              {
                color: isActive ? '#FFFFFF' : theme.colors.text.tertiary,
                fontSize: theme.typography.caption.fontSize,
              },
            ]}
          >
            {count}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const getStatusCounts = () => {
    return {
      all: complaints.length,
      awaiting: complaints.filter(c => c.status === 'awaiting').length,
      inReview: complaints.filter(c => c.status === 'inReview').length,
      resolved: complaints.filter(c => c.status === 'resolved').length,
      rejected: complaints.filter(c => c.status === 'rejected').length,
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <ScreenContainer scroll={false} style={{ paddingHorizontal: wp(4) }}>
      <LinearGradient
        colors={theme.colors.background.gradient}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Add Report Button */}
      <View style={styles.headerActions}>
        <TouchableOpacity
          style={[
            styles.addButton,
            {
              backgroundColor: theme.colors.accent.blue,
              ...theme.shadows.sm,
            },
          ]}
          onPress={() => router.push('/complaint/new')}
        >
          <Ionicons
            name="add"
            size={rf(20)}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
        style={styles.filtersScrollView}
      >
        <FilterButton
          status="all"
          label="Tümü"
          count={statusCounts.all}
        />
        <FilterButton
          status="awaiting"
          label="Beklemede"
          count={statusCounts.awaiting}
        />
        <FilterButton
          status="inReview"
          label="İnceleniyor"
          count={statusCounts.inReview}
        />
        <FilterButton
          status="resolved"
          label="Çözüldü"
          count={statusCounts.resolved}
        />
        <FilterButton
          status="rejected"
          label="Reddedildi"
          count={statusCounts.rejected}
        />
      </ScrollView>

      {/* Reports List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 120 }
        ]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {sortedComplaints.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="document-text-outline"
              size={rf(64)}
              color={theme.colors.text.tertiary}
              style={styles.emptyIcon}
            />
            <Text
              style={[
                styles.emptyTitle,
                {
                  color: theme.colors.text.secondary,
                  fontSize: theme.typography.heading.h4.fontSize,
                  fontWeight: theme.typography.heading.h4.fontWeight,
                },
              ]}
            >
              {filterStatus === 'all' 
                ? 'Henüz rapor oluşturmadınız'
                : `Bu kategoride rapor bulunmuyor`
              }
            </Text>
            <Text
              style={[
                styles.emptySubtitle,
                {
                  color: theme.colors.text.tertiary,
                  fontSize: theme.typography.body.medium.fontSize,
                },
              ]}
            >
              Yeni bir rapor oluşturmak için + butonuna tıklayın
            </Text>
          </View>
        ) : (
          <>
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: theme.colors.text.secondary,
                  fontSize: theme.typography.body.medium.fontSize,
                  fontWeight: '500',
                },
              ]}
            >
              {sortedComplaints.length} rapor bulundu
            </Text>
            
            {sortedComplaints.map((complaint) => (
              <ComplaintCard
                key={complaint.id}
                complaint={complaint}
                onPress={() => router.push(`/complaint/${complaint.id}`)}
              />
            ))}
          </>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingBottom: hp(2),
  },
  backButton: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: wp(4),
  },
  addButton: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerActions: {
    alignItems: 'flex-end',
    marginBottom: hp(1),
  },
  filtersScrollView: {
    flexGrow: 0,
    marginBottom: hp(1),
  },
  filtersContainer: {
    paddingHorizontal: wp(4),
    gap: wp(3),
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.2),
    borderRadius: 20,
    borderWidth: 1,
    gap: wp(2),
  },
  filterButtonText: {},
  filterCount: {
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.3),
    borderRadius: 10,
    minWidth: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterCountText: {
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: wp(4),
  },
  sectionTitle: {
    marginBottom: hp(2),
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: hp(10),
  },
  emptyIcon: {
    marginBottom: hp(3),
  },
  emptyTitle: {
    marginBottom: hp(1),
    textAlign: 'center',
  },
  emptySubtitle: {
    textAlign: 'center',
    lineHeight: rf(20),
  },
});
