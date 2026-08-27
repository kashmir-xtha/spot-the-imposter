import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PlayerRole } from '../types';
import { colors, fontSizes, fontWeights, letterSpacing, radius, spacing } from '../constants/theme';

type Props = {
  role: PlayerRole;
  secretWord: string;
  categoryLabel: string;
};

export default function RoleReveal({ role, secretWord, categoryLabel }: Props) {
  const isImposter = role === 'imposter';

  return (
    <View style={[styles.card, isImposter && styles.cardImposter]}>
      <View style={[styles.badge, isImposter ? styles.badgeImposter : styles.badgeNormal]}>
        <Ionicons
          name={isImposter ? 'skull' : 'chatbubble-ellipses'}
          size={26}
          color={isImposter ? colors.danger : colors.textPrimary}
        />
      </View>

      {isImposter ? (
        <>
          <Text style={styles.imposterTitle}>YOU ARE THE IMPOSTER!</Text>
          <View style={styles.categoryPill}>
            <Ionicons name="bulb-outline" size={14} color={colors.gold} />
            <Text style={styles.categoryPillText}>
              {' '}CATEGORY: <Text style={styles.categoryPillStrong}>{categoryLabel}</Text>
            </Text>
          </View>
          <Text style={styles.hint}>
            You don't know the secret word — blend in, drop believable hints, and try to figure
            it out before anyone suspects you.
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.label}>THE SECRET WORD</Text>
          <Text style={styles.word} numberOfLines={2} adjustsFontSizeToFit>
            {secretWord}
          </Text>
          <View style={styles.categoryPill}>
            <Ionicons name="bulb-outline" size={14} color={colors.gold} />
            <Text style={styles.categoryPillText}>
              {' '}CATEGORY: <Text style={styles.categoryPillStrong}>{categoryLabel}</Text>
            </Text>
          </View>
          <Text style={styles.hint}>Remember it! Don't say it directly — drop hints instead.</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
  },
  cardImposter: {
    borderColor: colors.dangerBorder,
  },
  badge: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  badgeNormal: {
    backgroundColor: colors.cardAlt,
  },
  badgeImposter: {
    backgroundColor: colors.dangerBg,
  },
  label: {
    color: colors.textSecondary,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.widest,
    marginBottom: spacing.sm,
  },
  word: {
    color: colors.textPrimary,
    fontSize: fontSizes.display,
    fontWeight: fontWeights.heavy,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  imposterTitle: {
    color: colors.danger,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.heavy,
    letterSpacing: letterSpacing.wide,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardAlt,
    borderRadius: radius.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  categoryPillText: {
    color: colors.textSecondary,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.wide,
  },
  categoryPillStrong: {
    color: colors.textPrimary,
    fontWeight: fontWeights.bold,
  },
  hint: {
    color: colors.textMuted,
    fontSize: fontSizes.sm,
    textAlign: 'center',
    lineHeight: 19,
  },
});
