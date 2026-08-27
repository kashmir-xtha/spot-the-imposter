import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Category } from '../types';
import CategoryChip from './CategoryChip';
import { colors, fontSizes, fontWeights, letterSpacing, spacing } from '../constants/theme';

type Props = {
  groupLabel: string;
  groupIcon: string;
  items: Category[];
  selectedIds: string[];
  isAllSelected: boolean;
  onToggle: (id: string) => void;
};

export default function CategorySection({
  groupLabel,
  groupIcon,
  items,
  selectedIds,
  isAllSelected,
  onToggle,
}: Props) {
  return (
    <View style={styles.section}>
      <View style={styles.headerRow}>
        <Text style={styles.headerIcon}>{groupIcon}</Text>
        <Text style={styles.headerText}>{groupLabel.toUpperCase()}</Text>
        <View style={styles.divider} />
      </View>
      <View style={styles.chipsRow}>
        {items.map((item) => (
          <CategoryChip
            key={item.id}
            label={item.label}
            icon={item.icon}
            selected={isAllSelected || selectedIds.includes(item.id)}
            onPress={() => onToggle(item.id)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  headerIcon: {
    fontSize: fontSizes.sm,
    marginRight: spacing.xs,
  },
  headerText: {
    color: colors.textSecondary,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.wider,
    marginRight: spacing.sm,
  },
  divider: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.divider,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
