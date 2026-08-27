import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useGame } from '../context/GameContext';
import { ALL_CATEGORIES_ID, categoryGroupOrder, getCategoriesByGroup, groupIcons } from '../data/categories';
import CategorySection from '../components/CategorySection';
import PrimaryButton from '../components/PrimaryButton';
import {
  colors,
  fontSizes,
  fontWeights,
  letterSpacing,
  radius,
  spacing,
} from '../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Categories'>;

export default function CategoriesScreen({ navigation }: Props) {
  const { state, toggleCategory, selectAllCategories } = useGame();
  const { selectedCategoryIds } = state.settings;
  const isAllSelected = selectedCategoryIds.includes(ALL_CATEGORIES_ID);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>CATEGORIES</Text>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="close" size={26} color={colors.textSecondary} />
        </Pressable>
      </View>

      <Pressable
        onPress={selectAllCategories}
        style={[styles.allButton, !isAllSelected && styles.allButtonUnselected]}
      >
        <Text style={[styles.allButtonText, !isAllSelected && styles.allButtonTextUnselected]}>
          All Categories
        </Text>
      </Pressable>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {categoryGroupOrder.map((group) => (
          <CategorySection
            key={group}
            groupLabel={group}
            groupIcon={groupIcons[group]}
            items={getCategoriesByGroup(group)}
            selectedIds={selectedCategoryIds}
            isAllSelected={isAllSelected}
            onToggle={toggleCategory}
          />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton label="Done" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.heavy,
    letterSpacing: letterSpacing.wide,
  },
  allButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  allButtonUnselected: {
    backgroundColor: colors.chipBg,
    borderWidth: 1,
    borderColor: colors.chipBorder,
  },
  allButtonText: {
    color: colors.white,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.md,
  },
  allButtonTextUnselected: {
    color: colors.textPrimary,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.lg,
  },
  footer: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
  },
});
