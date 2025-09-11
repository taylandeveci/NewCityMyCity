import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  Modal,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../theme/provider';
import { wp, hp, rf } from '../utils/responsive';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

// Mock data for institutions
const turkishCities = [
  'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Konya', 'Şanlıurfa',
  'Gaziantep', 'Kocaeli', 'Mersin', 'Diyarbakır', 'Hatay', 'Manisa', 'Kayseri'
];

const istanbulDistricts = [
  'Kadıköy', 'Beşiktaş', 'Şişli', 'Bakırköy', 'Üsküdar', 'Beyoğlu', 'Fatih',
  'Maltepe', 'Pendik', 'Kartal', 'Ataşehir', 'Eyüp', 'Zeytinburnu', 'Başakşehir'
];

const mockInstitutions = [
  {
    id: 1,
    name: 'İstanbul Büyükşehir Belediyesi',
    type: 'Belediye',
    city: 'İstanbul',
    district: 'Fatih',
    phone: '444 1 İBB',
    email: 'iletisim@ibb.gov.tr',
    address: 'Saraçhane, İstanbul',
    rating: 4.2,
    responseTime: '2-3 gün'
  },
  {
    id: 2,
    name: 'Kadıköy Belediyesi',
    type: 'İlçe Belediyesi',
    city: 'İstanbul',
    district: 'Kadıköy',
    phone: '216 346 50 50',
    email: 'info@kadikoy.bel.tr',
    address: 'Osmanağa Mah. Kadıköy',
    rating: 4.5,
    responseTime: '1-2 gün'
  },
  {
    id: 3,
    name: 'İSKİ Genel Müdürlüğü',
    type: 'Su ve Kanalizasyon',
    city: 'İstanbul',
    district: 'Küçükçekmece',
    phone: '444 1 İSKİ',
    email: 'info@iski.gov.tr',
    address: 'İSKİ Genel Müdürlüğü',
    rating: 3.8,
    responseTime: '3-5 gün'
  },
  {
    id: 4,
    name: 'İGDAŞ',
    type: 'Doğalgaz',
    city: 'İstanbul',
    district: 'Beyoğlu',
    phone: '444 4 427',
    email: 'info@igdas.istanbul',
    address: 'Meclis-i Mebusan Cad.',
    rating: 4.0,
    responseTime: '2-4 gün'
  },
  {
    id: 5,
    name: 'İETT Genel Müdürlüğü',
    type: 'Ulaşım',
    city: 'İstanbul',
    district: 'Avcilar',
    phone: '444 18 37',
    email: 'info@iett.istanbul',
    address: 'İETT Genel Müdürlüğü',
    rating: 3.9,
    responseTime: '1-3 gün'
  },
  {
    id: 6,
    name: 'Beşiktaş Belediyesi',
    type: 'İlçe Belediyesi',
    city: 'İstanbul',
    district: 'Beşiktaş',
    phone: '212 310 10 10',
    email: 'info@besiktas.bel.tr',
    address: 'Barbaros Bulvarı',
    rating: 4.3,
    responseTime: '1-2 gün'
  }
];

