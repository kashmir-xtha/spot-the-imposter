import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSizes, fontWeights, letterSpacing, radius, spacing } from '../constants/theme';

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  onPress: () => void;
};

export default function GameSettingCard({ icon, title, subtitle, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={20} color={colors.textPrimary} />
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  pressed: {
    opacity: 0.75,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    color: colors.textPrimary,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.wide,
    marginBottom: 3,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
  },
});
