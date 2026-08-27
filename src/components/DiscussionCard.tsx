import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSizes, fontWeights, letterSpacing, radius, spacing } from '../constants/theme';

type Props = {
  timeLabel: string;
  isRunning: boolean;
  onToggleRunning: () => void;
  onAddTime: () => void;
};

export default function DiscussionCard({ timeLabel, isRunning, onToggleRunning, onAddTime }: Props) {
  return (
    <View style={styles.headerCard}>
      <View style={styles.left}>
        <View style={styles.clockIconWrap}>
          <Ionicons name="time-outline" size={18} color={colors.textPrimary} />
        </View>
        <View>
          <Text style={styles.headerTitle}>DISCUSSION TIME</Text>
          <Text style={styles.timeLabel}>{timeLabel}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <Pressable onPress={onAddTime} style={styles.pillButton}>
          <Ionicons name="add" size={14} color={colors.textPrimary} />
          <Text style={styles.pillButtonText}>30s</Text>
        </Pressable>
        <Pressable onPress={onToggleRunning} style={[styles.pillButton, styles.playPause]}>
          <Ionicons name={isRunning ? 'pause' : 'play'} size={14} color={colors.danger} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xxl,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.wide,
  },
  timeLabel: {
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  pillButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardAlt,
    borderRadius: radius.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  pillButtonText: {
    color: colors.textPrimary,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    marginLeft: 2,
  },
  playPause: {
    backgroundColor: colors.dangerBg,
    paddingHorizontal: spacing.sm,
  },
});
