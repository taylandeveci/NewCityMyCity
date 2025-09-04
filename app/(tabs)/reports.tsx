import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { FilterChip } from '../../components/FilterChip';
import { ComplaintCard } from '../../components/ComplaintCard';
import { useTheme } from '../../theme/provider';
import { complaints, categories } from '../../data/mock';

export default function Reports() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState('my');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const tabs = [
    { id: 'my', name: 'My Reports' },
    { id: 'nearby', name: 'Nearby' },
    { id: 'citywide', name: 'Citywide' },
  ];

  const statuses = [
    { id: 'all', name: 'All Status' },
    { id: 'awaiting', name: 'Awaiting' },
    { id: 'inReview', name: 'In Review' },
    { id: 'resolved', name: 'Resolved' },
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const getFilteredComplaints = () => {
    let filtered = complaints;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(c => c.category === selectedCategory);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(c => c.status === selectedStatus);
    }

    // Filter by tab (for demo, all show same data)
    return filtered;
  };

  const filteredComplaints = getFilteredComplaints();

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
            Reports
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
            Track and manage your community reports
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

        {/* Category Filters */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text.secondary,
                fontSize: theme.typography.body.small.fontSize,
                fontWeight: '600',
              },
            ]}
          >
            Filter by Category
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

        {/* Status Filters */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text.secondary,
                fontSize: theme.typography.body.small.fontSize,
                fontWeight: '600',
              },
            ]}
          >
            Filter by Status
          </Text>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
          >
            {statuses.map((status) => (
              <FilterChip
                key={status.id}
                title={status.name}
                isSelected={selectedStatus === status.id}
                onPress={() => setSelectedStatus(status.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Results Summary */}
        <View style={styles.summary}>
          <Text
            style={[
              styles.summaryText,
              {
                color: theme.colors.text.tertiary,
                fontSize: theme.typography.body.small.fontSize,
              },
            ]}
          >
            {filteredComplaints.length} report{filteredComplaints.length !== 1 ? 's' : ''} found
          </Text>
        </View>

        {/* Complaints List */}
        <View style={styles.complaintsList}>
          {filteredComplaints.length > 0 ? (
            filteredComplaints.map((complaint) => (
              <ComplaintCard
                key={complaint.id}
                complaint={complaint}
                onPress={() => router.push(`/complaint/${complaint.id}`)}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
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
                No reports found
              </Text>
              <Text
                style={[
                  styles.emptyDescription,
                  {
                    color: theme.colors.text.tertiary,
                    fontSize: theme.typography.body.medium.fontSize,
                  },
                ]}
              >
                Try adjusting your filters or create a new report
              </Text>
            </View>
          )}
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
  sectionTitle: {
    marginHorizontal: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tabRow: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filterRow: {
    paddingHorizontal: 16,
  },
  summary: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  summaryText: {},
  complaintsList: {
    marginTop: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    textAlign: 'center',
    lineHeight: 22,
  },
});
