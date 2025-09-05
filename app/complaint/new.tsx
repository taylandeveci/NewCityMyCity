import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { FilterChip } from '../../components/FilterChip';
import { ImagePickerGrid } from '../../components/ImagePickerGrid';
import { GlowingCTA } from '../../components/GlowingCTA';
import { useTheme } from '../../theme/provider';
import { categories } from '../../data/mock';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function NewComplaint() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  
  const [selectedCategory, setSelectedCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const CloseButton = () => {
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
          styles.closeButton,
          {
            backgroundColor: theme.colors.surface.opacity,
            ...theme.shadows.md,
          },
          animatedStyle,
        ]}
        onPress={handlePress}
      >
        <Feather
          name="x"
          size={24}
          color={theme.colors.text.primary}
        />
      </AnimatedTouchableOpacity>
    );
  };

  const AddressSelector = () => {
    const scale = useSharedValue(1);

    const handlePress = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      scale.value = withSpring(0.98, {}, () => {
        scale.value = withSpring(1);
      });
      // Mock address selection
      setAddress('Selected location from map');
    };

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    return (
      <AnimatedTouchableOpacity
        style={[
          styles.addressSelector,
          {
            backgroundColor: theme.colors.surface.secondary,
            borderColor: theme.colors.text.tertiary + '30',
          },
          animatedStyle,
        ]}
        onPress={handlePress}
      >
        <Feather
          name="map-pin"
          size={20}
          color={theme.colors.accent.blue}
        />
        <Text
          style={[
            styles.addressText,
            {
              color: address ? theme.colors.text.primary : theme.colors.text.tertiary,
              fontSize: theme.typography.body.medium.fontSize,
            },
          ]}
        >
          {address || 'Haritadan konum seçin'}
        </Text>
        <Feather
          name="chevron-right"
          size={20}
          color={theme.colors.text.tertiary}
        />
      </AnimatedTouchableOpacity>
    );
  };

  const handleAddImage = () => {
    // Mock image addition
    const newImage = `https://via.placeholder.com/300x200?text=Photo+${images.length + 1}`;
    setImages([...images, newImage]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!selectedCategory || !title.trim() || !description.trim() || !address) {
      Alert.alert(
        'Eksik Bilgi',
        'Lütfen tüm gerekli alanları doldurun ve bir konum seçin.',
        [{ text: 'Tamam' }]
      );
      return;
    }

    // Mock submission
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    Alert.alert(
      'Rapor Başarıyla Gönderildi',
      'Şikayetiniz gönderildi ve kısa sürede incelenecek. Referans numarası: CTC-2024-' + String(Math.floor(Math.random() * 1000)).padStart(3, '0'),
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  const isFormValid = selectedCategory && title.trim() && description.trim() && address;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme.colors.background.gradient}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <CloseButton />
        <Text
          style={[
            styles.headerTitle,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.heading.h3.fontSize,
              fontWeight: theme.typography.heading.h3.fontWeight,
            },
          ]}
        >
          Sorun Bildir
        </Text>
        <View style={{ width: 44 }} />
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 120 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Form Card */}
        <View
          style={[
            styles.formCard,
            {
              backgroundColor: theme.colors.surface.primary,
              ...theme.shadows.lg,
            },
          ]}
        >
          {/* Category Selection */}
          <View style={styles.section}>
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
              Kategori *
            </Text>
            <Text
              style={[
                styles.sectionSubtitle,
                {
                  color: theme.colors.text.tertiary,
                  fontSize: theme.typography.body.small.fontSize,
                },
              ]}
            >
              Ne tür bir sorun bildiriyorsunuz?
            </Text>
            
            <View style={styles.categoryGrid}>
              {categories.filter(c => c.id !== 'all').map((category) => (
                <FilterChip
                  key={category.id}
                  title={category.name}
                  isSelected={selectedCategory === category.id}
                  onPress={() => setSelectedCategory(category.id)}
                />
              ))}
            </View>
          </View>

          {/* Title Input */}
          <View style={styles.section}>
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
              Başlık *
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: theme.colors.surface.secondary,
                  color: theme.colors.text.primary,
                  borderColor: theme.colors.text.tertiary + '30',
                  fontSize: theme.typography.body.medium.fontSize,
                },
              ]}
              placeholder="Sorunun kısa açıklaması"
              placeholderTextColor={theme.colors.text.tertiary}
              value={title}
              onChangeText={setTitle}
              maxLength={100}
            />
          </View>

          {/* Location Selection */}
          <View style={styles.section}>
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
              Konum *
            </Text>
            <AddressSelector />
          </View>

          {/* Photos */}
          <View style={styles.section}>
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
              Fotoğraflar
            </Text>
            <Text
              style={[
                styles.sectionSubtitle,
                {
                  color: theme.colors.text.tertiary,
                  fontSize: theme.typography.body.small.fontSize,
                },
              ]}
            >
              Sorunu göstermek için fotoğraf ekleyin
            </Text>
            
            <ImagePickerGrid
              images={images}
              onAddImage={handleAddImage}
              onRemoveImage={handleRemoveImage}
              maxImages={6}
            />
          </View>

          {/* Description */}
          <View style={styles.section}>
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
              Açıklama *
            </Text>
            <TextInput
              style={[
                styles.textArea,
                {
                  backgroundColor: theme.colors.surface.secondary,
                  color: theme.colors.text.primary,
                  borderColor: theme.colors.text.tertiary + '30',
                  fontSize: theme.typography.body.medium.fontSize,
                },
              ]}
              placeholder="Sorun hakkında detaylı bilgi verin, ne zaman oluştuğu ve ilgili bağlamı da dahil edin"
              placeholderTextColor={theme.colors.text.tertiary}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              maxLength={500}
              textAlignVertical="top"
            />
            <Text
              style={[
                styles.characterCount,
                {
                  color: theme.colors.text.tertiary,
                  fontSize: theme.typography.caption.fontSize,
                },
              ]}
            >
              {description.length}/500
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View
        style={[
          styles.submitContainer,
          {
            backgroundColor: theme.colors.background.primary + 'DD',
            paddingBottom: insets.bottom + 16,
          },
        ]}
      >
        <GlowingCTA
          title="Raporu Gönder"
          onPress={handleSubmit}
          size="medium"
          variant={isFormValid ? 'primary' : 'secondary'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  formCard: {
    borderRadius: 24,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 4,
  },
  sectionSubtitle: {
    marginBottom: 12,
    lineHeight: 20,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  addressSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  addressText: {
    flex: 1,
    marginLeft: 12,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 100,
  },
  characterCount: {
    textAlign: 'right',
    marginTop: 4,
  },
  submitContainer: {
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 16,
  },
});
