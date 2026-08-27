import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSizes, fontWeights, radius, spacing } from '../constants/theme';

type Props = {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min: number;
  max: number;
  label?: string;
};

export default function PlayerCounter({ value, onIncrement, onDecrement, min, max, label }: Props) {
  const canDecrement = value > min;
  const canIncrement = value < max;

  return (
    <View style={styles.wrap}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.row}>
        <Pressable
          onPress={onDecrement}
          disabled={!canDecrement}
          style={({ pressed }) => [
            styles.circleButton,
            !canDecrement && styles.circleButtonDisabled,
            pressed && canDecrement && styles.pressed,
          ]}
        >
          <Ionicons
            name="remove"
            size={22}
            color={canDecrement ? colors.textPrimary : colors.textMuted}
          />
        </Pressable>

        <Text style={styles.value}>{value}</Text>

        <Pressable
          onPress={onIncrement}
          disabled={!canIncrement}
          style={({ pressed }) => [
            styles.circleButton,
            styles.circleButtonPrimary,
            !canIncrement && styles.circleButtonDisabled,
            pressed && canIncrement && styles.pressed,
          ]}
        >
          <Ionicons
            name="add"
            size={22}
            color={canIncrement ? colors.white : colors.textMuted}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
  },
  label: {
    color: colors.textSecondary,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    letterSpacing: 1,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xl,
  },
  circleButton: {
    width: 48,
    height: 48,
    borderRadius: radius.pill,
    backgroundColor: colors.cardAlt,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleButtonPrimary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  circleButtonDisabled: {
    backgroundColor: colors.cardAlt,
    borderColor: colors.cardBorder,
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
  },
  value: {
    color: colors.textPrimary,
    fontSize: fontSizes.jumbo,
    fontWeight: fontWeights.heavy,
    minWidth: 56,
    textAlign: 'center',
  },
});
