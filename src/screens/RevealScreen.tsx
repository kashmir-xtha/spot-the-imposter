import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useGame } from '../context/GameContext';
import { getCategoryById } from '../data/categories';
import PlayerProgress from '../components/PlayerProgress';
import RevealCard from '../components/RevealCard';
import RoleReveal from '../components/RoleReveal';
import PrimaryButton from '../components/PrimaryButton';
import { colors, fontSizes, fontWeights, spacing } from '../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Reveal'>;

export default function RevealScreen({ navigation }: Props) {
  const { state, nextPlayer, startDiscussion, resetToHome } = useGame();
  const { players, currentPlayerIndex, secretWord, secretCategoryId } = state;

  const [revealed, setRevealed] = useState(false);
  const [allDone, setAllDone] = useState(false);

  const currentPlayer = players[currentPlayerIndex];
  const isLastPlayer = currentPlayerIndex === players.length - 1;
  const category = secretCategoryId ? getCategoryById(secretCategoryId) : undefined;
  const categoryLabel = category ? category.label : 'Mystery';

  if (!currentPlayer) {
    return null;
  }

  const handleHideAndPass = () => {
    nextPlayer();
    if (isLastPlayer) {
      setAllDone(true);
    } else {
      setRevealed(false);
    }
  };

  const handleQuit = () => {
    resetToHome();
    // Fully reset the stack back to just Home. Otherwise this Reveal screen
    // (and any Discussion/Results screens from this session) would stay
    // mounted underneath, and the *next* game would resume that same stale
    // screen instance instead of starting fresh — see handleStartDiscussion.
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  };

  const handleStartDiscussion = () => {
    startDiscussion();
    // Use `replace`, not `navigate`. Because "Discussion" can already exist
    // further back in the stack from a previous round (Play Again keeps the
    // flow going without returning Home), `navigate` would pop back to that
    // old, already-mounted screen — carrying over its stale local state
    // (e.g. an already-expired timer) — instead of mounting a fresh one.
    navigation.replace('Discussion');
  };

  if (allDone) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.handoffWrap}>
          <View style={styles.handoffIcon}>
            <Ionicons name="checkmark-done" size={36} color={colors.success} />
          </View>
          <Text style={styles.handoffTitle}>Everyone has received their role.</Text>
          <Text style={styles.handoffSubtitle}>
            Pass the phone back to the host.{'\n'}Ready to discuss?
          </Text>
        </View>
        <View style={styles.footer}>
          <PrimaryButton label="START DISCUSSION" icon="chatbubbles" onPress={handleStartDiscussion} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <PlayerProgress
          avatarId={currentPlayer.avatarId}
          playerNumber={currentPlayerIndex + 1}
          totalPlayers={players.length}
          playerName={currentPlayer.name}
        />

        <RevealCard revealed={revealed} onPress={() => setRevealed(true)}>
          <RoleReveal role={currentPlayer.role} secretWord={secretWord} categoryLabel={categoryLabel} />
        </RevealCard>

        {revealed ? (
          <View style={styles.actionWrap}>
            <PrimaryButton
              label="HIDE & PASS PHONE"
              icon="arrow-forward"
              iconPosition="right"
              onPress={handleHideAndPass}
            />
          </View>
        ) : (
          <Pressable onPress={handleQuit} style={styles.quitWrap} hitSlop={12}>
            <Ionicons name="close" size={14} color={colors.textMuted} />
            <Text style={styles.quitText}> QUIT GAME</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
  },
  actionWrap: {
    marginTop: spacing.xxl,
  },
  quitWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: spacing.xxl,
  },
  quitText: {
    color: colors.textMuted,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    letterSpacing: 1,
  },
  handoffWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  handoffIcon: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: colors.successBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  handoffTitle: {
    color: colors.textPrimary,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  handoffSubtitle: {
    color: colors.textSecondary,
    fontSize: fontSizes.md,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
});
