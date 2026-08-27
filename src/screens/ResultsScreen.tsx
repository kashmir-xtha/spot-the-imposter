import React, { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useGame } from '../context/GameContext';
import AvatarDisplay from '../components/AvatarDisplay';
import ResultPlayerCard from '../components/ResultPlayerCard';
import PrimaryButton from '../components/PrimaryButton';
import {
  colors,
  fontSizes,
  fontWeights,
  letterSpacing,
  radius,
  spacing,
} from '../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Results'>;

export default function ResultsScreen({ navigation }: Props) {
  const { state, playAgain, resetToHome } = useGame();

  // Snapshot the outcome the moment this screen mounts. "Play Again" and
  // "Main Menu" both randomize/reset the shared game state right away, but
  // React Navigation keeps this screen mounted underneath while the next
  // screen transitions in. Reading `state` live would make this screen
  // re-render with the *next* round's word for a frame while it's still
  // visible. Freezing the values locally means this screen only ever shows
  // the round that just ended, no matter what happens to the shared state.
  const [snapshot] = useState(() => ({
    players: state.players,
    secretWord: state.secretWord,
  }));
  const { players, secretWord } = snapshot;
  const imposters = players.filter((p) => p.role === 'imposter');

  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: 1,
      friction: 6,
      tension: 50,
      useNativeDriver: true,
    }).start();
  }, [anim]);

  const handlePlayAgain = () => {
    playAgain();
    // `replace`, not `navigate` — "Reveal" is already in the stack from this
    // same session, so `navigate` would pop back to that old, already-mounted
    // screen (still holding whatever local state it was left in — e.g.
    // "revealed" or the last-player handoff view) instead of starting a
    // fresh reveal sequence at Player 1 for the new round.
    navigation.replace('Reveal');
  };

  const handleBackToHome = () => {
    resetToHome();
    // Fully reset the stack back to just Home so a future game starts with
    // completely fresh Reveal/Discussion/Results screens (see the
    // handlePlayAgain comment above for why this matters).
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.headerCard,
            {
              opacity: anim,
              transform: [
                {
                  scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }),
                },
              ],
            },
          ]}
        >
          <View style={styles.skullBadge}>
            <Ionicons name="skull" size={30} color={colors.danger} />
          </View>
          <Text style={styles.gameOver}>GAME OVER</Text>
          <Text style={styles.impostersWereLabel}>
            THE IMPOSTER{imposters.length > 1 ? 'S' : ''} WERE...
          </Text>
          <View style={styles.impostersRow}>
            {imposters.map((p) => (
              <View key={p.id} style={styles.imposterChip}>
                <AvatarDisplay avatarId={p.avatarId} size="sm" highlighted />
                <Text style={styles.imposterChipText}>{p.name}</Text>
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          <Text style={styles.secretLabel}>THE SECRET WORD WAS</Text>
          <Text style={styles.secretWord}>{secretWord}</Text>
        </Animated.View>

        <Text style={styles.playersLabel}>🏆 PLAYERS</Text>
        <View style={styles.playersList}>
          {players.map((player) => (
            <ResultPlayerCard key={player.id} player={player} />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton label="Play Again" icon="refresh" onPress={handlePlayAgain} />
        <View style={styles.spacer} />
        <PrimaryButton label="Main Menu" icon="home" variant="secondary" onPress={handleBackToHome} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  headerCard: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.cardBorderStrong,
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  skullBadge: {
    width: 60,
    height: 60,
    borderRadius: radius.md,
    backgroundColor: colors.dangerBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  gameOver: {
    color: colors.textPrimary,
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.heavy,
    letterSpacing: letterSpacing.wide,
    marginBottom: spacing.xl,
  },
  impostersWereLabel: {
    color: colors.textSecondary,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.wider,
    marginBottom: spacing.md,
  },
  impostersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  imposterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dangerBg,
    borderRadius: radius.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
  },
  imposterChipText: {
    color: colors.textPrimary,
    fontWeight: fontWeights.semibold,
    fontSize: fontSizes.sm,
    marginLeft: spacing.xs,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.divider,
    width: '100%',
    marginVertical: spacing.xl,
  },
  secretLabel: {
    color: colors.textSecondary,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.wider,
    marginBottom: spacing.sm,
  },
  secretWord: {
    color: colors.textPrimary,
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.heavy,
  },
  playersLabel: {
    color: colors.textSecondary,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.wider,
    marginBottom: spacing.md,
  },
  playersList: {
    marginBottom: spacing.md,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    paddingTop: spacing.sm,
  },
  spacer: {
    height: spacing.md,
  },
});
