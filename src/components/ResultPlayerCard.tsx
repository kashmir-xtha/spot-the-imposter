import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AvatarDisplay from './AvatarDisplay';
import { Player } from '../types';
import { colors, fontSizes, fontWeights, radius, spacing } from '../constants/theme';

type Props = {
  player: Player;
};

export default function ResultPlayerCard({ player }: Props) {
  const isImposter = player.role === 'imposter';

  return (
    <View style={[styles.row, isImposter && styles.rowImposter]}>
      <AvatarDisplay avatarId={player.avatarId} size="sm" highlighted={isImposter} />
      <Text style={styles.name} numberOfLines={1}>
        {player.name}
      </Text>
      <View style={[styles.tag, isImposter ? styles.tagImposter : styles.tagInnocent]}>
        <Ionicons
          name={isImposter ? 'alert-circle' : 'checkmark-circle'}
          size={14}
          color={isImposter ? colors.danger : colors.success}
        />
        <Text style={[styles.tagText, { color: isImposter ? colors.danger : colors.success }]}>
          {isImposter ? 'Imposter' : 'Innocent'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardAlt,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  rowImposter: {
    backgroundColor: colors.dangerBg,
  },
  name: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    marginLeft: spacing.md,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tagImposter: {},
  tagInnocent: {},
  tagText: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.bold,
  },
});