export default function Kurumlar() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [showCityModal, setShowCityModal] = useState(false);
  const [showDistrictModal, setShowDistrictModal] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  // Filter institutions based on search and location
  const filteredInstitutions = mockInstitutions.filter(institution => {
    const matchesSearch = institution.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         institution.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = !selectedCity || institution.city === selectedCity;
    const matchesDistrict = !selectedDistrict || institution.district === selectedDistrict;
    
    return matchesSearch && matchesCity && matchesDistrict;
  });

  const InstitutionCard = ({ institution }: { institution: typeof mockInstitutions[0] }) => {
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
          styles.institutionCard,
          {
            backgroundColor: theme.colors.surface.primary,
            ...theme.shadows.md,
          },
          animatedStyle,
        ]}
        onPress={handlePress}
      >
        <View style={styles.cardHeader}>
          <View
            style={[
              styles.institutionIcon,
              { backgroundColor: theme.colors.accent.blue + '20' }
            ]}
          >
            <Ionicons
              name="business-outline"
              size={rf(24)}
              color={theme.colors.accent.blue}
            />
          </View>
          <View style={styles.institutionInfo}>
            <Text
              style={[
                styles.institutionName,
                {
                  color: theme.colors.text.primary,
                  fontSize: theme.typography.body.large.fontSize,
                  fontWeight: '600',
                },
              ]}
            >
              {institution.name}
            </Text>
            <Text
              style={[
                styles.institutionType,
                {
                  color: theme.colors.accent.blue,
                  fontSize: theme.typography.body.small.fontSize,
                  fontWeight: '500',
                },
              ]}
            >
              {institution.type}
            </Text>
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons
              name="star"
              size={rf(16)}
              color="#FFD700"
            />
            <Text
              style={[
                styles.rating,
                {
                  color: theme.colors.text.secondary,
                  fontSize: theme.typography.body.small.fontSize,
                  fontWeight: '500',
                },
              ]}
            >
              {institution.rating}
            </Text>
          </View>
        </View>

        <View style={styles.cardDetails}>
          <View style={styles.detailRow}>
            <Ionicons
              name="location-outline"
              size={rf(16)}
              color={theme.colors.text.tertiary}
            />
            <Text
              style={[
                styles.detailText,
                {
                  color: theme.colors.text.secondary,
                  fontSize: theme.typography.body.small.fontSize,
                },
              ]}
            >
              {institution.district}, {institution.city}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons
              name="call-outline"
              size={rf(16)}
              color={theme.colors.text.tertiary}
            />
            <Text
              style={[
                styles.detailText,
                {
                  color: theme.colors.text.secondary,
                  fontSize: theme.typography.body.small.fontSize,
                },
              ]}
            >
              {institution.phone}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons
              name="time-outline"
              size={rf(16)}
              color={theme.colors.text.tertiary}
            />
            <Text
              style={[
                styles.detailText,
                {
                  color: theme.colors.text.secondary,
                  fontSize: theme.typography.body.small.fontSize,
                },
              ]}
            >
              Yanıt süresi: {institution.responseTime}
            </Text>
          </View>
        </View>

        <View style={styles.cardActions}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: theme.colors.accent.blue,
              },
            ]}
          >
            <Ionicons
              name="chatbubble-outline"
              size={rf(16)}
              color="#FFFFFF"
            />
            <Text
              style={[
                styles.actionButtonText,
                {
                  color: '#FFFFFF',
                  fontSize: theme.typography.body.small.fontSize,
                  fontWeight: '500',
                },
              ]}
            >
              İletişim
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.actionButtonOutline,
              {
                borderColor: theme.colors.accent.blue,
              },
            ]}
          >
            <Ionicons
              name="information-circle-outline"
              size={rf(16)}
              color={theme.colors.accent.blue}
            />
            <Text
              style={[
                styles.actionButtonOutlineText,
                {
                  color: theme.colors.accent.blue,
                  fontSize: theme.typography.body.small.fontSize,
                  fontWeight: '500',
                },
              ]}
            >
              Detay
            </Text>
          </TouchableOpacity>
        </View>
      </AnimatedTouchableOpacity>
    );
  };

  const DropdownModal = ({ 
    visible, 
    onClose, 
    data, 
    onSelect, 
    title 
  }: {
    visible: boolean;
    onClose: () => void;
    data: string[];
    onSelect: (item: string) => void;
    title: string;
  }) => (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContent,
            {
              backgroundColor: theme.colors.surface.primary,
              ...theme.shadows.lg,
            },
          ]}
        >
          <View style={styles.modalHeader}>
            <Text
              style={[
                styles.modalTitle,
                {
                  color: theme.colors.text.primary,
                  fontSize: theme.typography.heading.h4.fontSize,
                  fontWeight: theme.typography.heading.h4.fontWeight,
                },
              ]}
            >
              {title}
            </Text>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={onClose}
            >
              <Ionicons
                name="close"
                size={rf(24)}
                color={theme.colors.text.tertiary}
              />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={data}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.modalItem,
                  { borderBottomColor: theme.colors.surface.secondary }
                ]}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text
                  style={[
                    styles.modalItemText,
                    {
                      color: theme.colors.text.primary,
                      fontSize: theme.typography.body.medium.fontSize,
                    },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme.colors.background.gradient}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Header */}
      <View
        style={[
          styles.header,
          { 
            paddingTop: insets.top + 16,
            backgroundColor: 'transparent'
          }
        ]}
      >
        <TouchableOpacity
          style={[
            styles.backButton,
            {
              backgroundColor: theme.colors.surface.primary,
              ...theme.shadows.sm,
            },
          ]}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={rf(24)}
            color={theme.colors.text.primary}
          />
        </TouchableOpacity>
        
        <Text
          style={[
            styles.headerTitle,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.heading.h2.fontSize,
              fontWeight: theme.typography.heading.h2.fontWeight,
            },
          ]}
        >
          Kurumlar
        </Text>
        
        <View style={styles.headerSpacer} />
      </View>

      {/* Search and Filters */}
      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchInput,
            {
              backgroundColor: theme.colors.surface.primary,
              borderColor: theme.colors.surface.secondary,
              ...theme.shadows.sm,
            },
          ]}
        >
          <Ionicons
            name="search"
            size={rf(20)}
            color={theme.colors.text.tertiary}
          />
          <TextInput
            style={[
              styles.textInput,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.body.medium.fontSize,
              },
            ]}
            placeholder="Kurum adı veya türü ara..."
            placeholderTextColor={theme.colors.text.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons
                name="close-circle"
                size={rf(20)}
                color={theme.colors.text.tertiary}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.filtersRow}>
          <TouchableOpacity
            style={[
              styles.filterDropdown,
              {
                backgroundColor: theme.colors.surface.primary,
                borderColor: selectedCity ? theme.colors.accent.blue : theme.colors.surface.secondary,
                ...theme.shadows.sm,
              },
            ]}
            onPress={() => setShowCityModal(true)}
          >
            <Text
              style={[
                styles.filterDropdownText,
                {
                  color: selectedCity ? theme.colors.accent.blue : theme.colors.text.tertiary,
                  fontSize: theme.typography.body.small.fontSize,
                },
              ]}
            >
              {selectedCity || 'Şehir Seç'}
            </Text>
            <Ionicons
              name="chevron-down"
              size={rf(16)}
              color={selectedCity ? theme.colors.accent.blue : theme.colors.text.tertiary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterDropdown,
              {
                backgroundColor: theme.colors.surface.primary,
                borderColor: selectedDistrict ? theme.colors.accent.blue : theme.colors.surface.secondary,
                ...theme.shadows.sm,
              },
            ]}
            onPress={() => setShowDistrictModal(true)}
            disabled={!selectedCity}
          >
            <Text
              style={[
                styles.filterDropdownText,
                {
                  color: selectedDistrict ? theme.colors.accent.blue : theme.colors.text.tertiary,
                  fontSize: theme.typography.body.small.fontSize,
                },
              ]}
            >
              {selectedDistrict || 'İlçe Seç'}
            </Text>
            <Ionicons
              name="chevron-down"
              size={rf(16)}
              color={selectedDistrict ? theme.colors.accent.blue : theme.colors.text.tertiary}
            />
          </TouchableOpacity>

          {(selectedCity || selectedDistrict) && (
            <TouchableOpacity
              style={[
                styles.clearFilters,
                {
                  backgroundColor: theme.colors.surface.secondary,
                },
              ]}
              onPress={() => {
                setSelectedCity('');
                setSelectedDistrict('');
              }}
            >
              <Ionicons
                name="refresh"
                size={rf(16)}
                color={theme.colors.text.tertiary}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Institutions List */}
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
        {filteredInstitutions.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="business-outline"
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
              Kurum bulunamadı
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
              Arama kriterlerinizi değiştirmeyi deneyin
            </Text>
          </View>
        ) : (
          <>
            <Text
              style={[
                styles.resultsCount,
                {
                  color: theme.colors.text.secondary,
                  fontSize: theme.typography.body.medium.fontSize,
                  fontWeight: '500',
                },
              ]}
            >
              {filteredInstitutions.length} kurum bulundu
            </Text>
            
            {filteredInstitutions.map((institution) => (
              <InstitutionCard key={institution.id} institution={institution} />
            ))}
          </>
        )}
      </ScrollView>

      {/* Modals */}
      <DropdownModal
        visible={showCityModal}
        onClose={() => setShowCityModal(false)}
        data={turkishCities}
        onSelect={setSelectedCity}
        title="Şehir Seçin"
      />

      <DropdownModal
        visible={showDistrictModal}
        onClose={() => setShowDistrictModal(false)}
        data={selectedCity === 'İstanbul' ? istanbulDistricts : []}
        onSelect={setSelectedDistrict}
        title="İlçe Seçin"
      />
    </View>
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
  headerSpacer: {
    width: wp(12),
  },
  searchContainer: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(2),
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: hp(2),
    gap: wp(3),
  },
  textInput: {
    flex: 1,
  },
  filtersRow: {
    flexDirection: 'row',
    gap: wp(3),
  },
  filterDropdown: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.2),
    borderRadius: 8,
    borderWidth: 1,
  },
  filterDropdownText: {},
  clearFilters: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: wp(4),
  },
  resultsCount: {
    marginBottom: hp(2),
  },
  institutionCard: {
    borderRadius: 16,
    padding: wp(4),
    marginBottom: hp(2),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  institutionIcon: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  institutionInfo: {
    flex: 1,
  },
  institutionName: {
    marginBottom: hp(0.5),
  },
  institutionType: {},
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1),
  },
  rating: {},
  cardDetails: {
    marginBottom: hp(2),
    gap: hp(1),
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  detailText: {},
  cardActions: {
    flexDirection: 'row',
    gap: wp(3),
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1.2),
    borderRadius: 8,
    gap: wp(1.5),
  },
  actionButtonText: {},
  actionButtonOutline: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1.2),
    borderRadius: 8,
    borderWidth: 1,
    gap: wp(1.5),
  },
  actionButtonOutlineText: {},
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: wp(4),
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {},
  modalClose: {
    padding: wp(1),
  },
  modalItem: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  modalItemText: {},
});
