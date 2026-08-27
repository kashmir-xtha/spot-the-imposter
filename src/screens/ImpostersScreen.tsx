import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useGame, MIN_IMPOSTERS } from '../context/GameContext';
import PlayerCounter from '../components/PlayerCounter';
import PrimaryButton from '../components/PrimaryButton';
import {
  colors,
  fontSizes,
  fontWeights,
  letterSpacing,
  radius,
  spacing,
} from '../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Imposters'>;

export default function ImpostersScreen({ navigation }: Props) {
  const { state, setImposterCount } = useGame();
  const { imposterCount, playerCount } = state.settings;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>IMPOSTERS</Text>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="close" size={26} color={colors.textSecondary} />
        </Pressable>
      </View>

      <View style={styles.counterCard}>
        <PlayerCounter
          value={imposterCount}
          onIncrement={() => setImposterCount(imposterCount + 1)}
          onDecrement={() => setImposterCount(imposterCount - 1)}
          min={MIN_IMPOSTERS}
          max={playerCount}
        />
        <Text style={styles.helper}>
          out of {playerCount} player{playerCount === 1 ? '' : 's'}
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Ionicons name="information-circle-outline" size={18} color={colors.textSecondary} />
        <Text style={styles.infoText}>
          You can have between 1 and {playerCount} imposters. The imposter count automatically
          adjusts if you change the number of players.
        </Text>
      </View>

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
    marginBottom: spacing.xxl,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.heavy,
    letterSpacing: letterSpacing.wide,
  },
  counterCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingVertical: spacing.xxl,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  helper: {
    color: colors.textMuted,
    fontSize: fontSizes.sm,
    marginTop: spacing.md,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: colors.cardAlt,
    borderRadius: radius.md,
    padding: spacing.lg,
    flex: 1,
  },
  infoText: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
    lineHeight: 19,
    marginLeft: spacing.sm,
  },
  footer: {
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
});
