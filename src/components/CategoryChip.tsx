import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, fontSizes, fontWeights, radius, spacing } from '../constants/theme';

type Props = {
  label: string;
  icon?: string;
  selected: boolean;
  onPress: () => void;
  emphasized?: boolean;
};

export default function CategoryChip({ label, icon, selected, onPress, emphasized = false }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.chipSelected,
        emphasized && !selected && styles.chipEmphasized,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, selected && styles.labelSelected]} numberOfLines={1}>
        {label}
        {icon ? `  ${icon}` : ''}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: colors.chipBg,
    borderWidth: 1,
    borderColor: colors.chipBorder,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  chipSelected: {
    backgroundColor: colors.chipBgSelected,
    borderColor: colors.chipBgSelected,
  },
  chipEmphasized: {
    borderColor: colors.primary,
  },
  pressed: {
    opacity: 0.75,
  },
  label: {
    color: colors.textPrimary,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
  },
  labelSelected: {
    color: colors.white,
  },
});
