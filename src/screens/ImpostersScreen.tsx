import React from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useGame, MIN_IMPOSTERS, getMaxChaosImposters } from '../context/GameContext';
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
  const { state, setImposterCount, setChaosMode } = useGame();
  const { imposterCount, playerCount, chaosMode } = state.settings;
  const maxChaosImposters = getMaxChaosImposters(playerCount);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>IMPOSTERS</Text>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="close" size={26} color={colors.textSecondary} />
        </Pressable>
      </View>

      <View style={[styles.chaosCard, chaosMode && styles.chaosCardActive]}>
        <View style={styles.chaosRow}>
          <View style={[styles.chaosIconWrap, chaosMode && styles.chaosIconWrapActive]}>
            <Ionicons
              name="flame"
              size={20}
              color={chaosMode ? colors.danger : colors.textSecondary}
            />
          </View>
          <View style={styles.chaosTextWrap}>
            <Text style={styles.chaosTitle}>CHAOS MODE</Text>
            <Text style={styles.chaosSubtitle}>Randomize the imposter count</Text>
          </View>
          <Switch
            value={chaosMode}
            onValueChange={setChaosMode}
            trackColor={{ false: colors.cardBorder, true: colors.dangerBorder }}
            thumbColor={chaosMode ? colors.danger : colors.textMuted}
            ios_backgroundColor={colors.cardBorder}
          />
        </View>
      </View>

      {chaosMode ? (
        <View style={[styles.infoBox, styles.chaosInfoBox]}>
          <Ionicons name="skull-outline" size={18} color={colors.danger} />
          <Text style={styles.infoText}>
            Each game will secretly pick between{' '}
            <Text style={styles.infoTextStrong}>1 and {maxChaosImposters}</Text> imposter
            {maxChaosImposters > 1 ? 's' : ''} out of {playerCount} players (up to 50%). Nobody —
            not even the host — knows the exact number until it's revealed at the end.
          </Text>
        </View>
      ) : (
        <>
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
        </>
      )}

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
  chaosCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  chaosCardActive: {
    borderColor: colors.dangerBorder,
    backgroundColor: colors.dangerBg,
  },
  chaosRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chaosIconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  chaosIconWrapActive: {
    backgroundColor: 'rgba(239, 68, 68, 0.18)',
  },
  chaosTextWrap: {
    flex: 1,
  },
  chaosTitle: {
    color: colors.textPrimary,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.wide,
    marginBottom: 3,
  },
  chaosSubtitle: {
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
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
  chaosInfoBox: {
    backgroundColor: colors.dangerBg,
    flex: 0,
  },
  infoText: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
    lineHeight: 19,
    marginLeft: spacing.sm,
  },
  infoTextStrong: {
    color: colors.textPrimary,
    fontWeight: fontWeights.bold,
  },
  footer: {
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
});
