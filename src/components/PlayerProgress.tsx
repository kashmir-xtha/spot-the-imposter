import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AvatarDisplay from './AvatarDisplay';
import { colors, fontSizes, fontWeights, spacing } from '../constants/theme';

type Props = {
  avatarId: string;
  playerNumber: number;
  totalPlayers: number;
  playerName: string;
};

export default function PlayerProgress({ avatarId, playerNumber, totalPlayers, playerName }: Props) {
  return (
    <View style={styles.wrap}>
      <AvatarDisplay avatarId={avatarId} size="xl" highlighted />
      <Text style={styles.number}>{playerNumber}</Text>
      <Text style={styles.subtitle}>
        {playerName} · Player {playerNumber} of {totalPlayers}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  number: {
    color: colors.textPrimary,
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.heavy,
    marginTop: spacing.md,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
    marginTop: 2,
  },
});
